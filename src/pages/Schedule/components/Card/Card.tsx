import './Card.css'
import React from 'react'
import CardItem from '../CardItem/CardItem'
import { Lecture, WeekType } from '../../types'

interface CardConfig {
    name: string
    weekType: WeekType
    lectures: Lecture[]
    currentDay?: string
    nextDay?: { dayName: string, weekType: WeekType }
}

const Card: React.FC<CardConfig> = props => {

    const compareWeekType = (lecture: Lecture, currentWeekType: WeekType) => {
        const lectureWeekType = lecture.weekType === 'числитель' ? WeekType.EVEN : WeekType.ODD
        return lectureWeekType === currentWeekType
    }

    const getCardContainer = () => {
        return props.name === props.currentDay? ' lesson-day--today' : ''
    }
    const getNextDayCardContainer = () => {
        if (props.nextDay === undefined) { return '' }
        const isNextDay = props.name === props.nextDay.dayName
        const isNextWeek = props.weekType === props.nextDay.weekType
        return isNextDay && isNextWeek ? ' lesson-day--next' : '' 
    }

    const lectures = props.lectures.filter(e => compareWeekType(e, props.weekType))

    const lecturesWithDividers = () => {
        const result: Lecture[] = []
        for (const lecture of lectures) {
            result.push({
                weekType: '',
                time: '',
                name: '',
                type: '',
                lecturer: '',
                classroom: '',
            })
            result.push(lecture)
        }
        if (result.length > 0) { result.shift() }
        return result
    }

    return (
        <article className={`lesson-day${getCardContainer()}${getNextDayCardContainer()}`}>
            <h3 className="lesson-day__title">{props.name}</h3>
            <div className="lesson-day__body">
                {
                    lecturesWithDividers().map((lecture, i) => (
                        <div key={i}>
                            {
                                (lecture.weekType === '')
                                    ? <div className="lesson-day__divider"></div>
                                    : <CardItem lecture={lecture}/>
                            }
                        </div>
                    ),
                    )
                }

            </div>
        </article>
    )
}

export default Card
