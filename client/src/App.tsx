import React, {useEffect, useState} from 'react';
import Calendar from "./components/Calendar";
import AddEvent from "./components/AddEvent";

const App = () => {

  const [day, setDay] = useState("Select a Day");
  const [events, setEvents] = useState<any[]>([]);
  const [dayNum, setDayNum] = useState<string>()
  const [monthNum, setMonthNum] = useState<string>();
  const [yearNum, setYearNum] = useState<string>();
  const [event, setEvent] = useState<any>([]);
  const [reminderID, setReminderID] = useState<string>()

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          setEvents((prevEvents: any) => (
            [...prevEvents, {
              id: res[i].id,
              day: res[i].day,
              month: res[i].month,
              year: res[i].year,
              remembers: JSON.parse(res[i].remember)
            }]
          ))
        }
      })

  }, [])

  const selectingDay = (e: any) => {
    setEvent([]);
    setDay(`${e.target.dataset.day} / ${parseInt(e.target.dataset.month) + 1} / ${e.target.dataset.year}`)
    setDayNum(e.target.dataset.day)
    setMonthNum(e.target.dataset.month) 
    setYearNum(e.target.dataset.year);

    const filterRemembers = events.filter(element => element.day == e.target.dataset.day && element.month == e.target.dataset.month && element.year == e.target.dataset.year);

    try {
      setReminderID(filterRemembers[0].id)
      setEvent(filterRemembers[0].remembers)
    }

    catch(e) {
      setReminderID("0")
    }
  }

  const addingEvent = (e: any) => {
    e.preventDefault()

    if (day === "Select a Day") return

    const formData = new FormData(e.currentTarget);

    if (events.filter(element => element.day == formData.get("daynumber") && element.month == formData.get("monthnumber") && element.year == formData.get("yearnumber"))[0] !== undefined) {
      const arrayEvents = events;
      const arrayEvents_ID = arrayEvents.findIndex(element => element.day == formData.get("daynumber") && element.month == formData.get("monthnumber") && element.year == formData.get("yearnumber"))
      arrayEvents[arrayEvents_ID].remembers = [...arrayEvents[arrayEvents_ID].remembers, formData.get("addevent")]

      let arrayEvent = event;
      arrayEvent = [...arrayEvent, formData.get("addevent")]

      setEvents(arrayEvents);
      setEvent((prevEvent: any) => (
        [...prevEvent, formData.get("addevent")]
      ))
      
      fetch("http://localhost:4000/updating-reminder/" + formData.get("reminderid"), {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          remember: JSON.stringify(arrayEvent)
        })
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
        })
      
      return
    }

    setEvents((prevEvents: any) => ([
      ...prevEvents, {day: formData.get("daynumber"), month: formData.get("monthnumber"), year: formData.get("yearnumber"), remembers: [formData.get("addevent")]}
    ]))

    setEvent((prevEvent: any) => (
      [...prevEvent, formData.get("addevent")]
    ))

    fetch("http://localhost:4000/saving-reminder", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        day: formData.get("daynumber"),
        month: formData.get("monthnumber"),
        year: formData.get("yearnumber"),
        remember: JSON.stringify([formData.get("addevent")])
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
  }

  const removingReminder = (e: any): void => {
    const targetData = e.target.dataset

    const removing = event.filter((element:any) => element !== targetData.msg)
    const arrayEvents = events;
    const arrayEvents_ID = events.findIndex((element: any) => element.id == targetData.id);
    arrayEvents[arrayEvents_ID].remembers = removing;

    setEvent(removing)
    setEvents(arrayEvents)

    fetch("http://localhost:4000/removing-reminder/" + targetData.id, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        remember: JSON.stringify(removing)
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
  }

  return (
    <>
    <Calendar onClick={selectingDay} />
    <AddEvent day={day} event_list={event[0] === undefined ? ["No Events."] : event} dayNum={dayNum} monthNum={monthNum} yearNum={yearNum} reminderID={reminderID} onClick={removingReminder} onSubmit={addingEvent}/>
    </>
  );
}

export default App;
