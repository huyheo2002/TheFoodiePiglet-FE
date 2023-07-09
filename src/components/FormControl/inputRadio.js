function InputRadio({ ...props }) {
  const { options, label, checked, onChange, disable, ...inputProps } = props;

  
  return (
    <div className="custom-radio-container">
      <label className="capitalize block text-base font-medium text-black tracking-wider pb-1">
        {label}
      </label>
      {options.map((option, index) => {        
        return (
          <div className="flex items-center" key={index}>          
            <input
              type="radio"
              value={option.value}            
              className="mr-4 block cursor-pointer"
              onChange={() => onChange(option.value)}                         
              checked={disable && option.value == checked}   
              disabled={disable}
              {...inputProps}            
            />
            <label
              className="capitalize text-sm font-medium text-black tracking-wider pb-1"
            >
              {option.label}
            </label>
          </div>
        )
      })}
    </div>
  );
}

export default InputRadio;
