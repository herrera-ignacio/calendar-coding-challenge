import { useState, useReducer } from "react";

const eventsReducer = (state, action) => {
  // key: date, value: events
  return {};
};

const initialState = {
  "1": [
    {
      id: 1,
      title: "Event 1",
      time: "10:00",
    },
  ],
};

const daysOfMonth =

function App() {
  const [events, dispatch] = useReducer(eventsReducer, initialState);
  const [eventDate, setEventDate] = useState();
  const [eventTitle, setEventTitle] = useState();
  const [eventTime, setEventTime] = useState();
  const [showAddEventInputs, setShowAddEventInputs] = useState(true);


  const onClickDay = (day) => {
    console.log("CLICK DAY!", day);
    setEventDate(day);
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
    <div>
      <header className="p-2">
        <h1>Calendar</h1>
      </header>
      <main>
        <div className="p-2 flex flex-col gap-2">
          <button
            className={`text-bold cursor-pointer rounded border border-solid border-black bg-green-600 p-2 font-semibold text-white${isAddEventDisabled ? " bg-gray-600 cursor-default" : ""}`}
            disabled={isAddEventDisabled}
            onClick={onAddEvent}
          >
            Add event
          </button>
          {showAddEventInputs && (
            <div className="flex gap-2">
              <input value={eventDate} onChange={e => setEventDate(e.target.value)} className="border w-1/6" name="event-date" title="event-date" type="date" />
              <input value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="border w-1/4" name="event-title" title="event-title" type="text" placeholder="Event name"/>
              <input value={eventTime} onChange={e => setEventTime(e.target.value)} className="border" name="event-time" title="event-time" type="time" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1 p-2">
          {Array.from({length: 31 }).map((_, index) => {
            const dayEvents = events[index.toString()];
            return (
              // you can either use overflow-y-auto or remove fixed height (e.g., use min-h-32 instead)
              <div key={index} onClick={() => onClickDay(index)} className="h-32 overflow-y-auto bg-gray-400 flex flex-col p-2">
                <span className="text-white">{index}</span>
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
