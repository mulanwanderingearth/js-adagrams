export const drawLetters = () => {
  const letterPool = {
    'A': 9,
    'B': 2,
    'C': 2,
    'D': 4,
    'E': 12,
    'F': 2,
    'G': 3,
    'H': 2,
    'I': 9,
    'J': 1,
    'K': 1,
    'L': 4,
    'M': 2,
    'N': 6,
    'O': 8,
    'P': 2,
    'Q': 1,
    'R': 6,
    'S': 4,
    'T': 6,
    'U': 4,
    'V': 2,
    'W': 2,
    'X': 1,
    'Y': 2,
    'Z': 1
  };
  const poolList = [];
  for (const [letter, count] of Object.entries(letterPool)) {
    for (let i = 0; i < count; i++) {
      poolList.push(letter);
    }
  }
  const drawn = [];
  let usedIndices = new Set();
  for (let i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * poolList.length);;
    while (usedIndices.has(randomIndex)) {
      randomIndex = Math.floor(Math.random() * poolList.length);
    }
    drawn.push(poolList[randomIndex]);
    usedIndices.add(randomIndex)
  }
  return drawn;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const inHandCounts = {};
  for (const letter of lettersInHand) {
    inHandCounts[letter] = (inHandCounts[letter] || 0) + 1;
  }
  for (const letter of input) {
    if (letter in inHandCounts && inHandCounts[letter] > 0) {
      inHandCounts[letter] -= 1;
    }
    else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  let total = 0;
  const scoreChart = {
    'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
    'D': 2, 'G': 2,
    'B': 3, 'C': 3, 'M': 3, 'P': 3,
    'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
    'K': 5,
    'J': 8, 'X': 8,
    'Q': 10, 'Z': 10
  };
  for (const letter of word) {
    total += scoreChart[letter.toUpperCase()] || 0;
  }
  if (word.length >= 7 && word.length <= 10) {
    total += 8;
  }
  return total;
};

export const highestScoreFrom = (words) => {
  const wordScore = {};
  for (const word of words) {
    wordScore[word] = scoreWord(word);
  }
  let highestScore = 0;
  let highestWord = '';
  for (const [word, score] of Object.entries(wordScore)) {
    if (score > highestScore) {
      highestScore = score;
      highestWord = word;
    } else if (score === highestScore && highestWord.length !== 10) {
      if (word.length === 10 || word.length < highestWord.length) {
        highestWord = word;
      }
    }
  }
  return {
    word: highestWord,
    score: highestScore
  };
};
