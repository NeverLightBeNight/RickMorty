import { useCallback, useEffect, useState } from "react";
import type { ICharacters } from "../ts/typization";
import { defaultSettingAxios } from "../api/defaultSettingAxios";
import { getError } from "../utils/axiosError";
import Pagination from "./Pagination";
import { Input } from "./Input";
import { Items } from "./Items";

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

  const allPageInPaginatedArr: number[] = [];

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
        <Input getValueChange={getValueChange} />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 p-6 max-w-7xl mx-auto">
        {filteredCharacters.map((char) => (
          <Items char={char} />
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
