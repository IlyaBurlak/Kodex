import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MERRIAM_API_KEY, MERRIAM_BASE_URL } from '../../config';

export interface WordCacheState {
  byWord: Record<string, any>;
}

const initialState: WordCacheState = {
  byWord: {},
};

const extractDefinitions = (sseq: any[]): any[] => {
  const definitions: any[] = [];

  sseq.forEach((senseGroup: any[]) => {
    senseGroup.forEach(([senseType, senseData]: [string, any]) => {
      if (senseType === 'sense') {
        const definition: any = {
          number: senseData.sn,
          definition: '',
          examples: [],
        };

        senseData.dt?.forEach((dt: any[]) => {
          const [type, content] = dt;

          if (type === 'text') {
            definition.definition += content + ' ';
          } else if (type === 'vis') {
            content.forEach((vis: any) => {
              if (vis.t) {
                definition.examples.push(vis.t);
              }
            });
          }
        });

        definition.definition = definition.definition.trim();
        if (definition.definition || definition.examples.length > 0) {
          definitions.push(definition);
        }
      }
    });
  });

  return definitions;
};

const extractIdioms = (dros: any[]): any[] => {
  return dros.map((dro: any) => {
    const idiom: any = {
      phrase: dro.drp,
      definitions: [],
    };

    dro.def?.forEach((def: any) => {
      def.sseq?.forEach((senseGroup: any[]) => {
        senseGroup.forEach(([senseType, senseData]: [string, any]) => {
          if (senseType === 'sense') {
            let definitionText = '';
            const examples: string[] = [];

            senseData.dt?.forEach((dt: any[]) => {
              const [type, content] = dt;

              if (type === 'text') {
                definitionText += content + ' ';
              } else if (type === 'vis') {
                content.forEach((vis: any) => {
                  if (vis.t) {
                    examples.push(vis.t);
                  }
                });
              }
            });

            if (definitionText.trim() || examples.length > 0) {
              idiom.definitions.push({
                text: definitionText.trim(),
                examples,
              });
            }
          }
        });
      });
    });

    return idiom;
  });
};

export const fetchWordDetails = createAsyncThunk<any, string>(
  'wordCache/fetchWordDetails',
  async (word: string) => {
    const url = `${MERRIAM_BASE_URL}/${encodeURIComponent(word)}?key=${MERRIAM_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = (await response.json()) as any[];

    const entry = data.find((e) => typeof e === 'object' && typeof e?.meta?.id === 'string');
    if (!entry) return undefined;

    const phonetics = Array.isArray(entry.hwi?.prs)
      ? entry.hwi.prs.map((pr: any) => ({
          transcription: pr.mw,
          audio: pr.sound?.audio
            ? `https://media.merriam-webster.com/audio/prons/en/us/mp3/${pr.sound.audio[0]}/${pr.sound.audio}.mp3`
            : undefined,
        }))
      : undefined;

    const definitions = entry.def?.[0]?.sseq ? extractDefinitions(entry.def[0].sseq) : [];

    const idioms = entry.dros ? extractIdioms(entry.dros) : [];

    const mapped = {
      word: String(entry.meta.id).split(':')[0] ?? word,
      fl: typeof entry.fl === 'string' ? entry.fl : undefined,
      phonetics,
      shortdef: Array.isArray(entry.shortdef) ? entry.shortdef : undefined,
      definitions: definitions.length > 0 ? definitions : undefined,
      idioms: idioms.length > 0 ? idioms : undefined,
      detailed: true,
      syns: entry.syns ? entry.syns.flat().filter((s: any) => typeof s === 'string') : undefined,
      ants: entry.ants ? entry.ants.flat().filter((a: any) => typeof a === 'string') : undefined,
      et: entry.et ? String(entry.et) : undefined,
      art: entry.art?.url,
      uros: entry.uros
        ? entry.uros.map((uro: any) => ({
            ure: uro.ure,
            fl: uro.fl,
          }))
        : undefined,
      stems: entry.meta?.stems || [],
      offensive: entry.meta?.offensive || false,
    };

    return mapped;
  }
);

const wordCacheSlice = createSlice({
  name: 'wordCache',
  initialState,
  reducers: {
    upsertWord(state, action: PayloadAction<any>) {
      state.byWord[action.payload.word] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWordDetails.fulfilled, (state, action) => {
      const item = action.payload;
      if (item) state.byWord[item.word] = item;
    });
  },
});

export const { upsertWord } = wordCacheSlice.actions;
export const wordCacheReducer = wordCacheSlice.reducer;
