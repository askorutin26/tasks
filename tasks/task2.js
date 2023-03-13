import sum from "./sum.js";
import minus from "./minus.js";
import divide from "./divide.js";
import multiply from "./multiply.js";

const calcualtor = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return sum(num1, num2);
      break;
    case "-":
      return minus(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return divide(num1, num2);
      break;
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
};
