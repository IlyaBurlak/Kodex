import { Definition, Idiom } from '../../../types/word';
import { cleanMerriamWebsterText } from '../../../utils/cleanMerriamWebsterText';
import { DroData, ProcessedSenseData, SenseData } from './types';

export const processSenseData = (senseData: SenseData): ProcessedSenseData => {
  let definitionText = '';
  const examples: string[] = [];

  senseData.dt?.forEach((dt) => {
    const [type, content] = dt;

    if (type === 'text') {
      definitionText += cleanMerriamWebsterText(content) + ' ';
    } else if (type === 'vis') {
      content.forEach((vis: { t?: string }) => {
        if (vis.t) {
          examples.push(cleanMerriamWebsterText(vis.t));
        }
      });
    }
  });

  return { definitionText: definitionText.trim(), examples };
};

export const extractDefinitionsFromSenseGroup = (
  senseGroup: Array<['sense', SenseData] | [string, unknown]>
): Definition[] => {
  const definitions: Definition[] = [];

  senseGroup.forEach((item) => {
    const [senseType, senseData] = item;
    if (senseType !== 'sense') return;

    const { definitionText, examples } = processSenseData(senseData as SenseData);

    if (!definitionText && examples.length === 0) return;

    definitions.push({
      number: (senseData as SenseData).sn,
      definition: definitionText,
      examples: examples.length > 0 ? examples : undefined,
    });
  });

  return definitions;
};

export const extractDefinitions = (
  sseq: Array<Array<['sense', SenseData] | [string, unknown]>>
): Definition[] => {
  return sseq.flatMap((senseGroup) => extractDefinitionsFromSenseGroup(senseGroup));
};

export const extractIdiomDefinitions = (
  def: NonNullable<DroData['def']>[number]
): Idiom['definitions'] => {
  const definitions: Idiom['definitions'] = [];

  def.sseq?.forEach((senseGroup: Array<['sense', SenseData] | [string, unknown]>) => {
    senseGroup.forEach((item: ['sense', SenseData] | [string, unknown]) => {
      const [senseType, senseData] = item;
      if (senseType !== 'sense') return;

      const { definitionText, examples } = processSenseData(senseData as SenseData);

      if (!definitionText && examples.length === 0) return;

      definitions.push({
        text: definitionText,
        examples: examples.length > 0 ? examples : undefined,
      });
    });
  });

  return definitions;
};

export const extractIdioms = (dros: DroData[]): Idiom[] => {
  return dros.map((dro) => {
    const idiomDefinitions = dro.def?.flatMap((def) => extractIdiomDefinitions(def)) || [];

    return {
      phrase: dro.drp,
      definitions: idiomDefinitions,
    };
  });
};
