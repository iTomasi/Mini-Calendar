import React from "react";
import "./css/addEvent.css";

interface IAddEvent {
    day: string,
    event_list: any,
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    dayNum?: string,
    monthNum?: string,
    yearNum?: string,
    reminderID?: string,
    onClick: any

}

const AddEvent = ({day, event_list, onSubmit, dayNum, monthNum, yearNum, reminderID, onClick}: IAddEvent) => {

    return (
        <div className="addEvent">
            <h2 className="addEvent__date">{day}</h2>

            <form className="addEvent__form" onSubmit={onSubmit}>
                <input type="text" placeholder="Add An Event..." name="addevent"/>
                <input type="number" placeholder="Day Number" name="daynumber" value={dayNum} style={{display: "none"}}/>
                <input type="number" placeholder="Month Number" name="monthnumber" value={monthNum} style={{display: "none"}}/>
                <input type="number" placeholder="Year Number" name="yearnumber" value={yearNum} style={{display: "none"}}/>
                <input type="number" placeholder="reminderid" name="reminderid" value={reminderID} style={{display: "none"}}/>
                <button type="submit">Add</button>
            </form>

            <div className="addEvent__list">{
                <ul>
                    {event_list.map((event: any) => (
                        event === "No Events." ?
                        <li>{event}</li> :
                        <>
                        <li>{event} <i className="i__times fas fa-times" data-day={dayNum} data-month={monthNum} data-year={yearNum} data-id={reminderID} data-msg={event} onClick={onClick}></i></li>
                        </>
                    ))}
                </ul>
            }</div>
        </div>
    )
}

export default AddEvent