import React, { useEffect } from "react";
import { CalendarProps } from "./CalendarProps";
import { Event } from "./Event";
const gapi = (window as any).gapi;

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  useEffect(() => {
    const handleClientLoad = () => {
      const CLIENT_ID = "6";
      const API_KEY = "A";
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
        events.forEach((eventDetails: any) => {
          const parsedStartDate: string = new Date()
            .toISOString()
            .replace(/\.\d+/, "")
            .replace(" ", "T");
          const parsedEndDate: string = new Date()
            .toISOString()
            .replace(/\.\d+/, "")
            .replace(" ", "T");

          gapi.client.calendar.events
            .insert({
              calendarId: "primary",
              resource: {
                summary: eventDetails.summary,
                description: eventDetails.description,
                start: {
                  dateTime: parsedStartDate,
                  timeZone: "UTC+2",
                },
                end: {
                  dateTime: parsedEndDate,
                  timeZone: "UTC+2",
                },
              },
            })
            .then((response: any) => {
              console.log("Event added:", response);
              alert("Event added to Google Calendar!");
            })
            .catch((error: any) => {
              console.error("Error adding event:", error);
              alert("Error adding event to Google Calendar.");
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
