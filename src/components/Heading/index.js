import clsx from "clsx";
import { Link } from "react-router-dom";

function Heading({ children, to, href, onClick, iconLeft, iconRight }) {
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

  const classes = clsx("mx-3 my-2 inline-flex uppercase select-none group items-center", {
    "cursor-pointer": pointer,
  });

  const classesTitle = clsx("text-black text-[1.5rem] font-normal px-2", {});

  return (
    <Comp className={classes} {...props}>
      {iconLeft && iconLeft}
      <span className={classesTitle}>{children}</span>
      {iconRight && iconRight}
    </Comp>
  );
}

export default Heading;
