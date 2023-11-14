import "../../index.css";
import SearchResult from "./SearchResult";
const SearchResultsList = ({ results }) => {
  return (
    <div className="search-results-list">
      {results.map((result, id) => {
        return <SearchResult result={result} key={id} />;
      })}
    </div>
  );
};

export default SearchResultsList;
