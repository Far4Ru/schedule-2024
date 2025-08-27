import "./Navigation.css"
import React from "react";
import { WeekType } from "../../Schedule";

interface NavigationConfig {
  info: string
  weekType: WeekType
  currentWeekType: WeekType
  onClick: any
}

const Navigation: React.FC<NavigationConfig> = (props) => {
  function getSelectedClass(weekType: WeekType) {
    return props.weekType === weekType ? 'nav-button-selected' : 'nav-button-unselected'
  }
  function getCurrentWeekClass(weekType: WeekType) {
    return props.currentWeekType === weekType ? 'nav-button-current' : 'nav-button-notcurrent'
  }
  return (
    <nav className="navigation">
        <div className="nav-content">
            <div className="nav-left-text">{props.info}</div>
            <div className="nav-buttons">
                <button className={`${getSelectedClass(WeekType.EVEN)} ${getCurrentWeekClass(WeekType.EVEN)}`} onClick={props.onClick}>числитель</button>
                <button className={`${getSelectedClass(WeekType.ODD)} ${getCurrentWeekClass(WeekType.ODD)}`} onClick={props.onClick}>знаменатель</button>
            </div>
        </div>
    </nav>
  )
}

export default Navigation;
