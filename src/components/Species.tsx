export const Species = ({ char }) => {
  return (
    <p className="text-sm text-white w-full flex gap-2 justify-center items-center">
      Особенности:
      <span className="text-white/50">{char.species}</span>
    </p>
  );
};
