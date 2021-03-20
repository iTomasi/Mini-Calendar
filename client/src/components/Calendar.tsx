import React, {useState, useEffect} from "react";
import {AllMonths} from "../months";
import "./css/calendar.css";

type CalendarProps = {
    onClick: React.MouseEventHandler<HTMLDivElement>
}

const Calendar = ({onClick}: CalendarProps) => {

    const [month, setMonth] = useState("");
    const [days, setDays] = useState<any>([]);
    const [theYear, setTheYear] = useState<number>();
    const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
    const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

    useEffect(() => {
        calendarMonthYear(calendarYear, calendarMonth)
    }, [onClick, calendarMonth])

    const calendarMonthYear = (year: number, month: number) => {

        const timeNow = new Date();
        const timeNow_month = timeNow.getMonth();
        const timeNow_year = timeNow.getFullYear();
        const timeNow_date = timeNow.getDate();

        const date = new Date(year, month);
        const date_month = date.getMonth();
        const date_year = date.getFullYear();

        setDays([]);
        setMonth(AllMonths()[month])
        setTheYear(year)

        const lastPassDaysMonth = new Date(year, month, 0).getDate();
        let lastDayCurrentMonth = new Date(year, month + 1, 0).getDay();

        if (lastDayCurrentMonth === 0) lastDayCurrentMonth = 7

        for (let i = 0; i < new Date(year, month).getDay() - 1; i++) {
            setDays((prevDay: any) => (
                [...prevDay, <div data-day={(lastPassDaysMonth - new Date(year, month).getDay() + 2) + i} data-month={date_month === 0 ? 11 : date_month - 1} data-year={date_month === 0 ? date_year - 1 : date_year} className="table__numbers-othermonth" onClick={onClick}>{(lastPassDaysMonth - new Date(year, month).getDay() + 2) + i}</div>]
            ))
        }

        for (let i = 0; i < new Date(year, month + 1, 0).getDate(); i++) {
            setDays((prevDay: any) => (
                [...prevDay,
                    timeNow_month === date_month &&
                    timeNow_year === date_year &&
                    timeNow_date === i + 1
                    ? <div data-day={i + 1} data-month={date_month} data-year={date_year} className="table__numbers-today" onClick={onClick}>{i + 1}</div>
                    : <div data-day={i + 1} data-month={date_month} data-year={date_year} onClick={onClick}>{i + 1}</div>
                ]
            ))
        }

        for (let i = 0; i < 7 - lastDayCurrentMonth; i++) {
            setDays((prevDay: any) => (
                [...prevDay, <div data-day={i + 1} data-month={date_month === 11 ? 1 : date_month + 1} data-year={date_month === 11 ? date_year + 1 : date_year} className="table__numbers-othermonth" onClick={onClick}>{i + 1}</div>]
            ))
        }
        
    }

    

    return (
        <div className="calendar">
            <div className="calendar__header">
                <i className="i__left fas fa-arrow-left" onClick={() => {
                    setCalendarMonth((prevMonth: any) => prevMonth === 0 ? 11 : prevMonth - 1)
                    setCalendarYear((prevYear: any) => calendarMonth === 0 ? prevYear - 1 : prevYear)
                }}></i>
                <h2 className="calendar__header-month">{`${month} ${theYear}`}</h2>
                <i className="i__right fas fa-arrow-right" onClick={() => {
                    setCalendarMonth((prevMonth: any) => prevMonth === 11 ? 0 : prevMonth + 1)
                    setCalendarYear((prevYear: any) => calendarMonth === 11 ? prevYear + 1 : prevYear)
                }}></i>
            </div>

            <div className="table">
                <div className="table__days">
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                    <div>Su</div>
                </div>

                <div className="table__numbers">
                    {days.map((day: any) => day)}
                </div>
            </div>
        </div>
    )
}

export default Calendar