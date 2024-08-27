import "../../style/Schedule.css"
import React, { useState, useEffect }  from "react";
import Card from "./components/Card";

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
  const [today, setToday] = useState<Date>(new Date());

  useEffect(
    () => {
      getData().then((res)=>{
        setData(res)
        setFirstDay(getFirstDay(res.firstDay))
        setWeekType(getWeekType(today))
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

  const getWeekType = (date: Date) => {
      const dateCopy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      // Set to nearest Thursday: current date + 4 - current day number
      // Make Sunday's day number 7
      dateCopy.setUTCDate(dateCopy.getUTCDate() + 4 - (dateCopy.getUTCDay()||7));
      // Calculate full weeks to nearest Thursday
      const weekNumber: number = Math.ceil((((dateCopy.valueOf() - firstDay.valueOf()) / 86400000) + 1) / 7);
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

    return getWeekType(today) === weekType ? weekday[today.getDay()] : ''
  }

  return (
    <div className="schedule-container">
      <h2>Расписание</h2>
      <p>{data.name}</p>
      <p className="today-container">{todayFormated()} - {getWeekType(today) === WeekType.EVEN ? 'числ.' : 'знам.'}</p>
      <div className="switch-week-container">
        <button className={weekType === WeekType.EVEN ? 'switch-weel-button-selected' : 'switch-weel-button-unselected'} onClick={changeWeekType}>числитель</button>
        <button className={weekType === WeekType.ODD ? 'switch-weel-button-selected' : 'switch-weel-button-unselected'} onClick={changeWeekType}>знаменатель</button>
      </div>

      <div className="row">
        {data.schedule.map((item) => (
          <Card name={item.title} weekType={weekType} lectures={item.lectures} currentDay={getCurrentDay()}/>
        ))}
      </div>
    </div>
  )
}

export default Schedule;
