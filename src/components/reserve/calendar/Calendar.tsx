"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Host } from "@/types/host";
import { Check, User } from "lucide-react";
import  "./calendar.css";


export default function CalendarComponent() {
  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmedDates, setConfirmedDates] = useState<string[]>([]);
  const [showConfirmed, setShowConfirmed] = useState(false);

  const [hostId, setHostId] = useState<number | null>(2);
 

  useEffect(() => {
    async function fetchData() {
        try {
       setLoading(true)
      const res = await fetch(`http://localhost:3001/hosts/${hostId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
      const data = await res.json();
      setHost(data);
       setError(null)
       } catch (err) {
        console.error("Error fetching host data:", err)
        setError("Failed to load calendar data")
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  }, []);

  const formatDate = (date: Date) => date.toLocaleDateString("en-GB"); 


  const saveDates = async (updatedHost: Host) => {
    try {
     const res = await fetch(`http://localhost:3001/hosts/${updatedHost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHost),
       })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
    } catch (err) {
      console.error("Error saving:", err)
      setError("Failed to save changes")
    }
  }

  const toggleDate = (date: Date) => {
    if (!host) return;
    const dateStr = formatDate(date);


    if (host.calendarSelected.includes(dateStr)) return;

    let updatedCalendarNew: string[];
    if (host.calendarNew.includes(dateStr)) {

      updatedCalendarNew = host.calendarNew.filter((d) => d !== dateStr);
    } else {

      updatedCalendarNew = [...host.calendarNew, dateStr];
    }

    const updatedHost = { ...host, calendarNew: updatedCalendarNew };
    setHost(updatedHost);
    saveDates(updatedHost);
  };

  const confirmDates = () => {
    if (!host) return;
    const newConfirmed = host.calendarNew.filter(
      (d) => !host.calendarSelected.includes(d)
    );
    const updatedCalendarSelected = [
      ...host.calendarSelected,
      ...newConfirmed,
    ];
    const updatedHost = {
      ...host,
      calendarSelected: updatedCalendarSelected,
      calendarNew: [],
    };
    setHost(updatedHost);
    setConfirmedDates(newConfirmed);
    setShowConfirmed(true);
    saveDates(updatedHost);
 
    // setTimeout(() => setShowConfirmed(false), 3000);
  };
  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
      // Si está seleccionada y NO es pasada, aplica el estilo
      if (
        host?.calendarSelected.includes(dateStr) &&
        date >= today
      ) {
        return "selected-date";
      } else if (host?.calendarNew.includes(dateStr)) {
        return "new-date";
      }
      return "";
    };
const tileDisabled = ({ date }: { date: Date }) => {
  const dateStr = formatDate(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignora la hora para comparar solo la fecha
  return (
    (!!host && host.calendarSelected.includes(dateStr)) ||
    date < today // Desactiva fechas en el pasado
  );
};
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    )
  }
if (!host) return null

  return (
    <div className=" mx-auto p-6 bg-white flex flex-col items-center">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{host.name}&apos;s Calendar</h1>
        </div>
        <p className="text-gray-600">Select your dates for  luggage hosting</p>
      </div>

 
      <div className=" p-6 mb-6">
       
        {(() => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return (
            <Calendar
              onClickDay={toggleDate}
              tileClassName={tileClassName}
              tileDisabled={tileDisabled}
              locale="en-GB"
              className="calendar"
              minDate={today}
            />
          );
        })()}
      </div>


      {host.calendarNew.length > 0 && (
        <div className="text-center">
          <button
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
            onClick={confirmDates}
          >
            <Check className="h-5 w-5" />
            <span>
              Confirm {host.calendarNew.length} New Date{host.calendarNew.length !== 1 ? "s" : ""}
            </span>
          </button>
        </div>
      )}

        {showConfirmed && confirmedDates.length > 0 && (
        <div className="mt-6 text-center">
          <div className="text-green-700 font-semibold mb-2">
            Dates confirmed
          </div>
          <ul className="text-gray-700">
            {confirmedDates.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        </div>
      )}


    </div>
  )
}