import { memo } from 'react';
import { Definition } from '../../../types/word';
import { Examples } from './Examples';

interface DefinitionItemProps {
  definition: Definition;
}

export const DefinitionItem = memo(({ definition }: DefinitionItemProps) => (
  <div className='definition-item'>
    {definition.number && <span className='def-number'>{definition.number}.</span>}
    <span className='def-text'>{definition.definition}</span>
    {definition.examples && <Examples examples={definition.examples} />}
  </div>
));

DefinitionItem.displayName = 'DefinitionItem';
