import React, {Component} from 'react';

let mentorSummary = (props) => (
    <div className="content mentor-summary">
        <div className="mentor-photo" style={{backgroundImage:"url('"+props.profile_photo+"')"}}></div>
        <div className="mentor-personal">
            <div className="name">{ props.user_firstName } { props.user_lastName }</div>
            <div className="position">{ (props.employment && props.employment.jobtitle != undefined) ? props.employment.jobtitle : "" } { (props.employment && props.employment.employer != undefined) ? " / "+props.employment.employer : "" }</div>
            <div className="introduction">{ props.summary }</div>
        </div>
        <div className="connect">
            <div className="button">Apply</div>
        </div>
    </div>
)

export default mentorSummary;