import SimpleImage from "convention/components/generalComponents/SimpleImage";
import "convention/app/css/nav.css";

export default function NavLink({ name, href, iconSrc, currentPage }) {
  return (
    <a className={currentPage ? "navLink currentPage" : "navLink"} href={href}>
      <SimpleImage src={iconSrc} width={20} height={20} />
      <span>{name}</span>
    </a>
  );
}
