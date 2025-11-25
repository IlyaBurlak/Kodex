import { memo } from 'react';
import { Idiom } from '../../../types/word';
import { Examples } from './Examples';

interface IdiomItemProps {
  idiom: Idiom;
}

export const IdiomItem = memo(({ idiom }: IdiomItemProps) => (
  <div className='idiom-item'>
    <h4 className='idiom-phrase'>{idiom.phrase}</h4>
    {idiom.definitions.map((def, defIdx) => (
      <div key={defIdx} className='idiom-definition'>
        <p>{def.text}</p>
        {def.examples && <Examples examples={def.examples} />}
      </div>
    ))}
  </div>
));

IdiomItem.displayName = 'IdiomItem';
