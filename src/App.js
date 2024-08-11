import { useState, useReducer } from "react";
import {getDaysInMonth} from "./getDaysInMonth";

const eventsReducer = (state, action) => {
  // key: date, value: events (title, time, id)
  if (action?.type === "EVENT_ADD") {
    const dayEvents = state[action.event.date] ?? [];
    return {
      ...state,
      [action.event.date]: [...dayEvents, {
        ...action.event,
        id: action.event.date + action.event.title + action.event.time
      }]
    }
  }

  return {
    ...state
  };
};

const MONTH = 8;
const YEAR = 2024;
const daysOfMonth = getDaysInMonth(8, 2024);
const daysLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const calendarDate = new Date(YEAR, MONTH, 1);

const initialState = {
  "2024-08-02": [
    {
      id: 1,
      title: "Demo event",
      time: "10:00",
    },
  ],
};

function App() {
  const [events, dispatch] = useReducer(eventsReducer, initialState);
  const [eventDate, setEventDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [showAddEventInputs, setShowAddEventInputs] = useState(true);

  const onClickDay = (dtString) => {
    setEventDate(dtString);
  }

  const onAddEvent = () => {
    dispatch({ type: "EVENT_ADD", event: { title: eventTitle, date: eventDate, time: eventTime } })
    clearInputs();
  }

  const clearInputs = () => {
    setEventDate("");
    setEventTitle("");
    setEventTime("");
  }

  const isAddEventDisabled = !eventDate || !eventTitle || !eventTime;

  return (
    <div className="p-2">
      <header>
        <h1 className="text-xl">Calendar</h1>
      </header>
      <main>
        <h2 className="text-lg">{calendarDate.getMonth()}/{calendarDate.getFullYear()}</h2>
        <div className="py-2 flex flex-col gap-2">
          <button
            className={`${isAddEventDisabled ? "bg-gray-400 cursor-default" : "bg-green-600 cursor-pointer"} text-bold rounded border border-solid border-black p-2 font-semibold text-white`}
            disabled={isAddEventDisabled}
            onClick={onAddEvent}
          >
            Add event
          </button>
          {showAddEventInputs && (
            <div className="py-2 flex gap-2">
              <input value={eventDate} onChange={e => {
                setEventDate(e.target.value);
              }} className="border w-1/6 p-1" name="event-date" title="event-date" type="date" />
              <input value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="border w-1/4 p-1" name="event-title" title="event-title" type="text" placeholder="Event name"/>
              <input value={eventTime} onChange={e => setEventTime(e.target.value)} className="border p-1" name="event-time" title="event-time" type="time" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1 py-2">
          {daysOfMonth.map(dt => {
            const dtString = dt.toLocaleDateString("sv-SE"); // YYYY-MM-DD format
            const dayEvents = events[dtString];
            return (
              // you can either use overflow-y-auto or remove fixed height (e.g., use min-h-32 instead)
              <div key={dtString} onClick={() => onClickDay(dtString)} className="h-32 overflow-y-auto bg-gray-400 flex flex-col p-2">
                <span className="text-white">{daysLabels[dt.getDay()]} - {dt.getDate()}</span>
                {dayEvents?.length > 0 && dayEvents.map(t => (
                  // TODO Add on click to edit/remove event
                  <div key={t.id} className="bg-blue-400 p-2 rounded border border-solid border-black">
                    <span>{t.title} - {t.time}</span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
