import "../../../style/Card.css"
import React from "react";

interface CardConfig {
    name: string
}

const Card: React.FC<CardConfig> = (props) => {
  return (
    <div className="column">
        <div className="card">
        <h3>{props.name}</h3>
        <p>Some text</p>
        <p>Some text</p>
        </div>
    </div>
  )
}

export default Card;
