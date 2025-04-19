import { toast } from 'react-toastify';
import axios from 'axios';

interface ErrorMessage {
  title?: string;
  message: string;
}

const translations = {
  default: 'Something went wrong. Please try again later.',
  establish_connection: 'Could not establish connection.',
  invalid_credentials: { title: 'Unauthorized', message: 'Invalid credentials' },
  throttle: { title: 'Too Many Requests', message: 'Please try again later.' },
  validation_error: { title: 'Validation Error', message: 'Please check your input.' },
  internal_server: { title: 'Server Error', message: 'Please try again later.' },
  invalid_request: { title: 'Bad Request', message: 'Invalid request sent.' },
};

const statusErrorMap: Record<number, ErrorMessage> = {
  401: translations.invalid_credentials,
  429: translations.throttle,
  422: translations.validation_error,
  500: translations.internal_server,
  400: translations.invalid_request,
};

export default function handleError(error: unknown) {
  let title = '';
  let message = translations.default;

  if (!error) {
    message = translations.establish_connection;
  } else if (axios.isAxiosError(error)) {
    const response = error.response;

    if (!response) {
      message = translations.establish_connection;
    } else if (response.status === 422 && response.data?.errors) {
      const firstError = Object.values(response.data.errors)[0] as string[];
      title = translations.validation_error.title!;
      message = firstError[0];
    } else if (statusErrorMap[response.status]) {
      const errorMsg = statusErrorMap[response.status];
      title = errorMsg.title ?? '';
      message = errorMsg.message;
    } else if (response.data?.message) {
      message = response.data.message;
    }
  } else if (typeof error === 'string') {
    message = error;
  }

  toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true, 
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    ...(title ? { toastId: title } : {}),
  });
};
