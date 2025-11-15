import { Phonetic, Pronunciation, UroItem, WordItem } from '../../../types/word';
import { cleanMerriamWebsterText } from '../../../utils/cleanMerriamWebsterText';

export const mapPhonetics = (prs: Pronunciation[] | undefined): Phonetic[] => {
  return (prs || []).map((pr: Pronunciation) => ({
    transcription: pr.mw || '',
    audio: pr.sound?.audio
      ? `https://media.merriam-webster.com/audio/prons/en/us/mp3/${pr.sound.audio[0]}/${pr.sound.audio}.mp3`
      : undefined,
  }));
};

export const mapRelatedWords = (uros: UroItem[] | undefined): WordItem['uros'] => {
  return (
    uros?.map((uro: UroItem) => ({
      ure: uro.ure,
      fl: uro.fl,
    })) || undefined
  );
};

export const mapSynonymsAntonyms = (items: string[][] | undefined): string[] | undefined => {
  return (
    items?.flat().filter((val: unknown): val is string => typeof val === 'string') || undefined
  );
};

export const mapShortDefinitions = (shortdef: string[] | undefined): string[] | undefined => {
  return shortdef?.map((def: string) => cleanMerriamWebsterText(def)) || undefined;
};

export const mapEtymology = (et: string[][] | undefined): string | undefined => {
  return et ? et.flat().join('; ') : undefined;
};
