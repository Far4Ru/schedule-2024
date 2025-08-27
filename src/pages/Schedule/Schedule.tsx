import "./Schedule.css"
import React, { useState, useEffect }  from "react";
import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";

export interface Lecture {
  weekType: string,
  time: string,
  name: string,
  type: string,
  lecturer: string,
  classroom: string
}

interface DataConfig {
  name: string,
  firstDay: string,
  schedule: {
    title: string
    lectures: Lecture[]
  }[]
}

export enum WeekType {
  ODD = 0,
  EVEN = 1
}

const Schedule: React.FC = () => { 
  const [data, setData] = useState<DataConfig>({ name: '', firstDay: '01.01.1970', schedule: []});
  const [weekType, setWeekType] = useState<WeekType>(WeekType.ODD);
  const [firstDay, setFirstDay] = useState<Date>(new Date());
  const [today] = useState<Date>(new Date());

  useEffect(
    () => {
      getData().then((res)=>{
        setData(res)
        const parsedFirstDay = getFirstDay(res.firstDay)
        setFirstDay(parsedFirstDay)
        setWeekType(getWeekType(new Date(), parsedFirstDay))
      })
    }, []
  )

  const getData = async () => {
    const fetchData = await fetch('data.json')
    const json = await fetchData.json()
    return json
  }

  const getFirstDay = (day: string) => {
    const dayArray = day.split('.')
    return new Date(Date.parse(`${dayArray[1]}/${dayArray[0]}/${dayArray[2]}`))
  }

  const getWeekType = (date: Date, from: Date) => {
      const dateCopy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - (dateCopy.getUTCDay()||7));
      // Calculate full weeks to nearest Thursday
      const weekNumber: number = Math.ceil((((dateCopy.valueOf() - from.valueOf()) / 86400000) + 1) / 7);
      // Return week number
      return weekNumber % 2 === 0 ? WeekType.EVEN : WeekType.ODD;
  }

  const todayFormated = () => {
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day   = today.getDate().toString().padStart(2, "0");
    return `${day}.${month}.${year}`
  }

  const changeWeekType = (e: any) => {
    const text: string = e.target.innerText
    const newWeekType = text === 'числитель' ? WeekType.EVEN : WeekType.ODD
    setWeekType(newWeekType)
  }

  const getCurrentDay = () => {
    const weekday = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"]

    return getWeekType(today, firstDay) === weekType ? weekday[today.getDay()] : ''
  }

  const getNextDay = (): { dayName: string; weekType: WeekType } => {
    const weekday = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    
    const isAugust = currentDate.getMonth() === 7;
    
    if (isAugust) {
      nextDate.setMonth(8);
      nextDate.setDate(1);
    } else {
      const currentDay = currentDate.getDay();
      
      // Следующий день
      if (currentDay === 6) { // Суббота
        nextDate.setDate(currentDate.getDate() + 2); // Понедельник
      } else if (currentDay === 0) { // Воскресенье
        nextDate.setDate(currentDate.getDate() + 1); // Понедельник
      } else {
        nextDate.setDate(currentDate.getDate() + 1); // Следующий день
      }
    }
    
    const dayName = weekday[nextDate.getDay()];
    
    const nextWeekType = getWeekType(nextDate, firstDay);
    
    return { dayName, weekType: nextWeekType };
  }

  return (
    <div className="schedule-container">
      <Header title="Расписание" subtitle={data.name}/>
      <Navigation
        info={`${todayFormated()} - ${getWeekType(today, firstDay) === WeekType.EVEN ? 'числитель' : 'знаменатель'}`}
        weekType={weekType}
        currentWeekType={getWeekType(today, firstDay)}
        onClick={changeWeekType}
      />
      <main className="content-blocks">
        {data.schedule.map((item, index) => (
          <Card key={index} name={item.title} weekType={weekType} lectures={item.lectures} currentDay={getCurrentDay()} nextDay={getNextDay()}/>
        ))}
      </main>
    </div>
  )
}

export default Schedule;
