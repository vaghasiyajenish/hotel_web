import React from "react";

interface ButtonProps {
  title: string;
  handleClickButton: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { title, handleClickButton } = props;
  return <button onClick={handleClickButton}>{title}</button>;
};
export default Button;
