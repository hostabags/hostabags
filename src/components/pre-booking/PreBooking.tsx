"use client";
import { useState, useEffect } from "react";
import { useHost } from "@/hooks/useHost";
import CalendarUI from "../calendar/CalendarUI";
import QuantitySelector from "./QuantitySelector";
import SaveBooking from "./SaveBooking";
import type { Host } from "@/types/host";
import { database } from "@/config/firebase";
import { ref, update } from "firebase/database";
import "./preBooking.scss";

export default function PreBooking({ id }: { id: string }) {
  const { host, setHost, loading, error } = useHost(id);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [calendarNew, setCalendarNew] = useState<string[]>([]);

  const pricePerDay = 3;

  useEffect(() => {
    const numDays = calendarNew.length ?? 0;
    console.log("numDays:", numDays);
    console.log("calendarNew:", calendarNew);
    setTotalPrice(quantity * numDays * pricePerDay);
  }, [quantity, calendarNew]);

  // Funcion para darle formato a la fecha actual
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  console.log("host selected:",host)

  //Agregar los dias seleccionados en el estado
  const toggleDate = (date: Date) => {
    if (!host) return;
    const dateStr = formatDate(date);
    if (host?.calendarSelected?.includes(dateStr)) return;

    const updatedCalendarNew = calendarNew.includes(dateStr)
      ? calendarNew.filter((d) => d !== dateStr)
      : [...calendarNew, dateStr];

    setCalendarNew(updatedCalendarNew);
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (host?.calendarSelected?.includes(dateStr) && date >= today)
      return "selected-date";
    if (calendarNew.includes(dateStr)) return "new-date";
    return "";
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      (host?.calendarSelected.includes(dateStr)) || date < today
    );
  };


  const onConfirm = async (confirmedDates: string[], updatedHost: Host) => {
    try {
      const updatedCalendarSelected = [
        ...new Set([...updatedHost.calendarSelected, ...confirmedDates]),
      ];

      const finalHost = {
        ...updatedHost,
        calendarSelected: updatedCalendarSelected,
        calendarNew: [], // solo en estado, no se enviará al backend
      };

      // Update only the calendarSelected field in Firebase
      const hostRef = ref(database, `hosts/${updatedHost.id}`);
      await update(hostRef, {
        calendarSelected: updatedCalendarSelected,
        calendarNew: [], // Clear calendarNew in the database as well
      });

      setHost(finalHost);
      localStorage.removeItem(`calendarNew-${updatedHost.id}`);
    } catch (error) {
      console.error("Error updating host:", error);
      throw error;
    }
  };


  if (loading)
    return <div className="text-center mt-10">Loading calendar...</div>;
  if (!host) return null;
  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="calendarContainer">
      <CalendarUI
        onClickDay={toggleDate}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
      />

      {calendarNew.length > 0 && (
        <>
          <label className="block mt-6 text-sm font-medium text-gray-800">
            Number of bags:
          </label>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <div className="text-center mt-4 text-lg text-gray-700 font-semibold">
            Total price:{" "}
            <span className="font-bold text-xl evid">{totalPrice}€</span>
          </div>
          <SaveBooking
            host={host}
            quantity={quantity}
            totalPrice={totalPrice}
            onConfirm={onConfirm}
          />
        </>
      )}
    </div>
  );
}
