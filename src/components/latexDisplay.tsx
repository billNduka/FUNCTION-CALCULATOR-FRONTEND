import TeX from '@matejmazur/react-katex';
import 'katex/dist/katex.min.css';
import "./styles/latexDisplay.css";

type LatexDisplayProps = {
  expression: string;
  className?: string;
};

export default function LatexDisplay({ className, expression }: LatexDisplayProps) {
  return( 
    <div className={className ||'latexDisplay'} style={{ }}>
        <TeX math={expression} />
    </div>
    

  );
};
