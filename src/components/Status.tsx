export const Status = ({ char }) => {
  return (
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
  );
};
