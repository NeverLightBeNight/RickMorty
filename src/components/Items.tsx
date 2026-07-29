import { Gender } from "./Gender";
import { Img } from "./Img";
import { NameCharacter } from "./NameCharacter";
import { Species } from "./Species";
import { Status } from "./Status";

export const Items = ({ char }) => {
  return (
    <li
      key={char.id}
      className="bg-transparent shadow-white/20 relative rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-10 "
    >
      <Img char={char} />
      <div className="p-4 space-y-2">
        <NameCharacter char={char} />
        <Gender char={char} />
        <Status char={char} />
        <Species char={char} />
      </div>
    </li>
  );
};
