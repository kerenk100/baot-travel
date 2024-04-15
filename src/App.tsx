import "./App.css";
import Map from "./components/utilities/map";
import Calendar from "./components/utilities/Calendar/calendar";
import { Event } from "./components/utilities/Calendar/Event";

const events: Event[] = [
  {
    summary: "Event 1", // Adding summary property
    start: {
      dateTime: "2024-04-15T09:00:00",
      timeZone: "UTC+2",
    },
    end: {
      dateTime: "2024-04-15T10:00:00",
      timeZone: "UTC+2",
    },
  },
  {
    summary: "Event 2", // Adding summary property
    start: {
      dateTime: "2024-04-16T10:00:00",
      timeZone: "UTC+2",
    },
    end: {
      dateTime: "2024-04-16T12:00:00",
      timeZone: "UTC+2",
    },
  },
];
function App() {
  return (
    <>
      <h1>Baot travel</h1>
      <div style={{ height: 300, width: 300 }}>
        <Map lat={7.2905715} lng={80.6337262}></Map>
        <Calendar events={events}></Calendar>
      </div>
    </>
  );
}

export default App;
