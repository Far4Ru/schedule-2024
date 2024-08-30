import "../../../style/Card.css"
import React from "react";
import { Lecture, WeekType } from "../Schedule";

interface CardConfig {
    name: string
    weekType: WeekType
    lectures: Lecture[]
    currentDay: string
}

const Card: React.FC<CardConfig> = (props) => {

  const compareWeekType = (lecture: Lecture, currentWeekType: WeekType) => {
    const lectureWeekType = lecture.weekType === 'числитель' ? WeekType.EVEN : WeekType.ODD
    return lectureWeekType === currentWeekType
  }

  const getCardContainer = () => {
      return props.name === props.currentDay? 'today-card' : 'card'
  }

  return (
    <div className="column">
        <div className={getCardContainer()}>
        <h3>{props.name}</h3>

        {props.lectures.filter(e => compareWeekType(e, props.weekType)).map((lecture, i) => (
          <div className="inner-container">
              {i ? <hr className="hr-shelf"></hr> : ''}
              <p className="leftcolumn">{lecture.time}</p>
              <p className="middlecolumn">{lecture.name} {lecture.type === 'лекция' ? '(лек)' : '(пр)'}<br /><text className="lecturer-name">{lecture.lecturer}</text></p>
              <p className="rightcolumn">{lecture.classroom}</p>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Card;
