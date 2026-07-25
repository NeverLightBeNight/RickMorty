import { useCallback, useEffect, useState } from "react";
import type { ICharacters } from "../ts/typization";
import { defaultSettingAxios } from "../api/defaultSettingAxios";
import { getError } from "../utils/axiosError";

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

  const getCharacters = useCallback( async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await defaultSettingAxios.get(
        `/character?page=${currentPage}`,
      );
      setCharacters(response.data.results);
    } catch (e) {
      const errorMessage = getError(e);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage])

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <>
      <ul className="w-full mb-5 flex flex-wrap justify-center gap-5 bg-blue-500 py-4">
        {allPageInPaginatedArr.map((page) => (
          <li
            onClick={() => setCurrentPage(page)}
            className={`px-2 py-1 text-white cursor-pointer transition ${
              currentPage === page
                ? "bg-blue-700 font-bold"
                : "bg-blue-300 hover:bg-blue-400"
            }`}
            key={page}
          >
            {page}
          </li>
        ))}
      </ul>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            <img src={char.image} alt={char.name} />
            <div>
              <h1>
                Имя: <span>{char.name}</span>
              </h1>
              <p>
                Пол: <span>{char.gender}</span>
              </p>
              <p>
                Статус: <span>{char.status}</span>
              </p>
              <p>
                Особенности: <span>{char.species}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
