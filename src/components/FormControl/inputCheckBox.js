import clsx from "clsx";
import { Fragment } from "react";

function InputCheckbox({ ...props }) {
  const { options, group, label, checked, onChange, disable, edit, hidden, row, listItemSelected, ...inputProps } =
    props;

  console.log("options", options)
  console.log("group", group)

  return (
    <div className={clsx("custom-radio-container", {
      "!hidden": hidden
    })}>
      <label className="capitalize block text-base font-medium text-black tracking-wider">
        {label}
      </label>

      <div className="ml-2">
        {!hidden && group.map((itemGroup) => {
          return (
            <Fragment key={itemGroup.id}>
              {/* name group */}
              <div
                className="text-sm text-black font-semibold my-1"
              >{itemGroup.name}</div>

              {/* options */}
              {options.map((option, index) => {
                let cloneId = Math.floor(Math.random() * 9999);
                let itemChecked = false;
                let filterItemChecked = Array.isArray(listItemSelected) && listItemSelected.length > 0 && listItemSelected.filter((itemSelected) => {                  
                  return itemSelected === option.label
                }); 
                
                if(filterItemChecked.length > 0) {
                  itemChecked = true;
                }

                if(itemGroup.id === option.idGroup) {
                  return (
                    <div className={clsx("flex items-center py-1 ml-2", {
                      "inline-flex": row
                    })} key={index}>
                      <input
                        type="checkbox"
                        value={option.value}
                        className="mr-1 block cursor-pointer"
                        onChange={() => onChange(option.value)}
                        checked={itemChecked}
                        // checked={disable && option.value == checked || edit && option.value == checked}
                        disabled={disable}
                        {...inputProps}
                        id={cloneId}
                      />
                      <label className="capitalize text-sm font-medium text-black tracking-wider pr-6" htmlFor={cloneId}>
                        {option.label}
                      </label>
                    </div>
                  );
                }                                
              })}
            </Fragment>
          )
        })}
      </div>
    </div>
  );
}

export default InputCheckbox;
