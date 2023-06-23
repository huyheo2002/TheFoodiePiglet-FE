import { Fragment } from "react";
import Button from "../Button";
import Heading from "../Heading";

function Form({
  onSubmit,
  children,
  heading,
  close,
  textSubmit,
  textCancel,
  custom,
}) {
  return (
    <form
      autoComplete="off"
      className="flex justify-between flex-col w-full min-h-fit max-h-[calc(100vh-64px)] px-4 py-3 rounded-lg bg-white shadow-black-b-0.75"
      onSubmit={onSubmit}
    >
      {!custom ? (
        <Fragment>
          <Heading
            className="!text-black text-3xl tracking-wider font-bold capitalize"
          >
            {heading}
          </Heading>
          <div className="py-2 px-3">{children}</div>
          <div className="flex">
            <Button viewMore>{textSubmit || "Submit"}</Button>
            <Button viewMore onClick={close}>
              {textCancel || "Cancel"}
            </Button>
          </div>
        </Fragment>
      ) : (
        <div className="w-full h-full">
          {children}
        </div>

      )}
    </form>
  );
}

export default Form;
