"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Host } from "@/types/host";


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

  const formatDisplayDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
    const isSelected = host.calendar.includes(dateStr);
    const updatedDates = isSelected
      ? host.calendar.filter((d) => d !== dateStr)
      : [...host.calendar, dateStr];

    const updatedHost = { ...host, calendar: updatedDates };
    setHost(updatedHost);
    saveDates(updatedHost);
  };

  const tileClassName = ({ date }: { date: Date }) => {
    if (host?.calendar.includes(formatDate(date))) {
      return "selected-date";
    }
    return "";
  };

  if (!host) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{host.name}&apos;s Calendar</h2>
      <Calendar onClickDay={toggleDate} tileClassName={tileClassName} />
      <div className="mt-4">
        <h3 className="font-semibold">Available dates:</h3>
        <ul className="list-disc ml-5">
          {host.calendar.map((date) => (
            <li key={date}>{formatDisplayDate(date)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}