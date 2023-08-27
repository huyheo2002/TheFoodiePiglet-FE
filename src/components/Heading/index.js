import clsx from "clsx";
import { Link } from "react-router-dom";

function Heading({
  children,
  to,
  href,
  onClick,
  iconLeft,
  iconRight,
  variant,
  line,
}) {
  let Comp = "a";
  let pointer = false;
  const props = {
    onClick,
  };

  if (to) {
    props.to = to;
    Comp = Link;
    pointer = true;
  } else if (href) {
    props.href = href;
    Comp = "a";
    pointer = true;
  }

  const classes = clsx(
    "mx-3 my-4 uppercase select-none group text-primary flex justify-center w-full relative overflow-hidden",
    {
      "cursor-pointer": pointer,
      "!mx-0": variant === "modal",
      "!my-14": line,
    }
  );

  const classesTitle = clsx(
    "text-[2rem] font-semibold px-4 text-primary-hover relative inline-flex items-center justify-center gap-3",
    {
      "!capitalize font-semibold px-0 !text-2xl": variant === "modal",
      "after:bg-primary-hover after:contents-[''] after:w-[325px] after:h-[2px] after:absolute after:z-10 after:top-1/2 after:right-full": line,
      "before:bg-primary-hover before:contents-[''] before:w-[325px] before:h-[2px] before:absolute before:z-10 before:top-1/2 before:left-full": line,
    }
  );

  return (
    <Comp className={classes} {...props}>
      <span className={classesTitle}>
        {iconLeft && iconLeft}
        {children}
        {iconRight && iconRight}
      </span>
      {/* <p className="after:right-full"></p> */}
    </Comp>
  );
}

export default Heading;
