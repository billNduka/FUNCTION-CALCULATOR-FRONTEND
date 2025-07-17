import { useEffect, useState } from 'react';
import LatexDisplay from './components/latexDisplay';
import SolveButton from './components/SolveButton'

let difAPIURL: string = "https://function-calculator-backend.onrender.com/api/math/differentiate"

async function fetchDifferential(expression: string): Promise<string> {
  const response = await fetch(difAPIURL, {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression })
  })
  const data = await response.json();
  return data.result || "Error: Unable to process the expression";
};


function App() {

  const [expression, setExpression] = useState<string>("x^n + y^n")
  const [result, setResult] = useState<string>("")

  async function handleSolveClick(expression: string){
    const res = await fetchDifferential(expression);
    setResult(res);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Function Calculator</h1>

      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter LaTeX expression"
      />

      <h2>Rendered Output:</h2>
      <div>
        <LatexDisplay expression={result} />
      </div>
      <div>
        <SolveButton onClick={() => handleSolveClick(expression)} />
      </div>
    </div>
  );
}

export default App
