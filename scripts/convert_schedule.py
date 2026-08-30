import json
import re
import sys
import warnings
from collections import defaultdict
from pathlib import Path

import openpyxl


WEEKDAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
WEEK_TYPES = {
    "числ": ["числитель"],
    "знам": ["знаменатель"],
    "числ/знам": ["числитель", "знаменатель"],
}
LESSON_TYPES = {"Лек": "лекция", "Пр": "практика", "Лаб": "практика"}


def text(value):
    return "" if value is None else str(value).strip()


def filename(group):
    return re.sub(r"[^0-9A-Za-zА-Яа-яЁё._-]+", "_", group) + ".json"


def classroom(building, room):
    building, room = text(building), text(room)
    if building and room:
        return f"{building}, ауд. {room}"
    return building or room


def main(source, destination):
    warnings.filterwarnings("ignore", message="Data Validation extension")
    sheet = openpyxl.load_workbook(source, data_only=True).worksheets[0]
    groups = defaultdict(lambda: defaultdict(list))

    for row in sheet.iter_rows(min_row=3, values_only=True):
        group = text(row[4])
        if not group:
            continue

        day = text(row[9])
        source_week_type = text(row[10])
        source_lesson_type = text(row[6])
        if day not in WEEKDAYS:
            raise ValueError(f"Неизвестный день недели: {day!r}")
        if source_week_type not in WEEK_TYPES:
            raise ValueError(f"Неизвестный тип недели: {source_week_type!r}")
        if source_lesson_type not in LESSON_TYPES:
            raise ValueError(f"Неизвестный вид занятия: {source_lesson_type!r}")

        for week_type in WEEK_TYPES[source_week_type]:
            groups[group][day].append({
                "weekType": week_type,
                "time": text(row[11]),
                "name": text(row[5]),
                "type": LESSON_TYPES[source_lesson_type],
                "lecturer": text(row[8]),
                "classroom": classroom(row[12], row[13]),
            })

    destination.mkdir(parents=True, exist_ok=True)
    for group, days in sorted(groups.items()):
        schedule = []
        for day in WEEKDAYS:
            lectures = days.get(day, [])
            if not lectures:
                continue
            lectures.sort(key=lambda item: (item["time"], item["weekType"], item["name"]))
            schedule.append({"title": day, "lectures": lectures})

        data = {"name": group, "firstDay": "01.09.2026", "schedule": schedule}
        (destination / filename(group)).write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    print(f"Создано файлов: {len(groups)}")
    for group in sorted(groups):
        count = sum(len(items) for items in groups[group].values())
        print(f"{group}: {count} записей")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Использование: convert_schedule.py <расписание.xlsx> <каталог>")
    main(Path(sys.argv[1]), Path(sys.argv[2]))
