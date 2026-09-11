import { cn } from "@/src/utils/cn";
import * as React from "react";

type AvatarProps = {
  alt: string;
  className?: string;
  fallback: string;
  src?: string;
};

function Avatar({ alt, className, fallback, src }: AvatarProps) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const showFallback = !src || imageFailed;

  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold text-muted-foreground",
        className,
      )}
    >
      {showFallback ? (
        <>
          <span aria-hidden="true">{fallback}</span>
          <span className="sr-only">{alt}</span>
        </>
      ) : (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
          onError={() => setImageFailed(true)}
        />
      )}
    </span>
  );
}

export { Avatar };
