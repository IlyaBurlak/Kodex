import { memo } from 'react';

interface ExamplesProps {
  examples: string[];
}

export const Examples = memo(({ examples }: ExamplesProps) => (
  <div className='examples'>
    {examples.map((ex, exIdx) => (
      <div key={exIdx} className='example'>
        &#34;{ex}&#34;
      </div>
    ))}
  </div>
));

Examples.displayName = 'Examples';
