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
  const [value, setValue] = useState<string>("");

  const getValueChange = (e) => setValue(e.target.value);

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

  const filteredCharacters = characters.filter((char) =>
    char.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
  );

  return (
    <>
      <Pagination
        allPageInPaginatedArr={allPageInPaginatedArr}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <div className="w-full flex justify-center mb-3 ">
        <input
          onChange={getValueChange}
          type="text"
          placeholder="Search character..."
          className="outline-none rounded-2xl shadow-md shadow-white/20 px-3 py-2 text-2xl tracking-1.25 bg-transparent placeholder:text-white/50 text-white/50"
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 p-6 max-w-7xl mx-auto ">
        {filteredCharacters.map((char) => (
          <li
            key={char.id}
            className="bg-transparent shadow-white/20 relative rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-10 "
          >
            <img
              src={char.image}
              alt={char.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h1 className="text-lg font-bold text-gray-800 truncate justify-center items-center flex gap-5">
                Имя:
                <span className="font-normal text-white">{char.name}</span>
              </h1>
              <p className="text-sm text-white justify-center items-center flex gap-5">
                Пол: <span className="text-white/50">{char.gender}</span>
              </p>
              <p className="text-sm text-white flex justify-center items-center gap-5">
                Статус:
                <span
                  className={`font-semibold ${
                    char.status === "Alive"
                      ? "text-green-500"
                      : char.status === "Dead"
                        ? "text-red-500"
                        : "text-yellow-500"
                  } `}
                >
                  {char.status}
                </span>
              </p>
              <p className="text-sm text-white w-full flex gap-2 justify-center items-center">
                Особенности:
                <span className="text-white/50">{char.species}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
      {filteredCharacters.length === 0 && (
        <p className="text-center text-white font-bold text-2xl">
          Персонажи не найдены
        </p>
      )}
    </>
  );
}
