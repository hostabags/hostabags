
"use client";
import { useState, useEffect } from "react";
import { useHost } from "@/hooks/useHost";
import CalendarUI from "./CalendarUI";
import QuantitySelector from "./QuantitySelector";
import ConfirmBooking from "./ConfirmBooking";
import { Host } from "@/types/host";
import "./calendar.scss";

export default function CalendarComponent({ id }: { id: number }) {
  const { host, setHost, loading, error } = useHost(id);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const numDays = host?.calendarNew.length ?? 0;
    setTotalPrice(quantity * numDays * 3);
  }, [quantity, host?.calendarNew]);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  const toggleDate = (date: Date) => {
    if (!host) return;
    const dateStr = formatDate(date);
    if (host.calendarSelected.includes(dateStr)) return;

    const updatedCalendarNew = host.calendarNew.includes(dateStr)
      ? host.calendarNew.filter((d) => d !== dateStr)
      : [...host.calendarNew, dateStr];

    setHost({ ...host, calendarNew: updatedCalendarNew });
  };

  const onConfirm = async (confirmedDates: string[], updatedHost: Host) => {
    setHost(updatedHost);
    await fetch(`http://localhost:3001/hosts/${updatedHost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedHost),
    });
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (host?.calendarSelected.includes(dateStr) && date >= today)
      return "selected-date";
    if (host?.calendarNew.includes(dateStr)) return "new-date";
    return "";
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      (!!host && host.calendarSelected.includes(dateStr)) || date < today
    );
  };

  if (loading)
    return <div className="text-center mt-10">Loading calendar...</div>;
  if (!host) return null;

  return (
    <div className="p-6 flex flex-col items-center bg-white shadow rounded-xl max-w-xl mx-auto">
      <CalendarUI
        onClickDay={toggleDate}
        tileClassName={tileClassName}
        tileDisabled={tileDisabled}
      />

      {host.calendarNew.length > 0 && (
        <>
          <label className="block mt-6 mb-2 font-medium text-gray-800">
            Number of bags:
          </label>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

          <ConfirmBooking
            host={host}
            quantity={quantity}
            totalPrice={totalPrice}
            onConfirm={onConfirm}
          />

          <div className="text-center mt-4 text-lg text-gray-700 font-semibold">
            Total price: {totalPrice}€
          </div>
        </>
      )}
    </div>
  );
}
