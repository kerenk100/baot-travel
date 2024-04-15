import React, { useEffect } from "react";
import { CalendarProps } from "./CalendarProps";
import { Event } from "./Event";
const gapi = (window as any).gapi;

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  useEffect(() => {
    const handleClientLoad = () => {
      const CLIENT_ID = "1";
      const API_KEY = "2";
      const DISCOVERY_URL =
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: [DISCOVERY_URL],
            plugin_name: "chat",
            scope: "https://www.googleapis.com/auth/calendar",
          })
          .then(() => {
            //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          });
      });
    };

    handleClientLoad();
  }, []);

  const handleClick = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        // Loop through the events and insert each event to Google Calendar
        events.forEach((event: Event) => {
          const request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });

          request.execute((event: any) => {
            console.log(event);
            window.open(event.htmlLink);
          });
        });
      });
  };

  return (
    <div>
      <button onClick={handleClick}>Insert Events</button>
    </div>
  );
};

export default Calendar;
