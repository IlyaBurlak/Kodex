import { memo } from 'react';
import { Section } from './Section';

export const OffensiveWarningSection = memo(() => (
  <Section title='⚠️ Note' className='offensive-warning'>
    <p>This word may be considered offensive or sensitive in some contexts.</p>
  </Section>
));

OffensiveWarningSection.displayName = 'OffensiveWarningSection';
