"use client";
import { useState, useEffect } from "react";
import { useHost } from "@/hooks/useHost";
import CalendarUI from "../calendar/CalendarUI";
import QuantitySelector from "./QuantitySelector";
import SaveLSButton from "./SaveLSButton";
import "./preBooking.scss";
import { formatDate } from "@/utils/functions";

export default function PreBooking({ id }: { id: string }) {
  const { host, loading, error } = useHost(id);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [calendarNew, setCalendarNew] = useState<string[]>([]);

  const pricePerDay = 3;

  useEffect(() => {
    const numDays = calendarNew.length ?? 0;
    setTotalPrice(quantity * numDays * pricePerDay);
  }, [quantity, calendarNew]);

  //Funciones para el renderizado del calentario
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

  //Agrega la clase a cada celda del calendario, dependiendo su estado
  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (host?.calendarSelected?.includes(dateStr) && date >= today)
      return "selected-date";
    if (calendarNew.includes(dateStr)) return "new-date";
    return "";
  };
  
  //Pone como disabled las fechas anteriores a hoy
  const tileDisabled = ({ date }: { date: Date }) => {
    const dateStr = formatDate(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return host?.calendarSelected.includes(dateStr) || date < today;
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
          <SaveLSButton
            host={host}
            quantity={quantity}
            totalPrice={totalPrice}
            calendarNew={calendarNew}
          />
        </>
      )}
    </div>
  );
}
