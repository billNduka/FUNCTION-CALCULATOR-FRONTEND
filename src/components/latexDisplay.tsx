import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import "./latexDisplay.css";

type LatexDisplayProps = {
  expression: string;
};

export default function LatexDisplay({ expression }: LatexDisplayProps) {
  return( 
    <div className='latexDisplay' style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <TeX math={expression} />
    </div>
    

  );
};
