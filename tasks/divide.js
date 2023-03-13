const divide = (number, divisor) => {
  let ans = "";

  let idx = 0;
  let temp = parseInt(number[idx]);
  while (temp < divisor) {
    temp = temp * 10 + parseInt(number[++idx]);
  }

  while (number.length > idx) {
    ans += Math.floor(temp / divisor);

    temp = (temp % divisor) * 10 + parseInt(number[++idx]);
  }

  if (ans.length == 0) {
    return "0";
  }

  return ans;
};

export default divide;
