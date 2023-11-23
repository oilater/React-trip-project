import { Link } from "react-scroll";

const GoSearchBtn = ({ name, to }) => {
  return (
    <Link to={to} spy={true} smooth={true} offset={0} duration={1400} className="go-search-btn">
      {name}
    </Link>
  );
};

export default GoSearchBtn;
