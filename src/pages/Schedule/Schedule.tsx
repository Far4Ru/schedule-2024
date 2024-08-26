import "../../style/Schedule.css"
import React, { useState, useEffect }  from "react";
import Card from "./components/Card";

interface DataConfig {
  name: string,
  schedule: {
    title: string
  }[]
}

const Schedule: React.FC = () => { 
  const [data, setData] = useState<DataConfig>({ name: '', schedule: []});

  useEffect(
    () => {
      getData().then((res)=>{
        setData(res)
      })
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
          <Card name={item.title}/>
        ))}
      </div>
    </div>
  )
}

export default Schedule;
