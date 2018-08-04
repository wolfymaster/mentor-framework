import React, {Component} from 'react';

let mentorSummary = (props) => (
    <div className="content mentor-summary">
        <div className="mentor-photo" style={{backgroundImage:"url('https://www.eriepa.com/uploads/photos/l/1511280344_280344_kristi.jpg')"}}></div>
        <div className="mentor-personal">
            <div className="name">{ props.name }</div>
            <div className="position">{ props.position }</div>
            <div className="introduction">{ props.summary }</div>
        </div>
        <div className="connect">
            <div className="button">Apply</div>
        </div>
    </div>
)

export default mentorSummary;