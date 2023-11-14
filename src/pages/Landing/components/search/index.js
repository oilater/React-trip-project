import { useState, useEffect } from "react";
import Greeting from "./main/intro-greeting";
import SelectByUser from "./main/user-select";

const Search = () => {
  const [showSelectRegion, setSelectRegion] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      console.log(window.scrollY);
      if (window.scrollY > 1940) {
        setTimeout(() => {
          setSelectRegion(true);
        }, 1500);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      {/* <SelectByUser /> */}
      {!showSelectRegion ? <Greeting /> : <SelectByUser />};
    </>
  );
};

export default Search;
