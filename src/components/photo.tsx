import type { CSSProperties, Ref } from "react";
import type { StagePhoto } from "@/lib/photos";

export function StageImage({
  photo,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  priority = false,
  fetchPriority,
  imgRef,
  style,
}: {
  photo: StagePhoto;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  imgRef?: Ref<HTMLImageElement>;
  style?: CSSProperties;
}) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={photo.avif} sizes={sizes} />
      <source type="image/webp" srcSet={photo.webp} sizes={sizes} />
      <img
        ref={imgRef}
        src={photo.src}
        alt={alt}
        width={photo.width}
        height={photo.height}
        srcSet={photo.webp}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(fetchPriority ? { fetchPriority } : {})}
        style={style}
        className={imgClassName}
      />
    </picture>
  );
}
