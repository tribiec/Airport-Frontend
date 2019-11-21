import React from 'react';
import './Button.css';

const Button = ({ children, type = "submit", color = "azul", onclick = () => {}, disabled}) => {
    return (
        <button disabled={disabled} type={type} onClick={onclick} className={`pl-4 pr-4 pt-2 pb-2 fondo${color}`}>{children}</button>
    );
};

export default Button;