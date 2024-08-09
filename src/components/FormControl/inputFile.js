import clsx from "clsx";
import { Fragment, useState } from "react";
import Image from "../Image";

function InputFile({ ...props }) {
  const {
    label,
    onChange,
    id,
    errorMessage,
    imagePreview,
    onlyRead,
    dataCombobox,
    ...inputProps
  } = props;
  const [focus, setFocus] = useState(false);

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
        className="capitalize block text-base font-medium text-black tracking-wider pb-1"
      >
        {label}
      </label>
      <label
        htmlFor={id}
        className={clsx(
          "bg-[#00b4d7] inline-block px-5 py-3 uppercase text-base font-medium text-white cursor-pointer rounded-xl shadow-black-b-0.35 transition-all"
        )}
      >
        Choose a image
      </label>

      {!onlyRead ? (
        <Fragment>
          <input
            id={id}
            placeholder={inputProps.placeholder}
            onChange={onChange}
            onBlur={onHandleFocus}
            focused={focus.toString()}
            hidden
            {...inputProps}
          />
          <div className={clsx("w-1/2 h-fit my-3")}>
            <Image
              alt={imagePreview ?? ""}
              src={
                imagePreview ??
                "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"
              }
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className={clsx("w-1/2 h-fit my-3")}>
            <Image
              alt={imagePreview ?? ""}
              src={
                imagePreview ??
                "https://us.123rf.com/450wm/urfandadashov/urfandadashov1809/urfandadashov180901275/109135379-photo-not-available-vector-icon-isolated-on-transparent-background-photo-not-available-logo-concept.jpg?ver=6"
              }
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default InputFile;
