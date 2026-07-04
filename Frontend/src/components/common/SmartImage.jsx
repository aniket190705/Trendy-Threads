import Image from "next/image";

export default function SmartImage({
  src,
  alt,
  className,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
}) {
  return (
    <Image
      alt={alt || ""}
      src={src}
      className={className}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      priority={priority}
    />
  );
}
