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
}
