import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState("");
  const [initialCurrency, setInitialCurrency] = useState("USD");
  const [goalCurrency, setGoalCurrency] = useState("USD");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (initialCurrency === goalCurrency || !value) {
      setResult(() => value);
      return;
    }
    const fetchData = async () => {
      const API_URL = `https://api.frankfurter.app/latest?amount=${value}&from=${initialCurrency}&to=${goalCurrency}`;
      const res = await fetch(API_URL);
      const data = await res.json();
      setResult(data.rates[goalCurrency]);
    };

    fetchData();
  }, [initialCurrency, goalCurrency, value]);

  const handleInputChange = function (e) {
    const newValue = +e.target.value;
    if (isNaN(newValue)) return;
    setValue(newValue);
  };
  return (
    <div>
      <input type="text" value={value} onChange={handleInputChange} />
      <select
        value={initialCurrency}
        onChange={(e) => setInitialCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={goalCurrency}
        onChange={(e) => setGoalCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
      {value &&
        `${value} ${initialCurrency} is equivalent to ${result} ${goalCurrency}`}
    </div>
  );
}

export default App;
