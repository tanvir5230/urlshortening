import { useState, useEffect } from "react";
const useScreenType = (): string => {
  const [screenType, setScreenType] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      let type = "";

      if (innerWidth < 600) {
        type = "small";
      } else if (innerWidth < 1200) {
        type = "large";
      } else {
        type = "extraLarge";
      }

      setScreenType(type);
    };

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenType;
};

export default useScreenType;
