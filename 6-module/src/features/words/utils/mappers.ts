import { Phonetic, Pronunciation, RelatedWord } from '../../../types/word';
import { cleanMerriamWebsterText } from '../../../utils/cleanMerriamWebsterText';

export const mapPhonetics = (prs: Pronunciation[] = []): Phonetic[] => {
  return prs.map((pr) => ({
    transcription: pr.mw || '',
    audio: pr.sound?.audio
      ? `https://media.merriam-webster.com/audio/prons/en/us/mp3/${pr.sound.audio[0]}/${pr.sound.audio}.mp3`
      : undefined,
  }));
};

export const mapRelatedWords = (uros: RelatedWord[] = []): RelatedWord[] => {
  return uros.map((uro) => ({
    ure: uro.ure,
    fl: uro.fl,
  }));
};

export const mapSynonymsAntonyms = (items: string[][] = []): string[] => {
  return items.flat().filter((val): val is string => typeof val === 'string');
};

export const mapShortDefinitions = (shortdef: string[] = []): string[] => {
  return shortdef.map((def) => cleanMerriamWebsterText(def));
};

export const mapEtymology = (et: string[][] = []): string => {
  return et.flat().join('; ');
};
