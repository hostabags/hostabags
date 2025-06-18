interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  colorButton: "indigo" | "red" | "green" | "gray";
  colorText: "black" | "white";
}

const SignButton = ({ onClick, children, colorButton, colorText }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${colorButton}-500 hover:bg-${colorButton}-600 text-${colorText} mx-2 py-1 px-3 rounded`}
    >
      {children}
    </button>
  );
};

export default SignButton;
