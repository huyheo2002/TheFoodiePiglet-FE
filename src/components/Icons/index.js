import clsx from "clsx";
// import { IconContext } from "react-icons";
import { AiFillBell, AiOutlineDown } from "react-icons/ai";
import { FaAngleRight, FaAngleLeft, FaUserAlt } from "react-icons/fa";
import { ImEarth } from "react-icons/im";

export const BellIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiFillBell className={clsx(("w-6 h-6", className))} {...props} />;
};

export const LineDownIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiOutlineDown className={clsx(("w-6 h-6", className))} {...props} />;
};

export const NextIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaAngleRight className={clsx(("w-6 h-6", className))} {...props} />;
};

export const PrevIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaAngleLeft className={clsx(("w-6 h-6", className))} {...props} />;
};

export const EarthIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <ImEarth className={clsx(("w-6 h-6", className))} {...props} />;
};

export const UserIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaUserAlt className={clsx(("w-6 h-6", className))} {...props} />;
};
