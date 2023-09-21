import clsx from "clsx";
import { useState } from "react";
import fallbackImage from "../../assets/images/Base/Image_fallback.png";

function Image({
  alt,
  src = "",
  className,
  onClick,
  fallback: customFallback = fallbackImage,
  effectScale,
  ...props
}) {
  const [fallback, setFallBack] = useState("");

  const handleError = () => {
    setFallBack(customFallback);
  };

  return (
    <div className={clsx("group overflow-hidden flex items-center", {
        [className]: className,
        "bg-white": fallback !== ""        
    })}
      onClick={onClick}
    >
      <img
        className={clsx("w-full h-full object-fill", {
            "group-hover:scale-110 transition-all duration-300": effectScale
        })}
        src={fallback || src}
        alt={alt}
        onError={handleError}
        {...props}
      />
    </div>
  );
}

export default Image;
