import { memo } from 'react';
import { Phonetic } from '../../../types/word';
import { AudioButton } from './AudioButton';
import { ListSection } from './ListSection';

interface PhoneticSectionProps {
  phonetics: Phonetic[];
}

export const PhoneticSection = memo(({ phonetics }: PhoneticSectionProps) => (
  <ListSection
    title='Pronunciation'
    items={phonetics}
    className='phonetic-section'
    renderItem={(ph, idx) => (
      <div key={idx} className='phonetic-item'>
        <span className='transcription'>[{ph.transcription}]</span>
        {ph.audio && <AudioButton audioUrl={ph.audio} />}
      </div>
    )}
  />
));

PhoneticSection.displayName = 'PhoneticSection';
