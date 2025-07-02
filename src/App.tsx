import { useState } from 'react';
import LatexDisplay from './components/latexDisplay';

function App() {

  const [expression, setExpression] = useState("x^n + y^n = z^n")

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
        <LatexDisplay expression={expression} />
      </div>
    </div>
  );
}

export default App
