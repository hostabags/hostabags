import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Props {
  onClickDay: (date: Date) => void;
  tileClassName: (props: { date: Date; view: string }) => string | null | undefined;
  tileDisabled: (props: { date: Date; view: string }) => boolean;
}

export default function CalendarUI({
  onClickDay,
  tileClassName,
  tileDisabled,
}: Props) {
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
