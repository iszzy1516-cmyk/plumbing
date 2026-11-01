import Image from "next/image";

type RevealImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

// The frame sets the shape, so nothing shifts while the picture settles. See .reveal-zoom in globals.css.
export function RevealImage({ src, alt, sizes, className, priority }: RevealImageProps) {
  return (
    <div className={`card reveal-zoom relative ${className ?? ""}`}>
      <div className="reveal-zoom__picture absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={priority}
          fetchPriority={priority ? "high" : undefined}
          className="object-cover"
        />
      </div>
    </div>
  );
}
