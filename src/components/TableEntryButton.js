import IconSpan from "./IconSpan";

export default function TableEntryButton({
  imageSrc,
  text
}) {
  return (
    <IconSpan imageSrc={imageSrc} text={text} specialClass="tableEntryButton" />
  );
}
