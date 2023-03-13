const sum = (num1, num2) => {
  let number1 = num1;
  let number2 = num2;
  const num1Length = num1.length;
  const num2Length = num2.length;

  if (num1Length < num2Length) {
    const diffLength = num2Length - num1Length;
    number1 = "0".repeat(diffLength).concat(num1);
  } else {
    const diffLength = num1Length - num2Length;
    number2 = "0".repeat(diffLength).concat(num2);
  }

  const sumDigits = (a, b) => {
    const x = Number(a);
    const y = Number(b);
    return String(x + y);
  };

  const bigplus = (a, b) => {
    let carry = false;

    let summ = "";
    let temp = "";
    let digit;
    let plusOne = "";

    for (let i = 0; i < b.length; i++) {
      if (carry) {
        plusOne = sumDigits(a[a.length - 1 - i], "1");

        temp = sumDigits(plusOne, b[b.length - 1 - i]);
      } else {
        temp = sumDigits(a[a.length - 1 - i], b[b.length - 1 - i]);
      }

      if (temp.length == 1) {
        summ = temp + summ;
        carry = false;
      } else {
        carry = true;
        digit = temp[1];
        summ = digit + summ;
      }
    }
    if (carry) {
      summ = "1" + summ;
    }
    return summ;
  };

  return bigplus(number1, number2);
};

export default sum;
