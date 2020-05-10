import React from 'react';

let TextInput = ({
    divClass,
    labelClass,
    labelFor,
    labelText,
    placeholder,
    inputClass,
    inputId,
    inputType,
    inputName,
    onChange,
    error,
    errorClass,
    value }) => {
    return (
        <div className={divClass}>
            <label className={labelClass} htmlFor={labelFor}>{labelText}</label>
            <input name={inputName} onChange={onChange} placeholder={placeholder} type={inputType} className={inputClass} id={inputId} value={value} />
            {error && <div className={errorClass}>{error}</div>}
        </div>
    );
}

export { TextInput };
