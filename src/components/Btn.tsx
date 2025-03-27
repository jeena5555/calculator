import "./Btn.css";

interface Props {
  action: () => void;
  value: string;
}

export const Btn = ({ action, value }: Props) => {
  const isNumber = !isNaN(Number(value));
  const isZero = value === "0";
  const isDot = value === ".";

  return (
    <button onClick={action} className={`button ${isZero ? "zero" : isNumber || isDot ? "number" : "operator"}`}>
      {value}
    </button>
  );
};

