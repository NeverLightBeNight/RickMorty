import axios from "axios";
import { enumStringStatusCode } from "../ts/typization";

export const getError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    switch (statusCode) {
      case 404:
        console.log(`${enumStringStatusCode.NOT_FOUND}: ${statusCode}`);
        return `${enumStringStatusCode.NOT_FOUND}`;
      case 500:
        console.log(`${enumStringStatusCode.SERVER_ERROR}: ${statusCode}`);
        return `${enumStringStatusCode.SERVER_ERROR}`;
      default:
        console.log(
          `Ошибка ${statusCode}: ${error.response?.data?.message || enumStringStatusCode.UNKNOWN_ERROR}`,
        );
        return error.response?.data?.message;
    }
  } else if (error instanceof Error) {
    console.log(error.message);
    return `${error.message}`;
  }
  console.log(`${enumStringStatusCode.UNKNOWN_ERROR}`);
  return `${enumStringStatusCode.UNKNOWN_ERROR}`;
};
