import React from "react";

const useStorageState = (key, initialState) => {
    const isMounted = React.useRef(false);
    const [value, setValue] = React.useState(
        localStorage.getItem(key) || initialState
    );

    React.useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
        }
        else {
            console.log("A: " + value);
            localStorage.setItem(key, value);
        }
    }, [value, key]);

    return [value, setValue];
}

export { useStorageState };
