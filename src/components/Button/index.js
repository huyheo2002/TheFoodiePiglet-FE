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
    "bg-transparent px-3 py-2 rounded-lg border-2 border-solid border-transparent my-1 mx-2 cursor-pointer inline-flex justify-center items-center transition-all duration-300 select-none whitespace-nowrap text-ellipsis overflow-hidden",
    {
      "bg-gradient-to-b from-[#F7971E] to-[#FFD200] border-[#F7971E] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#FFD200]": variant === "primary",
      "bg-gradient-to-b from-[#58372b] to-[#8e6c60] border-[#58372b] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#8e6c60]": variant === "viewMore",
      "bg-gradient-to-b from-[#EF4765] to-[#FF9A5A] border-[#EF4765] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#FF9A5A]": variant === "baseOrange"      
    }
  );

  const classesChild = clsx("text-sm font-normal text-black tracking-wider", {
    "text-white": variant === "primary",
    "text-white font-bold text-sm": variant === "viewMore",
    "text-white font-bold text-sm": variant === "baseOrange"
  })

  return (
    <Comp className={classes} {...props}>
      {iconLeft && <span className={classesChild}>{iconLeft}</span>}
      <span className={clsx("px-1", classesChild)}>{children}</span>
      {iconRight && <span className={classesChild}>{iconRight}</span>}
    </Comp>
  );
}

export default Button;
