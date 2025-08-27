import { Lecture } from '../../types'
import './CardItem.css'
import React from 'react'

interface CardItemConfig {
    lecture: Lecture
}

const CardItem: React.FC<CardItemConfig> = props => {
    return (
        <div className="text-section">
            <div className="text-column">
                <div className="time-group">
                    <div className="time-row">
                        <div className="time-block no-wrap">{props.lecture.time.split('-')[0]}</div>
                        <div className="time-separator no-wrap">-</div>
                        <div className="time-block no-wrap">{props.lecture.time.split('-')[1]}</div>
                    </div>
                </div>
            </div>
            <div className="text-column">
                <div className="name-block">{props.lecture.name} {props.lecture.type === 'лекция' ? '(лекция)' : '(практика)'}</div>
                <div className="author-block">{props.lecture.lecturer}</div>
            </div>
            <div className="text-column">
                <div className="code-block no-wrap">{props.lecture.classroom}</div>
            </div>
        </div>
    )
}

export default CardItem
