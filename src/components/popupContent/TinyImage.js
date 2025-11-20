import Image from "next/image";

export default function Stats({ imageSrc }) {
  return <Image src={"/images/" + imageSrc} alt="" width={15} height={15} />;
}
