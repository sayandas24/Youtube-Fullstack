import { useEffect } from "react";
import React from 'react'

function UseClickOutside(UseStateVariable, className, className2="notMentioned") {

    const handleClickOutsideLoginWarn = (event) => {
        if (!event.target.closest(className) && !event.target.closest(className2)) {
            UseStateVariable();
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleClickOutsideLoginWarn);

        return () => {
            document.removeEventListener("click", handleClickOutsideLoginWarn);
        };
    }, []);
}

export default UseClickOutside
