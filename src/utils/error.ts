import { isAxiosError } from 'axios';
import { toast } from './toast';

export const getErrorMessage = (error: unknown) => {
  const defaultMessage = 'Что-то пошло не так';
  if (isAxiosError(error)) {
    if (error.response?.status === 500) {
      return 'Серверная ошибка';
    }
    return error.response?.data.message as string | string[] || defaultMessage;
  }
  return defaultMessage;
};

export const toastErrorMessage = (error: unknown) => {
  const message = getErrorMessage(error);
  const status = 'error';
  if (Array.isArray(message)) {
    message.forEach((description) => {
      toast({ description, status });
    });
    return;
  }
  toast({ description: message, status });
};
