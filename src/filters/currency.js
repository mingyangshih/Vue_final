export default function (num) {
  const n = Number(num);
  return `$${n.toFixed(2).replace(/./g, function (c, i, a) {  //c是數字由左至右一一取出，i是index值，a為數字本身
    return (i && c !== ".") && ((a.length - i) % 3 === 0) ? ',' + c : c;
  })}`
}