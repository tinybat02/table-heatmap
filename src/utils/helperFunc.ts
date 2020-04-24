import { FieldBuffer, DayObj } from '../types';

export const processData = (length: number, fields: FieldBuffer[]) => {
  const keys = [...new Set(fields[1].values.buffer)] as Array<string>;

  const convertedData: DayObj[] = [
    { date: 'Mon' },
    { date: 'Tue' },
    { date: 'Wed' },
    { date: 'Thu' },
    { date: 'Fri' },
    { date: 'Sat' },
    { date: 'Sun' },
  ];

  for (let i = 0; i < length; i++) {
    const dayObj = convertedData.find(element => element.date === fields[0].values.buffer[i]);
    dayObj && (dayObj[fields[1].values.buffer[i]] = fields[2].values.buffer[i]);
  }
  return { data: convertedData, keys };
};
