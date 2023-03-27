import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler, token) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(values, token);
    };

    return {
        values,
        changeHandler,
        onSubmit,
    };

};