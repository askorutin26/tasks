const firstLetterToUpperCase = (string) => {
  const arrayFromString = string.split("");
  const transfromedArray = arrayFromString.map((elem, index) => {
    return index === 0 ? elem.toUpperCase() : elem.toLowerCase();
  });
  return transfromedArray.join("");
};

const fixSpaces = (string) => {
  const punctuation = [",", "."];

  const parts = string.split("");
  const partsWithoutOddSpaces = [];
  let current = "";

  parts.forEach((elem) => {
    const normalized = elem.trim();

    if (punctuation.includes(normalized)) {
      if (current.length !== 0) {
        partsWithoutOddSpaces.push(current);
      }
      partsWithoutOddSpaces.push(normalized);
      current = "";
    } else if (normalized.length === 0 && current.length !== 0) {
      partsWithoutOddSpaces.push(current);
      current = "";
    } else {
      current = `${current}${normalized}`;
    }
  });
  let result = "";
  partsWithoutOddSpaces.forEach((elem) => {
    if (punctuation.includes(elem)) {
      result = `${result}${elem}`;
    } else {
      result = `${result} ${elem}`;
    }
  });
  return result;
};

const countWords = (string) => {
  const parts = string.split(" ");
  return parts.length;
};

const countUniqWords = (string) => {
  const punctuation = [",", "."];
  const parts = string.split("");
  const allWords = [];
  let current = "";
  const result = {};

  parts.forEach((elem) => {
    const normalized = elem.toLowerCase().trim();
    if (normalized.length === 0) {
      allWords.push(current.trim());
      current = "";
    } else if (!punctuation.includes(normalized)) {
      current = `${current}${normalized}`;
    }
  });
  allWords.forEach((word) => {
    result[word] ? (result[word] += 1) : (result[word] = 1);
  });
  return result;
};
