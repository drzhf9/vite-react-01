
const InputWithLabel = ({id, value, type="text", onInputChange, children}) => {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            &nbsp;
            <input
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
            />
        </>
    );
}

export default InputWithLabel;