import clsx from "clsx";

function Modal({ children, onClick, open, close, className, custom }) {
    if (!open) return null;
    // class funny :V
    // animate-bounce

    if (custom) {
        return <div className="fixed inset-0 z-[99999999] bg-rgba-black-0.50 flex justify-center items-center select-none" onClick={close}>
            <div className={clsx("w-[800px] max-w-[calc(100%-32px)] flex justify-between flex-col rounded-xl max-h-[calc(100vh-65px)] overflow-hidden", {
                className: className,
            })} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    }

    return (
        <div className="fixed inset-0 z-[99999999] bg-rgba-black-0.50 flex justify-center items-center select-none" onClick={close}>
            <div className={clsx("bg-white w-[800px] max-w-[calc(100%-32px)] flex justify-between flex-col rounded-xl px-4 py-3 max-h-[calc(100vh-65px)] overflow-y-scroll scrollbar", {
                className: className,
            })}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="py-4 px-3 relative">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default Modal;