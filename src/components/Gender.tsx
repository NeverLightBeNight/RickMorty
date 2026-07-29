export const Gender = ({ char }) => {
  return (
    <p className="text-sm text-white justify-center items-center flex gap-5">
      Пол: <span className="text-white/50">{char.gender}</span>
    </p>
  );
};
