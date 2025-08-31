import './Header.css'
import React from 'react'

interface HeaderConfig {
    title: string
    subtitle: string
}

const Header: React.FC<HeaderConfig> = props => {
    return (
        <header className="schedule__header header">
            <div className="header__content">
                <div className="header__title">{props.title}</div>
                <div className="header__group">{props.subtitle}</div>
            </div>
        </header>
    )
}

export default Header
