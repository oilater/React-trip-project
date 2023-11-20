import "./index.css";
import Main from "./components/main/home";
import SubPage from "./components/sub";
import Search from "./components/search";
const Landing = () => {
  return (
    <div>
      <Main />
      <SubPage />
      <Search />
    </div>
  );
};

export default Landing;
