import Plot from 'react-plotly.js';
import { parse } from "mathjs";
import { useState, useEffect } from 'react';

interface GraphPlotProps{
    expression: string;
}

export function generatePlotPoints(expression: string, minX = -10, maxX = 10, step = 0.01) {
  const xValues: number[] = [];
  const yValues: number[] = [];
  const expr = parse(expression);

  for (let x = minX; x <= maxX; x += step) {
    try {
      const y = expr.evaluate({ x });
      xValues.push(x);
      yValues.push(y);
    } catch {
      // ignore invalid points
    }
  }

  return { xValues, yValues };
}

export default function GraphPlot({expression = "x^2"}: GraphPlotProps){
    const [plotData, setPlotData] = useState<{ x: number[]; y: number[] }>({ x: [], y: [] });
    
    useEffect(() => {
    // Guard clause: skip if empty or invalid
    if (!expression.trim()) {
      setPlotData({ x: [], y: [] });
      return;
    }

    try {
      const xVals: number[] = [];
      const yVals: number[] = [];
      const expr = parse(expression);

      for (let x = -10; x <= 10; x += 0.1) {
        const y = expr.evaluate({ x });
        xVals.push(x);
        yVals.push(y);
      }

      setPlotData({ x: xVals, y: yVals });
    } catch (err) {
      // Catch parsing or evaluation errors
      console.error("Error evaluating expression:", err);
      setPlotData({ x: [], y: [] });
    }
  }, [expression]);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Plot
        data={[
          {
            x: plotData.x,
            y: plotData.y,
            type: "scatter",
            mode: "lines",
            line: { color: "blue", width: 2 },
          },
        ]}
        layout={{
          title: { text: expression ? `y = ${expression}` : "Enter an expression to plot" },
          xaxis: { title: "x" },
          yaxis: { title: "y" },
        } as any}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}