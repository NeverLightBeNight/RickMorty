export interface ICharacters {
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    gender: string;
}

export interface IPaginationProps {
    allPageInPaginatedArr: number [];
    setCurrentPage: (page: number) => void;
    currentPage: number;
}

export enum defaultBaseUrl {
    BASE_URL = "https://rickandmortyapi.com/api/"
}

export enum enumStringStatusCode {
  NOT_FOUND = "Не найденно",
  SERVER_ERROR = "Ошибка сервера",
  CODE_STATUS = "StatusCode",
  UNKNOWN_ERROR = "Неизвестная ошибка",
}