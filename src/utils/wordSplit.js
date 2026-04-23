export function formatWordData(word, phonetic) {
  if (!word) return { syllables: [], phonemes: [] };
  
  word = word.toLowerCase().trim();
  const phoneticClean = (phonetic || '').replace(/[\/\[\]ˈˌ]/g, '').trim();
  
  const vowels = 'aeiouy';
  const syllables = [];
  let currentSyl = '';
  let i = 0;
  
  while (i < word.length) {
    const char = word[i];
    currentSyl += char;
    
    if (vowels.includes(char)) {
      if (i + 1 < word.length) {
        const next = word[i + 1];
        const nextIsVowel = vowels.includes(next);
        
        if (!nextIsVowel && i + 2 < word.length) {
          const afterNext = word[i + 2];
          if (vowels.includes(afterNext)) {
            syllables.push(currentSyl);
            currentSyl = '';
            i++;
            continue;
          }
        }
        
        if (nextIsVowel) {
          syllables.push(currentSyl);
          currentSyl = '';
        }
      }
    }
    i++;
  }
  
  if (currentSyl) {
    if (syllables.length > 0) {
      syllables[syllables.length - 1] += currentSyl;
    } else {
      syllables.push(currentSyl);
    }
  }
  
  if (syllables.length === 0) syllables.push(word);
  
  const phonemes = [];
  for (let j = 0; j < phoneticClean.length; j++) {
    const char = phoneticClean[j];
    if (/[ɑæɒaʊeɪiːɪoʊɔuːʌəɛɜŋʃʒθðbdfghjklmnprstvwz]/.test(char)) {
      phonemes.push(char);
    }
  }
  
  if (phonemes.length === 0 && phoneticClean) {
    phonemes.push(...phoneticClean.split(''));
  }
  
  return {
    syllables,
    phonemes: phonemes.map(p => `/${p}/`)
  };
}

export function splitSyllables(word) {
  if (!word) return [];
  
  word = String(word).toLowerCase().trim();
  if (!word) return [word];
  
  if (word.includes(' ')) {
    return word.split(' ');
  }
  
  const vowels = 'aeiouy';
  const result = [];
  let currentSyllable = '';
  let i = 0;
  
  while (i < word.length) {
    const char = word[i];
    currentSyllable += char;
    
    if (vowels.includes(char)) {
      if (i + 1 < word.length) {
        const nextChar = word[i + 1];
        const nextIsVowel = vowels.includes(nextChar);
        
        if (!nextIsVowel && i + 2 < word.length) {
          const afterNext = word[i + 2];
          if (vowels.includes(afterNext)) {
            result.push(currentSyllable);
            currentSyllable = '';
            i++;
            continue;
          }
        }
        
        if (nextIsVowel) {
          result.push(currentSyllable);
          currentSyllable = '';
        }
      }
    }
    i++;
  }
  
  if (currentSyllable) {
    if (result.length > 0) {
      result[result.length - 1] += currentSyllable;
    } else {
      result.push(currentSyllable);
    }
  }
  
  return result.length > 0 ? result : [word];
}

export function splitPhonemes(word, phonetic) {
  if (!word) return ['/?/'];
  
  word = String(word).trim();
  const phoneticClean = (phonetic || '').replace(/[\/\[\]ˈˌ]/g, '').trim();
  
  if (!phoneticClean) return ['/?/'];
  
  const phonemes = [];
  for (let i = 0; i < phoneticClean.length; i++) {
    const char = phoneticClean[i];
    if (/[ɑæɒaʊeɪiːɪoʊɔuːʌəɛɜŋʃʒθðbdfghjklmnprstvwz]/.test(char)) {
      phonemes.push(char);
    }
  }
  
  if (phonemes.length === 0) {
    phonemes.push(...phoneticClean.split(''));
  }
  
  return phonemes.length > 0 ? phonemes.map(p => `/${p}/`) : ['/?/'];
}