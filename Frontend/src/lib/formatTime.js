import { format } from 'date-fns';

export const formatTime = (timestamp) => {
  return format(new Date(timestamp), 'p'); // e.g., "3:27 PM"
};