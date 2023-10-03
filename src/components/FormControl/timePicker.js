import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";

function TimePicker({ ...props }) {
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
        className,
        onValueInpChange,
        listOptions,
        ...inputProps
    } = props;
    const [focus, setFocus] = useState(false);
    const [valueInp, setValueInp] = useState(value);
    const [toggleDropdown, setToggleDropdown] = useState(false);    

    // const timeSlots = useMemo(() => {
    //     const startTime = 8 * 60; // 8:00 AM tính bằng phút
    //     const endTime = 21 * 60;  // 9:00 PM tính bằng phút        
    //     const interval = 30;      // Độ lệch thời gian giữa các khoảng tính bằng phút

    //     const slots = [];
    //     for (let minutes = startTime; minutes <= endTime; minutes += interval) {
    //         const hours = Math.floor(minutes / 60);
    //         const minutesPart = minutes % 60;
    //         const formattedTime = `${hours.toString().padStart(2, '0')}:${minutesPart.toString().padStart(2, '0')}`;
    //         slots.push(formattedTime);
    //     }

    //     return slots;
    // }, []);

    const onHandleFocus = (e) => {
        setFocus(true);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setToggleDropdown(false);
        };

        // Đăng ký sự kiện click
        document.addEventListener("click", handleClickOutside);

        // Hủy đăng ký sự kiện khi component bị unmount
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [toggleDropdown]);

    useEffect(() => {
        setValueInp(value);
        onValueInpChange(value);
    }, [value]);


    return (
        <div
            className={clsx("w-full py-1 select-none", {
                "pointer-events-none": onlyRead,
                "!hidden": hidden,
                [className]: className
            })}
            onClick={() => setToggleDropdown(false)}
        >
            <label
                htmlFor={id}
                className="capitalize block text-base font-medium text-black tracking-wider pb-1"
            >
                {label}
            </label>
            <div className="w-full rounded relative">
                <input
                    className={clsx(
                        "peer w-full h-12 pl-3 py-2 rounded text-base font-light border-2 border-solid border-[#b3b3b3] transition-all duration-300 hover:border-[#1dbfaf] focus:outline-none focus:border-[#1dbfaf] focus:ring-1 focus:ring-[#1dbfaf] focus:invalid:outline-none focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500 placeholder-shown:!border-[#b3b3b3] placeholder-shown:!ring-1 placeholder-shown:!ring-[#b3b3b3] invalid:border-red-500 invalid:text-red-500 cursor-pointer",
                        {
                            "pr-3": type === "date" || type === "time",
                        }
                    )}
                    id={id}
                    placeholder={props.placeholder}
                    onChange={() => { }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setToggleDropdown(!toggleDropdown);
                    }}
                    type={"text"}
                    value={valueInp}
                    onBlur={onHandleFocus}
                    focused={focus.toString()}
                    disable={onlyRead}
                    {...inputProps}
                />

                {/* dropdown */}
                {toggleDropdown &&
                    <ul className="absolute z-[9999999] top-12 left-0 list-none w-1/2 bg-white max-h-80 overflow-y-scroll shadow-black-b-0.35 rounded-lg cursor-pointer select-none scrollbar">
                        {listOptions && listOptions.map((item, index) => {
                            return <li className={clsx("flex items-center px-6 py-4 hover:text-[#548be6] hover:bg-[#e6f2fe] transition-all duration-300")}
                                key={index}
                                onClick={() => {                                    
                                    setValueInp(item);
                                    onValueInpChange(item)
                                }}
                            >{item}</li>
                        })}
                    </ul>
                }

                <span className="text-sm text-red-500 hidden peer-placeholder-shown:!hidden peer-invalid:inline-block">
                    {errorMessage}
                </span>
            </div>
        </div>
    );
}

export default TimePicker;
