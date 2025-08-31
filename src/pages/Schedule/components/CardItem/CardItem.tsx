import { Lecture } from '../../types'
import './CardItem.css'
import React from 'react'

interface CardItemConfig {
    lecture: Lecture
}

const CardItem: React.FC<CardItemConfig> = props => {
    return (
        <div className="lesson">
            <div className="lesson_column">
                <div className="lesson__time">
                    <div className="time-row">
                        <time dateTime={props.lecture.time.split('-')[0]} className="lesson__start-time no-wrap">{props.lecture.time.split('-')[0]}</time>
                        <div className="lesson__time-separator no-wrap">-</div>
                        <time dateTime={props.lecture.time.split('-')[1]} className="lesson__end-time no-wrap">{props.lecture.time.split('-')[1]}</time>
                    </div>
                </div>
            </div>
            <div className="lesson_column">
                <div className="lesson__name">{props.lecture.name} {props.lecture.type === 'лекция' ? '(лекция)' : '(практика)'}</div>
                <div className="lesson__teacher">{props.lecture.lecturer}</div>
            </div>
            <div className="lesson_column">
                <div className="lesson__location no-wrap">{props.lecture.classroom}</div>
            </div>
        </div>
    )
}

export default CardItem
