import type { IPaginationProps } from "../ts/typization";

export default function Pagination({
  allPageInPaginatedArr,
  setCurrentPage,
  currentPage,
}: IPaginationProps) {
  const totalPage = allPageInPaginatedArr.length;

  function getVisiblePagination(currentPage: number, totalPage: number) {
    const aroundPages: number = 4;
    const pages: (number | string)[] = [];

    if (totalPage <= aroundPages) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
      return pages;
    }
    const halfPagesSee = Math.floor(aroundPages / 2);
    let startPage = currentPage - halfPagesSee;
    let endPage = currentPage + halfPagesSee;

    if (startPage < 1) {
      startPage = 1;
      endPage = aroundPages;
    }

    if (endPage > totalPage) {
      endPage = totalPage;
      startPage = totalPage - aroundPages + 1;
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        pages.push("...");
      }
      pages.push(totalPage);
    }

    return pages;
  }

  function goBack() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function goUp() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  if (totalPage <= 1) return null;

  return (
    <>
      <ul className="w-full mb-5 flex flex-wrap justify-center gap-2 bg-gradient-to-br py-5 from-[#44a08db2] to-[#09363741]">
        <li>
          <button
            onClick={goBack}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-transparent cursor-not-allowed"
                : "bg-blue-300 hover:bg-blue-400"
            } text-white`}
          >
            ← Назад
          </button>
        </li>

        {getVisiblePagination(currentPage, totalPage).map((page, index) => {
          if (page === "...") {
            return (
              <li key={`dots-${index}`} className="px-2 text-white font-bold">
                ...
              </li>
            );
          }

          const isActive = page === currentPage;

          return (
            <li
              key={page}
              onClick={() => setCurrentPage(page as number)}
              className={`px-3 py-1 cursor-pointer transition min-w-9 text-center ${
                isActive
                  ? "bg-blue-700 text-white font-bold"
                  : "bg-blue-300 text-white hover:bg-blue-400"
              }`}
            >
              {page}
            </li>
          );
        })}

        <li>
          <button
            onClick={goUp}
            disabled={currentPage === totalPage}
            className={`px-3 py-1 rounded ${
              currentPage === totalPage
                ? "bg-transparent cursor-not-allowed"
                : "bg-transparent hover:bg-blue-400 cursor-pointer"
            } text-white`}
          >
            Вперед →
          </button>
        </li>
      </ul>
    </>
  );
}
