export const NameCharacter = ({ char }) => {
  return (
    <h1 className="text-lg font-bold text-gray-800 truncate justify-center items-center flex gap-5">
      Имя:
      <span className="font-normal text-white">{char.name}</span>
    </h1>
  );
};
