import { memo } from 'react';
import { Definition } from '../../../types/word';
import { DefinitionItem } from './DefinitionItem';
import { ListSection } from './ListSection';

interface DefinitionsSectionProps {
  definitions: Definition[];
}

export const DefinitionsSection = memo(({ definitions }: DefinitionsSectionProps) => (
  <ListSection
    title='Detailed Definitions'
    items={definitions}
    className='definitions'
    renderItem={(def, idx) => <DefinitionItem key={idx} definition={def} />}
  />
));

DefinitionsSection.displayName = 'DefinitionsSection';
