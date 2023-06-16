import { useState, useEffect } from "react";

function useDebounce(value, delay) {
    const [deboucceValue, setDebouceValue] = useState(value);

    useEffect(() => {
        const handle = setTimeout(() => setDebouceValue(value), delay);

        // cleanup func
        return () => {
            clearTimeout(handle);
        }
    }, [value]);

    return deboucceValue;
}

export default useDebounce;