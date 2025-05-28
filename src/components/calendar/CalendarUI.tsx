
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarUI({
  onClickDay,
  tileClassName,
  tileDisabled,
}: {
  onClickDay: (date: Date) => void;
  tileClassName: any;
  tileDisabled: any;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    <Calendar
      onClickDay={onClickDay}
      tileClassName={tileClassName}
      tileDisabled={tileDisabled}
      locale="en-GB"
      className="calendar"
      minDate={today}
    />
  );
}
