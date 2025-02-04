import * as React from 'react';
import {StyledInput, StyledLabel} from "./app-styled-components.jsx";

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
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
            &nbsp;
            <StyledInput
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                autoFocus={isFocused}
                onChange={onInputChange}
            />
        </>
    );
}

export default InputWithLabel;