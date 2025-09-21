import Image from "next/image";
import "convention/app/css/nav.css";

export default function NavLink({
  name,
  href,
  iconSrc
}) {
  return (
    <a class="navLink" href={href}>
      <Image src={iconSrc} alt="" width={30} height={30} />
      <span>{name}</span>
    </a>
  );
}
