import Image from "next/image";

export default function Stat({ imageSrc, title, value }) {
  if (value == 0) return;

  return (
    <div className="stat">
      <span>{title}</span>
      <div>
        <Image src={imageSrc} alt={title} width={20} height={20} />
        <span>{value}</span>
      </div>
    </div>
  );
}
