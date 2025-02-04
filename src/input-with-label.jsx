import * as React from 'react';
import inputStyles from './App.module.css';

const InputWithLabel = ({
    id,
    value,
    type = "text",
    onInputChange,
    isFocused,
    children
}) => {
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <>
            <label htmlFor={id} className={inputStyles.label}>{children}</label>
            &nbsp;
            <input
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                autoFocus={isFocused}
                onChange={onInputChange}
                className={inputStyles.input}
            />
        </>
    );
}

export default InputWithLabel;