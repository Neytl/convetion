import Image from "next/image";

export default function Stats({ imageSrc }) {
  return <Image src={imageSrc} alt="" width={15} height={15} />;
}
