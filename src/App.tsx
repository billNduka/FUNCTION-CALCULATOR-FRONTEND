import { useState } from 'react';
import LatexDisplay from './components/latexDisplay';
import SolveButton from './components/solveButton'
import Sidebar from './components/sidebar';
import BasePickerDropDown from './components/basePickerDropdown';
import './index.css'

const API_URLS = {
  differentiate: "https://function-calculator-backend.onrender.com/api/math/differentiate",
  integrate: "https://function-calculator-backend.onrender.com/api/math/integrate",
  convert_base: "https://function-calculator-backend.onrender.com/api/math/convert/"
}
export const SAMPLE_EXPRESSIONS = {
  differentiate: "x^3 + 2x^2 - 5x + 7", 
  integrate: "x^3 + 2x^2 - 5x + 7",
  convert_base: "1010"
}

export type APIMode = keyof typeof API_URLS;

async function fetchCalculusSolution(expression: string, mode: APIMode): Promise<string> {
  const response = await fetch(API_URLS[mode], {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression })
  })
  const data = await response.json();
  return data.result || "Error: Unable to process the expression";
};

async function fetchBaseConversionSolution(expression: string, fromBase:string, toBase:string): Promise<string>{
  const response = await fetch(API_URLS["convert_base"] + `${fromBase}-${toBase}`, {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression })
  });
  const data = await response.json();
  return data.result || "Error: Unable to process the expression";
}


function App() {
  const [result, setResult] = useState<string>("---")
  const [mode, setMode] = useState<APIMode>('differentiate');
  const [sampleExpression, setSampleExpression] = useState<string>("x^3 + 2x^2 - 5x + 7");
  const [expression, setExpression] = useState<string>(sampleExpression)
  const [fromBase, setFromBase] = useState<string>("2")
  const [toBase, setToBase] = useState<string>("10")
  


  async function handleSolveClick(expression: string, fromBase?:string, toBase?:string){
    if(mode === "differentiate" || mode === "integrate"){  
      const res = await fetchCalculusSolution(expression, mode);
      setResult(res);
    }else if(mode === "convert_base"){
      const res = await fetchBaseConversionSolution(expression, fromBase ?? "", toBase ?? "");
      setResult(res);
    }
  }

  return (
    <div style={{ display: 'flex', margin: 0, padding: 0 }}>

      <Sidebar
        mode={mode}
        setMode={setMode}
        setSampleExpression={setSampleExpression}
        setExpression={setExpression}
        options={Object.keys(API_URLS)}
      />
      
      <div className="main-content">
        <div className='window'>  
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Enter LaTeX expression"
          />
          {mode !== "convert_base" && <LatexDisplay className='inputDisplay' expression={expression}/>}
        </div>
        <div className='window'>
          <h2>Rendered Output:</h2>
          <div>
            <LatexDisplay className='resultDisplay' expression={result} />
          </div>
          <div>
            <SolveButton onClick={() => handleSolveClick(expression, fromBase, toBase)} />
            {mode === "convert_base" && (
              <BasePickerDropDown
                fromBase={fromBase}
                toBase={toBase}
                setFromBase={setFromBase}
                setToBase={setToBase}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
