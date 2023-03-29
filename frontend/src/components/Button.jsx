import "../styles/button.scss";
const Button = ({ text, isDisabled, type, onClickFn, className }) => {
  const buttonFn = () => {
    onClickFn();
  };
  return (
    <button
      onClick={buttonFn}
      type={type}
      className={`my-3 mx-3 ${className}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};
export default Button;
