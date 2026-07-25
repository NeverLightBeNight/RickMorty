import axios from "axios";

export const getError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.log(
      `Status text: ${error.response?.statusText ? console.log(error.response?.statusText) : "Ничего нету"}, Status: ${error.response?.status}`,
    );
  } else if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("Неизвестная ошибка:", error);
  }
};
