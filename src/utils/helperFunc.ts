import { FieldBuffer, DayObj } from '../types';
import { hours, weekdays } from '../config/constant';

export const processData = (length: number, fields: FieldBuffer[]) => {
  /*   const convertedData: DayObj[] = [
    { date: 'Mon' },
    { date: 'Tue' },
    { date: 'Wed' },
    { date: 'Thu' },
    { date: 'Fri' },
    { date: 'Sat' },
    { date: 'Sun' },
  ]; */

  const convertedData = weekdays.map(weekday => {
    const obj: DayObj = { date: weekday };
    hours.map(hour => {
      obj[hour] = 0;
    });
    return obj;
  });

  for (let i = 0; i < length; i++) {
    const dayObj = convertedData.find(element => element.date === fields[0].values.buffer[i]);
    dayObj && (dayObj[fields[1].values.buffer[i]] = fields[2].values.buffer[i]);
  }
  return { data: convertedData };
};
