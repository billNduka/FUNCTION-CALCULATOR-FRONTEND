import { useState } from 'react';
import LatexDisplay from './components/latexDisplay';
import SolveButton from './components/SolveButton'
import Sidebar from './components/sidebar';
import './index.css'

export const API_URLS = {
  differentiate: "https://function-calculator-backend.onrender.com/api/math/differentiate",
  integrate: "https://function-calculator-backend.onrender.com/api/math/integrate"
}

export type APIMode = keyof typeof API_URLS;

async function fetchDifferential(expression: string, mode: APIMode): Promise<string> {
  const response = await fetch(API_URLS[mode], {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression })
  })
  const data = await response.json();
  return data.result || "Error: Unable to process the expression";
};


function App() {

  const [expression, setExpression] = useState<string>("")
  const [result, setResult] = useState<string>("---")
  const [mode, setMode] = useState<APIMode>('differentiate');


  async function handleSolveClick(expression: string){
    const res = await fetchDifferential(expression, mode);
    setResult(res);
  }

  return (
    <div style={{ display: 'flex' }}>

      <Sidebar mode={mode} setMode={setMode} options={Object.keys(API_URLS)}/>
      
      <div className='window'>  
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter LaTeX expression"
        />
        <LatexDisplay className='inputDisplay' expression={expression}/>
      </div>
      <div className='window'>
        <h2>Rendered Output:</h2>
        <div>
          <LatexDisplay className='resultDisplay' expression={result} />
        </div>
        <div>
          <SolveButton onClick={() => handleSolveClick(expression)} />
        </div>
      </div>
    </div>
  );
}

export default App
