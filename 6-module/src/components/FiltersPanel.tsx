import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const PARTS_OF_SPEECH = [
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'preposition',
  'conjunction',
  'interjection',
];

export function FiltersPanel() {
  const [params, setParams] = useSearchParams();
  const selected: string[] = useMemo(() => {
    const raw = params.get('pos') ?? '';
    return raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }, [params]);

  function togglePos(pos: string) {
    const next = new URLSearchParams(params);
    const exists = selected.includes(pos);
    const list = exists ? selected.filter((p) => p !== pos) : [...selected, pos];
    if (list.length) {
      next.set('pos', list.join(','));
    } else {
      next.delete('pos');
    }
    setParams(next);
  }

  return (
    <div className='filters'>
      <div className='filters-title'>Filters</div>
      <div className='filters-group'>
        {PARTS_OF_SPEECH.map((pos) => {
          const id = `pos-${pos}`;
          const checked = selected.includes(pos);
          return (
            <label key={pos} className='filter-item' htmlFor={id}>
              <input checked={checked} id={id} onChange={() => togglePos(pos)} type='checkbox' />
              <span>{pos}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default FiltersPanel;
