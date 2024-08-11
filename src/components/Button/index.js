import clsx from "clsx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { TBUTTON_SIZE, TBUTTON_VARIANT } from "../../types/button";

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  variant: PropTypes.oneOf(Object.values(TBUTTON_VARIANT)),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(TBUTTON_SIZE)),
};

function Button({
  to,
  href,
  children,
  onClick,
  iconLeft,
  iconRight,
  variant,
  disabled = false,
  size,
}) {
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
    "px-3 py-2 rounded-lg border-2 border-solid border-transparent my-1 mx-2 cursor-pointer inline-flex justify-center items-center transition-all duration-300 select-none whitespace-nowrap text-ellipsis overflow-hidden text-sm font-bold tracking-wider text-white",
    {
      "bg-gradient-to-b from-[#cf4764] to-[#f4a7ba] border-[#cf4764] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#f4a7ba]":
        variant === TBUTTON_VARIANT.PRIMARY,
      "bg-gradient-to-b from-[#58372b] to-[#8e6c60] border-[#58372b] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#8e6c60]":
        variant === TBUTTON_VARIANT.VIEW_MORE,
      "bg-gradient-to-b from-[#EF4765] to-[#FF9A5A] border-[#EF4765] shadow-black-b-0.75 hover:-translate-y-1 hover:shadow-[#FF9A5A]":
        variant === TBUTTON_VARIANT.BASE_ORANGE,
      "bg-red-500 shadow-black-b-0.75 hover:-translate-y-1 hover:bg-red-600 hover:shadow-black-b-0.35":
        variant === TBUTTON_VARIANT.DELETE,
      "bg-green-500 shadow-black-b-0.75 hover:-translate-y-1 hover:bg-green-600 hover:shadow-black-b-0.35":
        variant === TBUTTON_VARIANT.SUCCESS,
      "bg-[#1E5631] shadow-black-b-0.75 hover:-translate-y-1 hover:bg-[#16794E] hover:shadow-black-b-0.35":
        variant === TBUTTON_VARIANT.EXCEL,
      "!cursor-not-allowed bg-[#b3b3b3] shadow-black-b-0.75 hover:-translate-y-1 hover:bg-[#414141] hover:shadow-black-b-0.35":
        disabled,
      "w-full": size === TBUTTON_SIZE.LARGE,
      "w-1/2": size === TBUTTON_SIZE.MEDIUM,
      "w-fit": size === TBUTTON_SIZE.SMALL,

    }
  );

  return (
    <Comp className={classes} {...props}>
      {iconLeft && iconLeft}
      {children}
      {iconRight && iconRight}
    </Comp>
  );
}

export default Button;
