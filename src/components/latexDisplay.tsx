import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import "./latexDisplay.css";

type LatexDisplayProps = {
  expression: string;
};

export default function LatexDisplay({ expression }: LatexDisplayProps) {
  return( 
    <div className='latexDisplay'>
        <TeX math={expression} />
    </div>
    

  );
};
