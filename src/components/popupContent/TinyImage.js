import Image from "next/image";

export default function Stats({ imageSrc }) {
  return <Image src={imageSrc} alt="" width={10} height={10} />;
}
