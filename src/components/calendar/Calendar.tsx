"use client";
import { useState, useEffect } from "react";
import { useHost } from "@/hooks/useHost";
import CalendarUI from "./CalendarUI";
import QuantitySelector from "./QuantitySelector";
import ConfirmBooking from "./ConfirmBooking";
import { Host } from "@/types/host";
import { database } from "@/config/firebase";
import { ref, update } from "firebase/database";
import "./calendar.scss";

export default function CalendarComponent({ id }: { id: string }) {
  const { host, setHost, loading, error } = useHost(Number(id));
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const pricePerDay = 3; 

  useEffect(() => {
    const numDays = host?.calendarNew.length ?? 0;
    setTotalPrice(quantity * numDays * pricePerDay);
  }, [quantity, host?.calendarNew]);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  const toggleDate = (date: Date) => {
    if (!host) return;
    const dateStr = formatDate(date);
    if (host?.calendarSelected?.includes(dateStr)) return;

    const updatedCalendarNew = host.calendarNew.includes(dateStr)
      ? host.calendarNew.filter((d) => d !== dateStr)
      : [...host.calendarNew, dateStr];

    setHost({ ...host, calendarNew: updatedCalendarNew });
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
        calendarNew: [] // Clear calendarNew in the database as well
      });

      setHost(finalHost);
      localStorage.removeItem(`calendarNew-${updatedHost.id}`);
    } catch (error) {
      console.error("Error updating host:", error);
      throw error;
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (host?.calendarSelected?.includes(dateStr) && date >= today)
      return "selected-date";
    if (host?.calendarNew.includes(dateStr)) return "new-date";
    return "";
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      (!!host && host?.calendarSelected?.includes(dateStr)) || date < today
    );
  };

  if (loading)
    return <div className="text-center mt-10">Loading calendar...</div>;
  if (!host) return null;
  if (error) {
      return (
        <div className="text-center mt-10 text-red-600">
          {error}
        </div>
      );
    }

  return (
    <div className="calendarContainer">
      <CalendarUI
        onClickDay={toggleDate}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
      />

      {host.calendarNew.length > 0 && (
        <>
          <label className="block mt-6 text-sm font-medium text-gray-800">
            Number of bags:
          </label>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <div className="text-center mt-4 text-lg text-gray-700 font-semibold">
            Total price: <span className="font-bold text-xl evid">{totalPrice}€</span>
          </div>
          <ConfirmBooking
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
