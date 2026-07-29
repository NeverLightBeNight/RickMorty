export const Img = ({ char }) => {
  return (
    <img
      src={char.image}
      alt={char.name}
      className="w-full h-48 object-cover"
    />
  );
};
