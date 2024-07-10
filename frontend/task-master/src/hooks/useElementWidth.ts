import { useEffect, useState } from "react";

export const useElementWidth = (componentRef) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const changeWidth = () => {
      if (!componentRef.current || !open) return;
      setWidth(
        Math.round((componentRef.current as any).getBoundingClientRect().width),
      );
    };

    changeWidth();
    window.addEventListener("resize", changeWidth);
    return window.removeEventListener("resize", changeWidth);
  }, []);

  return width;
};
