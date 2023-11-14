import "../index.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
const Greeting = () => {
  const words = [
    "밤바다",
    "가족 여행",
    "카페 투어",
    "별 보러 가자",
    "맛집 뿌수기",
  ];
  const [text] = useTypewriter({
    words,
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 150,
  });
  return (
    <div id="search" className="search-page">
      <div className="greeting">
        <p style={{ margin: "50px" }}>
          키워드로 떠나는 여행
          <h3 style={{ fontWeight: "bold", color: "#010718" }}>{text}</h3>
          <span>
            <Cursor cursorStyle="|" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default Greeting;
