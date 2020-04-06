import React from 'react';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} alt="error"></img>
            <span>Что-то пошло не так...</span>
        </>
    );
};

export default ErrorMessage;