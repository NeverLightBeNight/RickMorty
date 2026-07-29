export const Input = ({getValueChange}) => {
  return (
    <input
      onChange={getValueChange}
      type="text"
      placeholder="Search character..."
      className="outline-none rounded-2xl shadow-md shadow-white/20 px-3 py-2 text-2xl tracking-1.25 bg-transparent placeholder:text-white/50 text-white/50"
    />
  );
};
