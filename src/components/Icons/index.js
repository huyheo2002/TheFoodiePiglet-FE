import clsx from "clsx";
import {
  AiFillBell,
  AiOutlineDown,
  AiFillHeart,
  AiOutlinePlusCircle,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillCloseCircle,
  AiOutlineLoading3Quarters,
  AiOutlineMessage,
  AiOutlineClose,
  AiOutlinePlus,
  AiOutlineMinus,
  AiTwotoneHome,
  AiFillFileExcel,
  AiFillPhone,
} from "react-icons/ai";
import {
  FaAngleRight,
  FaAngleLeft,
  FaUserAlt,
  FaFacebook,
  FaPencilAlt,
  FaTrash,
  FaBookOpen,
  FaShoppingCart,
  FaTruck,
  FaMoneyBillWave,
  FaUsers,
  FaUserCog,
  FaUserShield,
  FaFileImport,
  FaSpinner,
  FaFacebookMessenger,
  FaCrown,
  FaUserPlus,
  FaUserSlash,
} from "react-icons/fa";
import { ImEarth } from "react-icons/im";
import {
  BsStar,
  BsStarFill,
  BsStarHalf,
  BsCurrencyDollar,
  BsFillArrowDownCircleFill,
  BsFillBox2Fill,
  BsSearch,
  BsFillCameraVideoFill,
  BsSendFill,
  BsFillEmojiWinkFill,
} from "react-icons/bs";
import { GiHotMeal, GiCheckedShield } from "react-icons/gi";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import {
  BiMenuAltLeft,
  BiMenu,
  BiDotsHorizontalRounded,
  BiNews,
} from "react-icons/bi";
import { HiReceiptRefund } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GrContactInfo } from "react-icons/gr";
import { MdDashboard, MdTableRestaurant } from "react-icons/md";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
  TbExchange,
} from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

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

  return (
    <BsCurrencyDollar className={clsx(("w-6 h-6", className))} {...props} />
  );
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

export const PlusIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <AiOutlinePlusCircle className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const FacebookIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaFacebook className={clsx(("w-6 h-6", className))} {...props} />;
};

export const InstagramIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <AiFillInstagram className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const YoutubeIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiFillYoutube className={clsx(("w-6 h-6", className))} {...props} />;
};

export const TwitterIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <AiOutlineTwitter className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const EyeOpenIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <RxEyeOpen className={clsx(("w-6 h-6", className))} {...props} />;
};

export const EyeClosedIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <RxEyeClosed className={clsx(("w-6 h-6", className))} {...props} />;
};

export const CloseCircleIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <AiFillCloseCircle className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const LoadingIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <AiOutlineLoading3Quarters
      className={clsx(("w-6 h-6", className))}
      {...props}
    />
  );
};

export const MessageIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <AiOutlineMessage className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const MemuAltLeftIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BiMenuAltLeft className={clsx(("w-6 h-6", className))} {...props} />;
};

export const MemuIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BiMenu className={clsx(("w-6 h-6", className))} {...props} />;
};

export const CloseOutlineIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiOutlineClose className={clsx(("w-6 h-6", className))} {...props} />;
};

export const TrashIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaTrash className={clsx(("w-6 h-6", className))} {...props} />;
};

export const PencilIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaPencilAlt className={clsx(("w-6 h-6", className))} {...props} />;
};

export const BookOpenIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaBookOpen className={clsx(("w-6 h-6", className))} {...props} />;
};

export const DotHorizontalIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <BiDotsHorizontalRounded
      className={clsx(("w-6 h-6", className))}
      {...props}
    />
  );
};

export const CartIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaShoppingCart className={clsx(("w-6 h-6", className))} {...props} />;
};

export const OutlinePlusIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiOutlinePlus className={clsx(("w-6 h-6", className))} {...props} />;
};

export const OutlineMinusIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiOutlineMinus className={clsx(("w-6 h-6", className))} {...props} />;
};

export const TrunkIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaTruck className={clsx(("w-6 h-6", className))} {...props} />;
};

export const RefundIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <HiReceiptRefund className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const CheckedShieldIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <GiCheckedShield className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const ArrowDownCircleFillIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <BsFillArrowDownCircleFill
      className={clsx(("w-6 h-6", className))}
      {...props}
    />
  );
};

export const TickIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <TiTick className={clsx(("w-6 h-6", className))} {...props} />;
};

export const ContactInfoIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <GrContactInfo className={clsx(("w-6 h-6", className))} {...props} />;
};

export const BoxFillIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BsFillBox2Fill className={clsx(("w-6 h-6", className))} {...props} />;
};

export const DashboardIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <MdDashboard className={clsx(("w-6 h-6", className))} {...props} />;
};

export const MoneyBillWaveIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <FaMoneyBillWave className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const UsersIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaUsers className={clsx(("w-6 h-6", className))} {...props} />;
};

export const UserCogIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaUserCog className={clsx(("w-6 h-6", className))} {...props} />;
};

export const UserShieldIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaUserShield className={clsx(("w-6 h-6", className))} {...props} />;
};

export const NewsIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BiNews className={clsx(("w-6 h-6", className))} {...props} />;
};

export const HomeIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiTwotoneHome className={clsx(("w-6 h-6", className))} {...props} />;
};

export const TableRestaurantIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <MdTableRestaurant className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const DoubleNextIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <TbPlayerTrackNextFilled
      className={clsx(("w-6 h-6", className))}
      {...props}
    />
  );
};

export const DoublePrevIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <TbPlayerTrackPrevFilled
      className={clsx(("w-6 h-6", className))}
      {...props}
    />
  );
};

export const ExcelIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <AiFillFileExcel className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const ImportFileIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaFileImport className={clsx(("w-6 h-6", className))} {...props} />;
};

export const SearchIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BsSearch className={clsx(("w-6 h-6", className))} {...props} />;
};

export const SpinnerIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaSpinner className={clsx(("w-6 h-6", className))} {...props} />;
};

export const PhoneIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <AiFillPhone className={clsx(("w-6 h-6", className))} {...props} />;
};

export const CameraVideoIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <BsFillCameraVideoFill
      className={clsx(("w-6 h-6", className))}
      {...props}
    />
  );
};

export const SendIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <BsSendFill className={clsx(("w-6 h-6", className))} {...props} />;
};

export const EmojiWinkIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <BsFillEmojiWinkFill className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const MessengerIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return (
    <FaFacebookMessenger className={clsx(("w-6 h-6", className))} {...props} />
  );
};

export const CrownIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaCrown className={clsx(("w-6 h-6", className))} {...props} />;
};

export const LogOutIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <IoIosLogOut className={clsx(("w-6 h-6", className))} {...props} />;
};

export const UserPlusIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaUserPlus className={clsx(("w-6 h-6", className))} {...props} />;
};

export const UserSlashIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <FaUserSlash className={clsx(("w-6 h-6", className))} {...props} />;
};

export const ChangeIcon = ({ className, onClick }) => {
  const props = {
    onClick,
  };

  return <TbExchange className={clsx(("w-6 h-6", className))} {...props} />;
};
