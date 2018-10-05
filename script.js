// Declarations

// Input verification
function isNumberKey(key){
    // blank output to avoid user error
    document.getElementById('amt_output').value = 'Press Get Words';
    return (key >= '0' && key <= '9') || key == '.' || key == 'ArrowLeft'
        || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}

// Get text from Input
function getStringValue() {

  let input = document.getElementById('amt_input').value
              .replace(/\.\./g,'\.'); // correct double radix entry
  let inputAmt = Math.trunc(Number(input) * 100) / 100;
  displayOutput(inputAmt);
}

function displayOutput(amount) {
  if (Number.isNaN(amount)) {
    document.getElementById('amt_output').value = 'What you entered isn\'t a number';
  } else if (amount == 0) {
    document.getElementById('amt_output').value = 'Can\'t write a check for zero dollars';
  } else if (amount > 1e6 - 0.01) {
    document.getElementById('amt_output').value = 'That number\'s too big';
  } else {
    document.getElementById('amt_output').value = AmountToLongString(amount);
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

  amtInt = Math.trunc(amount); // remove cents

  // case < 1.00
  if (amount < 1) {
    return ('No and ' + FractionalPart(amount));
  }

  // case 1 - 999.99
  if (amount < 1000) {
    return (HundredsToLongString(amtInt)
            + (amtInt % 100 === 0 ? '' : ' ') // only add space if needed
            + 'and ' + FractionalPart(amount));
  }

  // case 1000 - 999,999.99
    // conditional at top of function ensures amount < 1e6
  return (HundredsToLongString(Math.trunc(amtInt/1000)) + ' Thousand '
          + HundredsToLongString(amtInt % 1000)
          + (amtInt % 1000 === 0 ? '' : ' ') // only add space if needed
          + 'and '
          + FractionalPart(amount));

}

function HundredsToLongString(num) {
  // returns words for integer 0 < num < 1000
  if (num < 10) {
    return (NumberToUnitsWord(num));
  } else if (num < 100) {
    return (NumberToTensWord(num));
  } else {
    if (num % 100 === 0) {
      return (NumberToUnitsWord(Math.trunc(num / 100)) + ' Hundred ');
    } else if (num % 100 < 10) {
      return (NumberToUnitsWord(Math.trunc(num / 100)) + ' Hundred '
              + NumberToUnitsWord(num % 100));
    } else {
      return (NumberToUnitsWord(Math.trunc(num / 100)) + ' Hundred '
              + NumberToTensWord(num % 100));
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

function NumberToTensWord(num) {
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
      return('Twenty ' + NumberToUnitsWord(num % 10));
    case 3:
      return('Thirty '+ NumberToUnitsWord(num % 10));
    case 4:
      return('Forty ' + NumberToUnitsWord(num % 10));
    case 5:
      return('Fifty ' + NumberToUnitsWord(num % 10));
    case 6:
      return('Sixty ' + NumberToUnitsWord(num % 10));
    case 7:
      return('Seventy ' + NumberToUnitsWord(num % 10));
    case 8:
      return('Eighty ' + NumberToUnitsWord(num % 10));
    case 9:
      return('Ninety ' + NumberToUnitsWord(num % 10));
  }
}

function FractionalPart(amount) {
    return (Math.round((amount - amtInt) * 100) + '/100 Dollars');
}

// Test Cases
function TestAmt(value) {
  console.log('Value is ', value, 'and string is', AmountToLongString(value));
}

TestAmt(0);
TestAmt(0.99);
TestAmt(1);
TestAmt(4.57);
TestAmt(9.99);
TestAmt(10);
TestAmt(16.42);
TestAmt(76.54);
TestAmt(99.99);
TestAmt(100);
TestAmt(105);
TestAmt(110);
TestAmt(123.45);
TestAmt(456.23);
TestAmt(999.99);
TestAmt(1000);
TestAmt(1235.45);
TestAmt(1400.16);
TestAmt(6000);
TestAmt(10000);
TestAmt(12345.67);
TestAmt(16000);
TestAmt(16543.21);
TestAmt(423000);
TestAmt(367159.24);
TestAmt(999000);
TestAmt(999999.99);
TestAmt(1000000.);

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
