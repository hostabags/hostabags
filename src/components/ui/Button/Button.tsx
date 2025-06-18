interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  colorButton: "indigo" | "red" | "green" | "gray";
  colorText: "black" | "white";
  size?: "lg" | "xl" | "xs" | "sm" | "2xl" | "base"
}

const Button = ({ onClick, children, colorButton, colorText, size = "base" }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${colorButton}-500 hover:bg-${colorButton}-600 text-${colorText}
      text-${size} mx-2 py-1 px-3 rounded transition-colors duration-200`}
    >
      {children}
    </button>
  );
};

export default Button;
