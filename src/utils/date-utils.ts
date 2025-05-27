const zeroPadding = (numText: string | number, length: number = 2) => {
  return `${numText}`.padStart(length, "0");
};

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const getFormattedDate = (date: Date, simpleDate: boolean = false) => {
  const year = zeroPadding(date.getFullYear(), 4);
  const day = zeroPadding(date.getDate(), 2);
  const fullMonth = months[date.getMonth()];
  const month = simpleDate ? fullMonth.slice(0, 3) : fullMonth;

  return `${day} ${month} ${year}`;
};

export const getTimeString = (date: Date, timeFix: boolean = false) => {
  if (timeFix) {
    date.setHours(date.getHours() - 7);
  }

  const hours: string = zeroPadding(date.getHours());
  const minutes: string = zeroPadding(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const getDateRange = (
  dateStart: Date,
  dateEnd: Date,
  simpleDate: boolean = false,
) => {
  const formattedDateStart = getFormattedDate(dateStart, simpleDate);
  const formattedDateEnd = getFormattedDate(dateEnd, simpleDate);

  if (formattedDateStart === formattedDateEnd) return formattedDateStart;
  return `${formattedDateStart} ~ ${formattedDateEnd}`;
};

export const getTimeRange = (timeStart: Date, timeEnd: Date) => {
  const timeStartString = getTimeString(timeStart, true);
  const timeEndString = getTimeString(timeEnd, true);

  if (timeStartString === timeEndString) return timeStartString;
  return `${timeStartString} ~ ${timeEndString}`;
};
