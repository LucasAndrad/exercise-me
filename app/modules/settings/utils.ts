import { utcToZonedTime, format } from 'date-fns-tz';

// 1 minute === 60000 miliseconds
export const minutesToMiliseconds = (minutes: number) => minutes * 60000;
export const milesecondsToMinutes = (mileseconds: number) => mileseconds / 60000;

export const formatDateTime = (date: Date) => {
  const dateTimeFormated = format(date, 'HH:mm');
  return dateTimeFormated;
};

// get client local date time
export const localDateTime = (date: number) => {
  const clientTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dateString = new Date(date).toISOString();
  const clientDateTime = utcToZonedTime(dateString, clientTimeZone);
  return formatDateTime(clientDateTime);
};
