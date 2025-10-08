 import { useState } from 'react';
import LatexDisplay from './components/latexDisplay';
import SolveButton from './components/solveButton'
import Sidebar from './components/sidebar';
import BasePickerDropDown from './components/basePickerDropdown';
import OrderPickerDropdown from './components/orderPickerDropdown';
import './index.css'

const API_URLS = {
  differentiate: "https://function-calculator-backend.onrender.com/api/math/differentiate",
  integrate: "https://function-calculator-backend.onrender.com/api/math/integrate",
  convert_base: "https://function-calculator-backend.onrender.com/api/math/convert/",
  expand: "https://function-calculator-backend.onrender.com/api/math/expand",
  find_root: "https://function-calculator-backend.onrender.com/api/math/roots"
}
export const SAMPLE_EXPRESSIONS = {
  differentiate: "x^3 + 2x^2 - 5x + 7", 
  integrate: "x^3 + 2x^2 - 5x + 7",
  convert_base: "1010",
  expand: "(2x+1)^3",
  find_root: "x^3 + 2x^2 - 5x + 7"
}

export type APIMode = keyof typeof API_URLS;

async function fetchDerivative(expression: string, order: number): Promise<string> {
  const response = await fetch(API_URLS["differentiate"], {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression, order: order })
  })
  const data = await response.json();
  console.log(data.result)
  return data.result || "Error: Unable to process the expression";
};
async function fetchIntegral(expression: string): Promise<string> {
  const response = await fetch(API_URLS["integrate"], {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression })
  })
  const data = await response.json();
  return data.result || "Error: Unable to process the expression";
};
async function fetchExpansion(expression: string): Promise<string> {
  const response = await fetch(API_URLS["expand"], {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression })
  })
  const data = await response.json();
  return data.result || "Error: Unable to process the expression";
};

async function fetchBaseConversion(expression: string, fromBase:string, toBase:string): Promise<string>{
  const response = await fetch(API_URLS["convert_base"] + `${fromBase}-${toBase}`, {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression })
  });
  const data = await response.json();
  return data.result || "Error: Unable to process the expression";
}

async function fetchRoots(expression: string): Promise<string> {
  const response = await fetch(API_URLS["find_root"], {
    method: 'POST',
    headers: {"content-type": "application/json"},
    body: JSON.stringify({ expression: expression })
  })
  const data = await response.json();
  return data.result || "Error: Unable to process the expression";
};

function mathToLatex(expr: string): string {
  return expr
    .replace(/\*/g, '')           // Remove multiplication signs
    .replace(/(\w)\^(\d+)/g, '$1^{\$2}') // x^3 -> x^{3}
    .replace(/\+/g, ' + ')        // Add spaces around plus
    .replace(/-/g, ' - ');        // Add spaces around minus
}

function App() {
  const [result, setResult] = useState<string>("---")
  const [mode, setMode] = useState<APIMode>('differentiate');
  const [sampleExpression, setSampleExpression] = useState<string>("x^3 + 2x^2 - 5x + 7");
  const [expression, setExpression] = useState<string>(sampleExpression)
  const [fromBase, setFromBase] = useState<string>("2")
  const [toBase, setToBase] = useState<string>("10")
  const [order, setOrder] = useState<number>(1)
  


  async function handleSolveClick(expression: string, fromBase?:string, toBase?:string){
    if(mode === "differentiate"){  
      const res = await fetchDerivative(expression, order);
      setResult(res);
    }else if(mode === "integrate"){
      const res = await fetchIntegral(expression);
      setResult(res);
    }else if(mode === "convert_base"){
      const res = await fetchBaseConversion(expression, fromBase ?? "", toBase ?? "");
      setResult(res);
    } else if(mode === "expand") {
      const res = await fetchExpansion(expression);
      setResult(mathToLatex(res));
    } else if (mode === "find_root"){
      const res = await fetchRoots(expression)
      setResult(res)
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
          {mode == "differentiate" && <OrderPickerDropdown order={order} setOrder={setOrder} />}
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
