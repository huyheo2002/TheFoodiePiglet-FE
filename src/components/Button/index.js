import clsx from "clsx";
import { Link } from "react-router-dom";

function Button({ to, href, children, onClick, iconLeft, iconRight, primary }) {
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
    "bg-transparent px-3 py-2 rounded-lg border-2 border-solid border-transparent my-1 mx-2 cursor-pointer inline-flex justify-center items-center transition-all duration-300 select-none",
    {
      "bg-gradient-to-b from-[#F7971E] to-[#FFD200] border-[#F7971E] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#FFD200]": primary,      
    }
  );

  const classesChild = clsx("text-base font-normal text-black tracking-wider", {
    "text-white": primary
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
