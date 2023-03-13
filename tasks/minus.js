function minus(num1, num2) {
  const num1Length = num1.length;
  const num2Length = num2.length;
  const getNumbersByLength = (num1, num2) => {
    let bigger;
    let smaller;
    if (num1Length > num2Length) {
      bigger = num1;
      smaller = num2;
    } else {
      bigger = num2;
      smaller = num1;
    }
    return {
      bigger,
      smaller,
      negative: num1 < num2,
    };
  };
  const { bigger, smaller, negative } = getNumbersByLength(num1, num2);

  const partsA = bigger.split("").reverse();
  const partsB = smaller.split("").reverse();

  let getCurrentBigger = (i) => Number(partsA[i]);
  let getCurrentSmaller = (i) => Number(partsB[i]);
  let wasSubstructed = false;

  const result = [];

  for (let i = 0; i < partsA.length; i += 1) {
    let currentBigger = Number(getCurrentBigger(i));
    let currentSmaller = isNaN(getCurrentSmaller(i))
      ? 0
      : Number(getCurrentSmaller(i));

    if (wasSubstructed) {
      if (currentBigger < currentSmaller) {
        currentBigger = Number("1".concat(String(currentBigger)));
        wasSubstructed = true;
      } else if (currentBigger === 0) {
        currentBigger = 10 - 1;
        wasSubstructed = true;
      } else {
        currentBigger = currentBigger - 1;
        wasSubstructed - false;
      }
    }
    if (currentBigger < currentSmaller) {
      currentBigger = Number("1".concat(String(currentBigger)));

      wasSubstructed = true;
    }

    const minusVal = currentBigger - currentSmaller;

    result.push(String(minusVal));
  }

  const answer = result.reverse().join("");
  if (negative) {
    return "-".concat(answer);
  } else if (result.filter((elem) => elem !== "0").length == 0) {
    return "0";
  } else {
    return answer;
  }
}

export default minus;
