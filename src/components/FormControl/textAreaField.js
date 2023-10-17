import clsx from "clsx";
import { useEffect, useState } from "react";

function TextareaField({ ...props }) {
    const {
        label,
        onChange,
        id,
        type,
        value,
        errorMessage,
        onClick,
        hidden,
        onlyRead,
        className,
        clear,
        ...textareaProps
    } = props;
    const [focus, setFocus] = useState(false);    

    const onHandleFocus = (e) => {
        setFocus(true);
    };

    console.log("value input field", value)

    return (
        <div
            className={clsx("w-full py-1 select-none", {
                hidden: hidden,
                [className]: className,
            })}
            onClick={onClick}
        >
            <label
                htmlFor={id}
                className="capitalize block text-base font-medium text-black tracking-wider pb-1"
            >
                {label}
            </label>
            <div className="w-full rounded overflow-hidden relative">
                <textarea
                    className={clsx(
                        "peer w-full h-32 pl-3 py-2 rounded text-base font-light border-2 border-solid border-[#b3b3b3] transition-all duration-300 hover:border-[#1dbfaf] focus:outline-none focus:border-[#1dbfaf] focus:ring-1 focus:ring-[#1dbfaf] focus:invalid:outline-none focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500 placeholder-shown:!border-[#b3b3b3] placeholder-shown:!ring-1 placeholder-shown:!ring-[#b3b3b3] invalid:border-red-500 invalid:text-red-500",
                        {}
                    )}
                    id={id}
                    placeholder={props.placeholder}
                    type={type}
                    onChange={onChange}
                    value={value ?? ""}
                    onBlur={onHandleFocus}
                    focused={focus.toString()}
                    disabled={onlyRead}
                    {...textareaProps}
                />                
                <span className="text-sm text-red-500 hidden peer-placeholder-shown:!hidden peer-invalid:inline-block">
                    {errorMessage}
                </span>
            </div>
        </div>
    );
}

export default TextareaField;
