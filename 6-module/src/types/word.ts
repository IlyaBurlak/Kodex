export interface Phonetic {
  transcription: string;
  audio?: string;
}

export interface Definition {
  number?: string;
  definition: string;
  examples?: string[];
}

export interface IdiomDefinition {
  text: string;
  examples?: string[];
}

export interface Idiom {
  phrase: string;
  definitions: IdiomDefinition[];
}

export interface RelatedWord {
  ure: string;
  fl: string;
}

export interface WordItem {
  word: string;
  fl?: string;
  shortdef?: string[];
  detailed?: boolean;
  phonetics?: Phonetic[];
  definitions?: Definition[];
  idioms?: Idiom[];
  et?: string;
  syns?: string[];
  ants?: string[];
  art?: string;
  uros?: RelatedWord[];
  stems?: string[];
  offensive?: boolean;
  meta?: {
    uuid?: string;
  };
}

export type PartOfSpeech = string;

export interface SearchItem {
  word: string;
  fl?: PartOfSpeech;
  phonetic?: string;
  shortdef?: string[];
  meta?: {
    uuid?: string;
  };
}

export interface SearchState {
  query: string;
  items: SearchItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

export const initialState: SearchState = {
  query: '',
  items: [],
  status: 'idle',
};
export interface Pronunciation {
  mw?: string;
  sound?: {
    audio?: string;
  };
}

export interface UroItem {
  ure: string;
  fl: string;
}
