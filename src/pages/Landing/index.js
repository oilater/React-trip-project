import "./index.css";
import Main from "./components/main/home";
import SubPage from "./components/sub";
import Search from "./components/search";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { loginTokenState } from "../../atoms/login";
import { loginedUserState } from "../../atoms/login";

const Landing = () => {
  const [loginToken, setLoginToken] = useRecoilState(loginTokenState);
  const loginedUser = useRecoilValue(loginedUserState);
  // 새로고침 되어도 로그인 유지
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setLoginToken(storedToken);
  }, [setLoginToken]);

  useEffect(() => {
    console.log(loginedUser);
    console.log(loginToken);
  }, []);

  return (
    <div>
      <Main />
      <SubPage />
      <Search />
    </div>
  );
};

export default Landing;
