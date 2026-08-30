import { WeekType } from '../../types'
import './Navigation.css'
import React from 'react'

interface NavigationConfig {
    info: string
    weekType: WeekType
    currentWeekType: WeekType
    onClick: any
}

const Navigation: React.FC<NavigationConfig> = props => {
    function getSelectedClass(weekType: WeekType) {
        return props.weekType === weekType ? ' nav__button--selected' : ''
    }
    function getCurrentWeekClass(weekType: WeekType) {
        return props.currentWeekType === weekType ? ' nav__button--current' : ''
    }
    return (
        <nav className="schedule__nav nav">
            <div className="nav__content">
                <div className="nav-header__title">{props.info}</div>
                <div className="nav__controls">
                    <button className={`nav__button${getSelectedClass(WeekType.ODD)}${getCurrentWeekClass(WeekType.ODD)}`} onClick={props.onClick}>числитель</button>
                    <button className={`nav__button${getSelectedClass(WeekType.EVEN)}${getCurrentWeekClass(WeekType.EVEN)}`} onClick={props.onClick}>знаменатель</button>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
