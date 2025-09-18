import { memo } from 'react';

interface AudioButtonProps {
  audioUrl: string;
}

export const AudioButton = memo(({ audioUrl }: AudioButtonProps) => {
  const playAudio = () => {
    new Audio(audioUrl).play().catch((e) => console.error('Audio playback failed:', e));
  };

  return (
    <button
      className='audio-button'
      onClick={(e) => {
        e.stopPropagation();
        playAudio();
      }}
      aria-label='Listen pronunciation'
    >
      🔊
    </button>
  );
});

AudioButton.displayName = 'AudioButton';
