import clsx from "clsx";
import { useEffect, useState } from "react";
import { CloseCircleIcon, EyeClosedIcon, EyeOpenIcon } from "../Icons";

function InputField({ ...props }) {
  const {
    label,
    onChange,
    id,
    type,
    value,
    errorMessage,
    onlyRead,
    ...inputProps
  } = props;
  const [focus, setFocus] = useState(false);
  const [typeInp, setTypeInp] = useState(type);
  const [valueInp, setValueInp] = useState(value);

  useEffect(() => {
    setValueInp(value);
  }, [value]);

  const onHandleFocus = (e) => {
    setFocus(true);
  };

  return (
    <div
      className={clsx("w-full py-1 select-none", {
        "pointer-events-none": onlyRead,
      })}
    >
      <label
        htmlFor={id}
        className="block text-base font-medium text-black tracking-wider pb-1"
      >
        {label}
      </label>
      <div className="w-full rounded overflow-hidden relative">
        <input
          className="peer w-full h-12 pl-3 pr-14 py-2 rounded text-base font-light border-2 border-solid border-[#b3b3b3] transition-all duration-300
            hover:border-[#1dbfaf]
            focus:outline-none focus:border-[#1dbfaf] focus:ring-1 focus:ring-[#1dbfaf]
            focus:invalid:outline-none focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500
            placeholder-shown:!border-[#b3b3b3] placeholder-shown:!ring-1 placeholder-shown:!ring-[#b3b3b3]            
            invalid:border-red-500 invalid:text-red-500                          
        "
          id={id}
          placeholder={props.placeholder}
          onChange={onChange}
          type={typeInp || type}
          value={valueInp}
          onBlur={onHandleFocus}
          focused={focus.toString()}
          disable={onlyRead}
          {...inputProps}
        />

        <div className="absolute h-12 right-2 top-0 flex items-center">
          {valueInp && (
            <CloseCircleIcon
              className="mr-2 cursor-pointer text-gray-400 text-xl hover:text-sky-400 transition-all"
              onClick={() => setValueInp("")}
            />
          )}

          {/* password */}
          {typeInp === "password" && props.name === "password" ? (
            <EyeClosedIcon
              className="cursor-pointer text-gray-400 text-xl hover:text-sky-400 transition-all"
              onClick={() => setTypeInp("text")}
            />
          ) : typeInp !== "password" && props.name === "password" ? (
            <EyeOpenIcon
              className="cursor-pointer text-gray-400 text-xl hover:text-sky-400 transition-all"
              onClick={() => setTypeInp("password")}
            />
          ) : (
            ""
          )}
        </div>
        <span className="text-sm text-red-500 invisible peer-placeholder-shown:!invisible peer-invalid:visible">
          {errorMessage}
        </span>
      </div>
    </div>
  );
}

export default InputField;