import React, { useEffect } from "react";
import { CalendarProps } from "./CalendarProps";


const Calendar: React.FC<CalendarProps> = ({ events }) => {
  useEffect(() => {
    const insertEventsToGoogleCalendar = async () => {
      try {
        const gapi = (window as any).gapi;
        const calendar = gapi.client.calendar;

        // Assuming you have already obtained an access token
        // and authenticated the user
        const accessToken = process.env.REACT_APP_GOOGLE_CALENDAR_ACCESS_TOKEN;

        // Loop through the events and insert each event to Google Calendar
        for (const event of events) {
          const request = calendar.events.insert({
            calendarId: "primary",
            resource: event,
            auth: accessToken,
          });

          await request.execute();
        }

        console.log("Events inserted successfully to Google Calendar");
      } catch (error) {
        console.error("Error inserting events to Google Calendar:", error);
      }
    };

    insertEventsToGoogleCalendar();
  }, [events]);

  return null;
};

export default Calendar;
