import Image from "next/image";
import nextConfig from "convention/../next.config.mjs";
const basePath = nextConfig.basePath;
//process.env.NODE_ENV

export default function SimpleImage({
  src,
  width,
  height,
  className,
  alt,
  id,
}) {
  src = basePath + src;
  if (!alt) alt = "";

  return (
    <Image
      id={id}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
