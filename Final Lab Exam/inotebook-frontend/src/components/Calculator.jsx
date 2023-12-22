import React, { useState } from 'react';


const Calculator = ({ showAlert }) => {
  const [operand1, setOperand1] = useState(0);
  const [operand2, setOperand2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');

  const handleCalculate = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operand1,
          operand2,
          operation,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Calculation failed. Please try again.');
      }
  
      const data = await response.json();
      setResult(data.result);
      showAlert('Calculation successful!', 'success');
    } catch (error) {
      console.error(error);
      showAlert('Calculation failed. Please try again.', 'danger');
    }
  };
  

  return (
    <div>
      <h2>Calculator</h2>
      <form>
        <input type="number" value={operand1} onChange={(e) => setOperand1(e.target.value)} />
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="x">x</option>
          <option value="/">/</option>
        </select>
        <input type="number" value={operand2} onChange={(e) => setOperand2(e.target.value)} />
        <button type="button" onClick={handleCalculate}>
          Calculate
        </button>
      </form>
      {result && (
        <div>
          <h3>Result: {result}</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;
