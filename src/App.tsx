import { useState } from "react";
import "./App.css";
import { Btn } from "./components/Btn";

type OperatorType = "÷" | "x" | "+" | "-" | "=" | null;

const calculate = {
  "÷": (prev: number, next: number) => prev / next,
  "x": (prev: number, next: number) => prev * next,
  "+": (prev: number, next: number) => prev + next,
  "-": (prev: number, next: number) => prev - next,
  "=": (_: number, next: number) => next,
};

function App() {
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState<OperatorType>(null);
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [clearOnNextDigit, setClearOnNextDigit] = useState(false);
  const [lastInput, setLastInput] = useState<number | null>(null);

  const clearAll = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setClearOnNextDigit(false);
    setLastInput(null);
  };

  const handleNumber = (num: number) => {
    if (clearOnNextDigit) {
      setDisplay(String(num));
      setClearOnNextDigit(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display) * -1
    setDisplay(String(value));
  };

  const handlePercent = () => {
    const value = parseFloat(display) / 100
    setDisplay(String(value));
  };

  const handleOperator = (nextOperator: Exclude<OperatorType, null>) => {
    const currentValue = parseFloat(display);

    if (storedValue === null) {
      setStoredValue(currentValue);
    } else if (operator && operator !== "=") {
      const result = calculate[operator](storedValue, currentValue);
      setStoredValue(result);
      setDisplay(String(result));
      setLastInput(currentValue);
    }

    setClearOnNextDigit(true);
    setOperator(nextOperator);

    if (nextOperator === "=" && lastInput !== null && operator) {
      const result = calculate[operator](storedValue || 0, lastInput);
      setStoredValue(result);
      setDisplay(String(result));
    }
  };

  return (
    <>
      <h1>Calculator</h1>
      <div className="input-number">
        <h2>{display}</h2>
      </div>

      <div className="btn-calculater">

        <Btn action={clearAll} value="C" />
        <Btn action={toggleSign} value="+/-" />
        <Btn action={handlePercent} value="%" />
        <Btn action={() => handleOperator("÷")} value="÷" />

        <Btn action={() => handleNumber(7)} value="7" />
        <Btn action={() => handleNumber(8)} value="8" />
        <Btn action={() => handleNumber(9)} value="9" />
        <Btn action={() => handleOperator("x")} value="x" />

        <Btn action={() => handleNumber(4)} value="4" />
        <Btn action={() => handleNumber(5)} value="5" />
        <Btn action={() => handleNumber(6)} value="6" />
        <Btn action={() => handleOperator("-")} value="-" />

        <Btn action={() => handleNumber(1)} value="1" />
        <Btn action={() => handleNumber(2)} value="2" />
        <Btn action={() => handleNumber(3)} value="3" />
        <Btn action={() => handleOperator("+")} value="+" />

        <Btn action={() => handleNumber(0)} value="0" />
        <Btn action={handleDecimal} value="." />
        <Btn action={() => handleOperator("=")} value="=" />
      </div>
    </>
  );
}

export default App;
