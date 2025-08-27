import "../../../style/Header.css"
import React from "react";

interface HeaderConfig {
    title: string
    subtitle: string
}

const Header: React.FC<HeaderConfig> = (props) => {
  return (
    <header className="header">
        <div className="header-content">
            <div className="left-text">{props.title}</div>
            <div className="right-text">{props.subtitle}</div>
        </div>
    </header>
  )
}

export default Header;
