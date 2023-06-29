import clsx from "clsx";

function Modal({ children, onClick, open, close, className }) {
    if (!open) return null;    
    // class funny :V
    // animate-bounce
    return (
        <div className="fixed inset-0 z-50 bg-rgba-black-0.50 flex justify-center items-center select-none" onClick={close}>
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