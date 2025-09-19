export interface SenseData {
  sn?: string;
  dt?: Array<['text', string] | ['vis', Array<{ t?: string }>]>;
}

export interface DroData {
  drp: string;
  def?: Array<{
    sseq?: Array<Array<['sense', SenseData] | [string, unknown]>>;
  }>;
}

export interface MerriamWebsterEntry {
  meta: {
    id: string;
    stems?: string[];
    offensive?: boolean;
  };
  hwi?: {
    prs?: Array<{
      mw?: string;
      sound?: {
        audio?: string;
      };
    }>;
  };
  fl?: string;
  def?: Array<{
    sseq?: Array<Array<['sense', SenseData] | [string, unknown]>>;
  }>;
  dros?: DroData[];
  shortdef?: string[];
  syns?: string[][];
  ants?: string[][];
  et?: string[][];
  art?: {
    url: string;
  };
  uros?: Array<{
    ure: string;
    fl: string;
  }>;
}

export interface ProcessedSenseData {
  definitionText: string;
  examples: string[];
}
