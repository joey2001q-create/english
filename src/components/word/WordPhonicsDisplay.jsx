import { formatWordData, splitSyllables, splitPhonemes } from '../../utils/wordSplit';

export default function WordPhonicsDisplay({ word, phonetic }) {
  const { syllables, phonemes } = formatWordData(word, phonetic);
  
  return (
    <div className="word-phonics-display">
      <div className="syllables-row">
        {syllables.map((syl, idx) => (
          <span 
            key={idx} 
            className="syllable-text"
            style={{ color: idx % 2 === 0 ? '#FF6B35' : '#00B4D8' }}
          >
            {syl}
            {idx < syllables.length - 1 && <span className="syllable-divider">-</span>}
          </span>
        ))}
      </div>
      
      <div className="phonemes-row">
        {phonemes.map((p, idx) => (
          <span key={idx} className="phoneme-card">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SyllableDisplay({ word }) {
  const syllables = splitSyllables(word);
  
  return (
    <div className="syllables-row">
      {syllables.map((syl, idx) => (
        <span 
          key={idx} 
          className="syllable-text"
          style={{ color: idx % 2 === 0 ? '#FF6B35' : '#00B4D8' }}
        >
          {syl}
          {idx < syllables.length - 1 && <span className="syllable-divider">-</span>}
        </span>
      ))}
    </div>
  );
}

export function PhonemeDisplay({ word, phonetic }) {
  const phonemes = splitPhonemes(word, phonetic);
  
  return (
    <div className="phonemes-row">
      {phonemes.map((p, idx) => (
        <span key={idx} className="phoneme-card">
          {p}
        </span>
      ))}
    </div>
  );
}
