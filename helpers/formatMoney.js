function formatMoney(num) {
  let str = num.toString();
  let result = '';
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    if (count % 3 === 0 && count >= 3) {
      result = str[i] + '.' + result;
      count++;
    } else {
      result = str[i] + result;
      count++;
    }
  }
  result = `Rp. ${result}`;
  return result;
}

module.exports = formatMoney;