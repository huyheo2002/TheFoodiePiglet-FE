import clsx from "clsx";

function InputRadio({ ...props }) {
  const { options, label, checked, onChange, disable, edit, hidden, ...inputProps } =
    props;
    
  return (
    <div className={clsx("custom-radio-container", {
      "!hidden": hidden
    })}>
      <label className="capitalize block text-base font-medium text-black tracking-wider pb-1">
        {label}
      </label>
      {!hidden && options.map((option, index) => {
        let cloneId = Math.floor(Math.random() * 9999);
        // console.log("option.value", option.value)
        return (
          <div className="flex items-center" key={index}>
            <input
              type="radio"
              value={option.value}
              className="mr-4 block cursor-pointer"
              onChange={() => onChange(option.value)}
              checked={disable && option.value == checked || edit && option.value == checked}
              disabled={disable}
              {...inputProps}
              id={cloneId}
            />
            <label className="capitalize text-sm font-medium text-black tracking-wider pb-1" htmlFor={cloneId}>
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default InputRadio;
