// AmountToLongString() test cases
let testCases = [
  {amt:      0, words: null},
  {amt:   0.99, words: 'Zero and 99/100 Dollars'},
  {amt:      1, words: 'One and 0/100 Dollars'},
  {amt:   4.57, words: 'Four and 57/100 Dollars'},
  {amt:   9.99, words: 'Nine and 99/100 Dollars'},
  {amt:     10, words: 'Ten and 0/100 Dollars'},
  {amt:  16.42, words: 'Sixteen and 42/100 Dollars'},
  {amt:  76.54, words: 'Seventy Six and 54/100 Dollars'},
  {amt:  99.99, words: 'Ninety Nine and 99/100 Dollars'},
  {amt:    100, words: 'One Hundred and 0/100 Dollars'},
  {amt:    105, words: 'One Hundred Five and 0/100 Dollars'},
  {amt:    110, words: 'One Hundred Ten and 0/100 Dollars'},
  {amt: 123.45, words: 'One Hundred Twenty Three and 45/100 Dollars'},
  {amt: 456.23, words: 'Four Hundred Fifty Six and 23/100 Dollars'},
  {amt: 999.99, words: 'Nine Hundred Ninety Nine and 99/100 Dollars'},
  {amt:   1000, words: 'One Thousand and 0/100 Dollars'},
  {amt: 1235.45, words: 'One Thousand Two Hundred Thirty Five and 45/100 Dollars'},
  {amt: 1400.16, words: 'One Thousand Four Hundred and 16/100 Dollars'},
  {amt:    6000, words: 'Six Thousand and 0/100 Dollars'},
  {amt:   10000, words: 'Ten Thousand and 0/100 Dollars'},
  {amt: 12345.67, words: 'Twelve Thousand Three Hundred Forty Five and 67/100 Dollars'},
  {amt:    16000, words: 'Sixteen Thousand and 0/100 Dollars'},
  {amt: 16543.21, words: 'Sixteen Thousand Five Hundred Forty Three and 21/100 Dollars'},
  {amt: 185000.12, words: 'One Hundred Eighty-Five Thousand and 12/100 Dollars'},
  {amt: 367159.24, words: 'Three Hundred Sixty-Seven Thousand One Hundred Fifty Nine and 24/100 Dollars'},
  {amt: 877877.88, words: 'Eight Hundred Seventy-Seven Thousand Eight Hundred Seventy Seven and 88/100 Dollars'},
  {amt:    999000, words: 'Nine Hundred Ninety-Nine Thousand and 0/100 Dollars'},
  {amt: 999999.99, words: 'Nine Hundred Ninety-Nine Thousand Nine Hundred Ninety Nine and 99/100 Dollars'},
  {amt:   1000000, words: null}
];

for (let i=0; i<testCases.length; i++) {
  let amt = testCases[i].amt;
  let words = testCases[i].words;
  QUnit.test('amt = ' + amt, function(assert){
    assert.equal(
      AmountToLongString(amt), words, `Argument of ${amt} returns ${words}`
    )
  });
}

// test test cases
displayOutput
QUnit.test('zero dollar amount', function(assert){
  assert.equal(
    // AmountToLongString(amt), words, `Argument of ${amt} returns ${words}`
    displayOutput(0), 'Can\'t write check for zero dollars', 'text'   
  )
});
