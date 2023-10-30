import clsx from "clsx";
import { Link } from "react-router-dom";

function Button({ to, href, children, onClick, iconLeft, iconRight, variant }) {
  let Comp = "button";
  const props = {
    onClick,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = clsx(
    "px-3 py-2 rounded-lg border-2 border-solid border-transparent my-1 mx-2 cursor-pointer inline-flex justify-center items-center transition-all duration-300 select-none whitespace-nowrap text-ellipsis overflow-hidden",
    {
      "bg-gradient-to-b from-[#cf4764] to-[#f4a7ba] border-[#cf4764] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#f4a7ba]": variant === "primary",
      "bg-gradient-to-b from-[#58372b] to-[#8e6c60] border-[#58372b] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#8e6c60]": variant === "viewMore",
      "bg-gradient-to-b from-[#EF4765] to-[#FF9A5A] border-[#EF4765] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#FF9A5A]": variant === "baseOrange",
      "bg-red-500 shadow-black-b-0.75 hover:-translate-y-1 hover:bg-red-600 hover:shadow-black-b-0.35": variant === "delete",
      "bg-green-500 shadow-black-b-0.75 hover:-translate-y-1 hover:bg-green-600 hover:shadow-black-b-0.35": variant === "success",
      "bg-[#1E5631] shadow-black-b-0.75 hover:-translate-y-1 hover:bg-[#16794E] hover:shadow-black-b-0.35": variant === "excel", 
    }
  );

  const classesChild = clsx("text-sm font-normal tracking-wider text-white", {
    "text-white": variant === "primary",
    "text-white font-bold text-sm": variant === "viewMore",
    "text-white font-bold text-sm": variant === "baseOrange",
    "text-white font-bold text-sm": variant === "delete",
    "text-white font-bold text-sm": variant === "success",
    "text-white font-bold text-sm": variant === "excel",
  })

  return (
    <Comp className={classes} {...props}>
      {iconLeft && <span className={classesChild}>{iconLeft}</span>}
      {children && <span className={clsx("px-1 text-white", classesChild)}>{children}</span>}
      {iconRight && <span className={classesChild}>{iconRight}</span>}
    </Comp>
  );
}

export default Button;
