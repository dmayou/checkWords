'use strict';

// Global variables
let inText;
let outText;

// On document ready
document.addEventListener('DOMContentLoaded', function(){
  inText = document.getElementById('amt_input');
  outText = document.getElementById('amt_output');
  setFocus(inText);
});

function setFocus(target) {
  if (target != null) {
    target.focus();
  } else { // may be true while testing
    console.log('setFocus(): target is null');
  }
}

// Input verification
function isNumberKey(key, src){
    // blank output to avoid user error
    outText.value = 'Press Get Words';
    return (key >= '0' && key <= '9') || key == '.' || key == 'ArrowLeft'
        || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}

// Get text from Input
function getStringValue() {
  let input = inText.value
              .replace(/\.\./g,'\.'); // correct double radix entry
  // let inputAmt = (input === '' ? NaN : (Math.trunc(Number(input) * 100) / 100));
  setFocus(inText);
  displayOutput(input, outText);
}

function displayOutput(input, target) {
  if (input === '' || input == null || (String(input).match(/^[0-9.]+$/) == null)) {
    target.value = 'What you entered isn\'t a number';
    return;
  }

  let amount = Math.trunc(Number(input) * 100) / 100;
  if (amount === 0) {
    target.value = 'Can\'t write a check for zero dollars';
  } else if (amount > 1e6 - 0.01) {
    target.value = 'That number\'s too big';
  } else {
    target.value = AmountToLongString(amount);
  }
}

/************************************
* function AmountToLongString()
* Input:  Amount of check in dollars and cents (ex. 120.35)
* Output: String representing the number
*         in English words
*/
function AmountToLongString(amount) {
  if (typeof amount != 'number' || (amount > (1e6 - 0.01) || amount < 0.01)) {
    return null;
  }

  let amtInt = Math.trunc(amount); // remove cents

  // case < 1.00
  if (amount < 1) {
    return ('Zero and ' + FractionalPart(amount));
  }

  // case 1 - 999.99
  if (amount < 1000) {
    return (HundredsToLongString(amtInt, false)
            + (amtInt % 100 === 0 ? '' : ' ') // only add space if needed
            + 'and ' + FractionalPart(amount));
  }

  // case 1000 - 999,999.99
    // conditional at top of function ensures amount < 1e6
  return (HundredsToLongString(Math.trunc(amtInt/1000), true) + ' Thousand '
          + HundredsToLongString(amtInt % 1000, false)
          + (amtInt % 100 === 0 ? '' : ' ') // only add space if needed
          + 'and '
          + FractionalPart(amount));
}

function HundredsToLongString(num, dashes) {
  // returns words for integer 0 < num < 1000
  if (num < 10) {
    return (NumberToUnitsWord(num));
  } else if (num < 100) {
    return (NumberToTensWord(num, dashes));
  } else {
    if (num % 100 === 0) {
      return (NumberToUnitsWord(Math.trunc(num / 100)) + ' Hundred ');
    } else if (num % 100 < 10) {
      return (NumberToUnitsWord(Math.trunc(num / 100)) + ' Hundred '
              + NumberToUnitsWord(num % 100));
    } else {
      return (NumberToUnitsWord(Math.trunc(num / 100)) + ' Hundred '
              + NumberToTensWord(num % 100, dashes));
    }
  }
}

function NumberToUnitsWord(num) {
  if (typeof num != 'number' || (num > 9 || num < 0)) {
    return null;
  }
  switch (num) {
    case 0:
      return('');
    case 1:
      return('One');
    case 2:
      return('Two');
    case 3:
      return('Three');
    case 4:
      return('Four');
    case 5:
      return('Five');
    case 6:
      return('Six');
    case 7:
      return('Seven');
    case 8:
      return('Eight');
    case 9:
      return('Nine');
    default:
  }
}

function NumberToTensWord(num, dashes) {
  if (typeof num != 'number' || (num > 99 || num < 10)) {
    return null;
  }
  if (num < 20) {
    switch (num) {
      case 10:
        return('Ten');
      case 11:
        return('Eleven');
      case 12:
        return('Twelve');
      case 13:
        return('Thirteen');
      case 14:
        return('Fourteen');
      case 15:
        return('Fifteen');
      case 16:
        return('Sixteen');
      case 17:
        return('Seventeen');
      case 18:
        return('Eighteen');
      case 19:
        return('Nineteen');
    }
  }
  switch (Math.trunc(num / 10)) {
    case 2:
      return('Twenty' + (dashes ? '-' : ' ') + NumberToUnitsWord(num % 10));
    case 3:
      return('Thirty' + (dashes ? '-' : ' ') + NumberToUnitsWord(num % 10));
    case 4:
      return('Forty' + (dashes ? '-' : ' ') + NumberToUnitsWord(num % 10));
    case 5:
      return('Fifty' + (dashes ? '-' : ' ') + NumberToUnitsWord(num % 10));
    case 6:
      return('Sixty' + (dashes ? '-' : ' ') + NumberToUnitsWord(num % 10));
    case 7:
      return('Seventy' + (dashes ? '-' : ' ') + NumberToUnitsWord(num % 10));
    case 8:
      return('Eighty' + (dashes ? '-' : ' ') + NumberToUnitsWord(num % 10));
    case 9:
      return('Ninety' + (dashes ? '-' : ' ') + NumberToUnitsWord(num % 10));
  }
}

function FractionalPart(amount) {
    return (Math.round((amount - Math.trunc(amount)) * 100) + '/100 Dollars');
}

// function AmountToWordsRecurs(amount) {
//   // check for in range
//   if (typeof amount != 'number' || amount > 1e6 - 0.01 || amount < 0.01) {
//     return '';
//   }
//   // Handle cents if (amount - Math.trunc(amount) != 0) {
//   amount = Math.trunc(amount);
//
//   return (HundredsToLongString(amount / Math.pow(10, (amount >= 1000 ? 3 : 0))
//         + (amount > 0 ? AmountToWordsRecurs(amount / 1000) : '')));
// }
