const multiply = (num1, num2) => {
  let num1Length = num1.length;
  let num2Length = num2.length;
  if (num1Length === 0 || num2Length === 0) return "0";

  let result = new Array(num1Length + num2Length).fill(0);

  let i_n1 = 0;
  let i_n2 = 0;

  for (let i = num1Length - 1; i >= 0; i--) {
    let carry = 0;
    let n1 = num1.charAt(i) - "0";

    i_n2 = 0;

    for (let j = num2Length - 1; j >= 0; j--) {
      let n2 = num2.charAt(j) - "0";

      let sum = n1 * n2 + result[i_n1 + i_n2] + carry;

      carry = Math.floor(sum / 10);

      result[i_n1 + i_n2] = sum % 10;

      i_n2++;
    }

    if (carry > 0) result[i_n1 + i_n2] += carry;

    i_n1++;
  }

  let i = result.length - 1;
  while (i >= 0 && result[i] === 0) i--;

  if (i === -1) return "0";

  let s = "";

  while (i >= 0) s += result[i--];

  return s;
};

export default multiply;
