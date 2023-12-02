import React, { useState } from "react";

export default function Form(props) {

    const [name, setName] = useState('');

    function inputValidator(input) {
        const regx = /^[a-zA-Z][\w ]*$/;
        const inputVal = input.trim();

        if(inputVal === '') return null;
        if(!regx.test(inputVal)) return null;
        return inputVal;
    }
    function handleSubmit(e) {
        e.preventDefault();
        const validated = inputValidator(name);
        if(validated === null) return;
        props.addTask(validated);
        setName('');
    }

    function handleChange(e) {
        setName(e.target.value);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                value={name}
                onChange={handleChange}
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}