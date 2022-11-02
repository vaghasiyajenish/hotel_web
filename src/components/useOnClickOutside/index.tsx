import { useEffect, useState } from "react";

export const useOutSideScrollClick = (
  ref: React.RefObject<HTMLElement>
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isOutSide, setIsOutSide] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOutSide(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOutSide, ref]);

  return [isOutSide, setIsOutSide];
};

export default useOutSideScrollClick;
