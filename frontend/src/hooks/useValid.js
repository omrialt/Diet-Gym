import { useState } from "react";

const UseValid = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const enteredValueIsValid = validateValue(enteredValue);

  const hasError = !enteredValueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
    console.log(e.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError,
    isValid: enteredValueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setEnteredValue,
  };
};

export const validateEmail = (mail) => {
  return String(mail)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default UseValid;
