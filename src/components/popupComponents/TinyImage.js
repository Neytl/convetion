import SimpleImage from "convention/components/generalComponents/SimpleImage";

export default function Stats({ imageSrc }) {
  return <SimpleImage src={"/images/" + imageSrc} width={15} height={15} />;
}
