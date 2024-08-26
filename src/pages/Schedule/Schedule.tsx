import "../../style/Schedule.css"
import React, { useState, useEffect }  from "react";
import Card from "./components/Card";

interface DataConfig {
  name: string,
  schedule: {
    title: string
  }[]
}

export enum WeekType {
  ODD = 0,
  EVEN = 1
}

const Schedule: React.FC = () => { 
  const [data, setData] = useState<DataConfig>({ name: '', schedule: []});
  const [weekType, setWeekType] = useState<WeekType>(WeekType.ODD);

  useEffect(
    () => {
      getData().then((res)=>{
        setData(res)
      })
      setWeekType(WeekType.ODD)
    }, []
  )

  const getData = async () => {
    const fetchData = await fetch('data.json')
    const json = await fetchData.json()
    return json
  }

  return (
    <div className="schedule-container">
      <h2>Расписание</h2>
      <p>{data.name}</p>

      <div className="row">
        {data.schedule.map((item) => (
          <Card name={item.title} weekType={weekType}/>
        ))}
      </div>
    </div>
  )
}

export default Schedule;
