"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Host } from "@/types/host";
import  "./calendar.css";


export default function CalendarComponent() {
  const [host, setHost] = useState<Host | null>(null);
  const hostId = 1; 

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:3001/hosts/${hostId}`);
      const data = await res.json();
      setHost(data);
    }

    fetchData();
  }, []);

  const formatDate = (date: Date) => date.toLocaleDateString("sv-SE"); 

//   const formatDisplayDate = (date: string) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

  const saveDates = async (updatedHost: Host) => {
    try {
      await fetch(`http://localhost:3001/hosts/${updatedHost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHost),
      });
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const toggleDate = (date: Date) => {
    if (!host) return;
    const dateStr = formatDate(date);

 // Si la fecha está en calendarSelected, no hacer nada
    if (host.calendarSelected.includes(dateStr)) return;

    let updatedCalendarNew: string[];
    if (host.calendarNew.includes(dateStr)) {
      // Si ya está en calendarNew, la quitamos
      updatedCalendarNew = host.calendarNew.filter((d) => d !== dateStr);
    } else {
      // Si no está, la agregamos
      updatedCalendarNew = [...host.calendarNew, dateStr];
    }

    const updatedHost = { ...host, calendarNew: updatedCalendarNew };
    setHost(updatedHost);
    saveDates(updatedHost);
  };

  const confirmDates = () => {
    if (!host) return;
    const updatedCalendarSelected = [
      ...host.calendarSelected,
      ...host.calendarNew.filter((d) => !host.calendarSelected.includes(d)),
    ];
    const updatedHost = { ...host, calendarSelected: updatedCalendarSelected, calendarNew: [] };
    setHost(updatedHost);
    saveDates(updatedHost);
  };
  const tileClassName = ({ date }: { date: Date }) => {
    if (host?.calendarSelected.includes(formatDate(date))) {
      return "selected-date";
    } else if (host?.calendarNew.includes(formatDate(date))) {
      return "new-date";
    }
    return "";
  };
 const tileDisabled = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    return !!host && host.calendarSelected.includes(dateStr);
  };
  if (!host) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{host.name}&apos;s Calendar</h2>
      <Calendar 
        // key={host.calendarNew.join(",") + host.calendarSelected.join(",")}
        onClickDay={toggleDate} 
        tileClassName={tileClassName} 
        tileDisabled={tileDisabled}
        locale="en-US" 
        className="calendar"/>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={confirmDates}
        disabled={host.calendarNew.length === 0}
      >
        Confirmar fechas nuevas
      </button>
      {/* <div className="mt-4">
        <h3 className="font-semibold">Available dates:</h3>
        <ul className="list-disc ml-5">
          {host.calendar.map((date) => (
            <li key={date}>{formatDisplayDate(date)}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}