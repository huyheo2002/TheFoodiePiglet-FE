import clsx from "clsx";
import { useEffect, useState } from "react";

function DatePicker({ ...props }) {
    const {
        label,
        onChange,
        id,
        type,
        value,
        errorMessage,
        onlyRead,
        onClick,
        hidden,
        minDate,
        className,
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

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        if (minDate && new Date(selectedDate) < new Date(minDate)) {
            alert("Vui lòng chọn ngày hợp lệ")
            return;
        }

        setValueInp(selectedDate);
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div
            className={clsx("w-full py-1 select-none", {
                "pointer-events-none": onlyRead,
                "!hidden": hidden,
                [className]: className
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
                <input
                    className={clsx(
                        "peer w-full h-12 pl-3 py-2 rounded text-base font-light border-2 border-solid border-[#b3b3b3] transition-all duration-300 hover:border-[#1dbfaf] focus:outline-none focus:border-[#1dbfaf] focus:ring-1 focus:ring-[#1dbfaf] focus:invalid:outline-none focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500 placeholder-shown:!border-[#b3b3b3] placeholder-shown:!ring-1 placeholder-shown:!ring-[#b3b3b3] invalid:border-red-500 invalid:text-red-500",
                        {
                            "pr-3": type === "date" || type === "time",
                        }
                    )}
                    id={id}
                    placeholder={props.placeholder}
                    onChange={handleDateChange}
                    type={typeInp || type}
                    value={valueInp}
                    onBlur={onHandleFocus}
                    focused={focus.toString()}
                    disable={onlyRead}
                    {...inputProps}
                />

                <span className="text-sm text-red-500 hidden peer-placeholder-shown:!hidden peer-invalid:inline-block">
                    {errorMessage}
                </span>
            </div>
        </div>
    );
}

export default DatePicker;
