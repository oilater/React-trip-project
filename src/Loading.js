import { Background } from "./Styles";
import Spinner from "./assets/gif/Spin-1s-200px.gif";
const Loading = () => {
  return (
    <Background>
      <img src={Spinner} alt="로딩 이미지" width="2.5%" />
    </Background>
  );
};

export default Loading;
