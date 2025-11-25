import { memo } from 'react';

interface AudioButtonProps {
  audioUrl: string;
}

export const AudioButton = memo(({ audioUrl }: AudioButtonProps) => {
  const playAudio = () => {
    new Audio(audioUrl).play().catch((err) => console.error('Audio playback failed:', err));
  };

  return (
    <button
      className='audio-button'
      onClick={(event) => {
        event.stopPropagation();
        playAudio();
      }}
      aria-label='Listen pronunciation'
    >
      🔊
    </button>
  );
});

AudioButton.displayName = 'AudioButton';
