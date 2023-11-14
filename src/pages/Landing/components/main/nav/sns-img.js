export default function SnsLink(props) {
  return (
    <li>
      <img role="button" src={props.url} alt={props.alt}></img>
    </li>
  );
}
