"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Host = {
  id: number;
  name: string;
  calendar: string[];
};

export default function CalendarComponent() {
  const [host, setHost] = useState<Host | null>(null);

  useEffect(() => {
    async function fetchHost() {
      try {
        const res = await fetch("/data/data.json");
        const json = await res.json();
        // Buscar host por ID
        const host = json.hosts.find((h: any) => h.id === 2);
        setHost(host);
      } catch (err) {
        console.error("Error loading host:", err);
      }
    }

    fetchHost();
  }, []);

  if (!host) return <div>Loading...</div>;

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const toggleDate = (date: Date) => {
    const dateStr = formatDate(date);
    const isSelected = host.calendar.includes(dateStr);

    const updatedDates = isSelected
      ? host.calendar.filter((d) => d !== dateStr)
      : [...host.calendar, dateStr];

    setHost({ ...host, calendar: updatedDates });
  };

  const tileClassName = ({ date }: { date: Date }) => {
    if (host.calendar.includes(formatDate(date))) {
      return "bg-green-300 text-black rounded-md";
    }
    return "";
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{host.name}&apos;s Calendar</h2>
      <Calendar
        onClickDay={toggleDate}
        tileClassName={tileClassName}
      />
      <div className="mt-4">
        <h3 className="font-semibold">Fechas seleccionadas:</h3>
        <ul className="list-disc ml-5">
          {host.calendar.sort().map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
