import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../index.css";
const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const changeHandler = (e) => {
    handleChange(e.target.value);
  };

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const results = data.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
        console.log(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="search-bar-container">
      <FaSearch id="search-icon" />
      <input
        type="search"
        placeholder="ex) 밤하늘, 바다, 카페거리 ..."
        className="search-bar"
        value={input}
        onChange={changeHandler}
      />
    </div>
  );
};

export default SearchBar;
