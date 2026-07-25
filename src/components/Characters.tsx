import { useCallback, useEffect, useState } from "react";
import type { ICharacters } from "../ts/typization";
import { defaultSettingAxios } from "../api/defaultSettingAxios";
import { getError } from "../utils/axiosError";
import Pagination from "./Pagination";

export default function Characters() {
  const [characters, setCharacters] = useState<ICharacters[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCharacters] = useState<number>(826);
  const [countCharacterPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const allPagesInPaginated = Math.ceil(totalCharacters / countCharacterPage);

  const allPageInPaginatedArr = [];
  for (let i = 1; i <= allPagesInPaginated; i++) {
    allPageInPaginatedArr.push(i);
  }

  const getCharacters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await defaultSettingAxios.get(
        `/character?page=${currentPage}`,
      );
      setCharacters(response.data.results);
    } catch (error) {
      setError(getError(error));
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Pagination
        allPageInPaginatedArr={allPageInPaginatedArr}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 max-w-7xl mx-auto">
        {characters.map((char) => (
          <li
            key={char.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-10"
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h1 className="text-lg font-bold text-gray-800 truncate">
                Имя:{" "}
                <span className="font-normal text-gray-600">{char.name}</span>
              </h1>
              <p className="text-sm text-gray-700">
                Пол: <span className="text-gray-600">{char.gender}</span>
              </p>
              <p className="text-sm text-gray-700">
                Статус:{" "}
                <span
                  className={`font-semibold ${
                    char.status === "Alive"
                      ? "text-green-500"
                      : char.status === "Dead"
                        ? "text-red-500"
                        : "text-yellow-500"
                  }`}
                >
                  {char.status}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Особенности:{" "}
                <span className="text-gray-600">{char.species}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
