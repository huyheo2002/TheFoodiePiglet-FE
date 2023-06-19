import clsx from "clsx";
// import { IconContext } from "react-icons";
import { AiFillBell, AiOutlineDown, AiFillHeart } from "react-icons/ai";
import { FaAngleRight, FaAngleLeft, FaUserAlt } from "react-icons/fa";
import { ImEarth } from "react-icons/im";
import { BsStar, BsStarFill, BsStarHalf, BsCurrencyDollar } from "react-icons/bs";
import { GiHotMeal } from "react-icons/gi";

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

export const StarFillIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BsStarFill className={clsx(("w-6 h-6", className))} {...props} />;
};

export const StarHalfIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BsStarHalf className={clsx(("w-6 h-6", className))} {...props} />;
};

export const StarIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BsStar className={clsx(("w-6 h-6", className))} {...props} />;
};

export const DollarIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BsCurrencyDollar className={clsx(("w-6 h-6", className))} {...props} />;
};

export const HeartFillIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiFillHeart className={clsx(("w-6 h-6", className))} {...props} />;
};

export const HotMealIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <GiHotMeal className={clsx(("w-6 h-6", className))} {...props} />;
};
