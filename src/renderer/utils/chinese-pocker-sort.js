function eddie_redmayne_is_awesome(thingy) {
  thingy.sort();
  thingy.reverse();
  if (
    thingy[0].slice(0, 2) == '14' &&
    thingy[1].slice(0, 2) == '13' &&
    thingy[2].slice(0, 2) == '12' &&
    thingy[3].slice(0, 2) == '11' &&
    thingy[4].slice(0, 2) == '10' &&
    thingy[0].charAt(2) == thingy[1].charAt(2) &&
    thingy[1].charAt(2) == thingy[2].charAt(2) &&
    thingy[2].charAt(2) == thingy[3].charAt(2) &&
    thingy[3].charAt(2) == thingy[4].charAt(2)
  ) {
    return [9]; // Royal flush
  } else if (
    +thingy[0].slice(0, 2) - +thingy[1].slice(0, 2) == 1 &&
    +thingy[1].slice(0, 2) - +thingy[2].slice(0, 2) == 1 &&
    +thingy[2].slice(0, 2) - +thingy[3].slice(0, 2) == 1 &&
    +thingy[3].slice(0, 2) - +thingy[4].slice(0, 2) == 1 &&
    thingy[0].charAt(2) == thingy[1].charAt(2) &&
    thingy[1].charAt(2) == thingy[2].charAt(2) &&
    thingy[2].charAt(2) == thingy[3].charAt(2) &&
    thingy[3].charAt(2) == thingy[4].charAt(2)
  ) {
    return [8, +thingy[0].slice(0, 2)]; // straight flush
  } else if (
    thingy[0].slice(0, 2) == '14' &&
    thingy[1].slice(0, 2) == '05' &&
    thingy[2].slice(0, 2) == '04' &&
    thingy[3].slice(0, 2) == '03' &&
    thingy[4].slice(0, 2) == '02' &&
    thingy[0].charAt(2) == thingy[1].charAt(2) &&
    thingy[1].charAt(2) == thingy[2].charAt(2) &&
    thingy[2].charAt(2) == thingy[3].charAt(2) &&
    thingy[3].charAt(2) == thingy[4].charAt(2)
  ) {
    return [8, 5]; // wheel straight flush
  } else if (
    thingy[0].slice(0, 2) == thingy[1].slice(0, 2) &&
    thingy[1].slice(0, 2) == thingy[2].slice(0, 2) &&
    thingy[2].slice(0, 2) == thingy[3].slice(0, 2)
  ) {
    return [7, +thingy[0].slice(0, 2), +thingy[4].slice(0, 2)]; // quads
  } else if (
    thingy[1].slice(0, 2) == thingy[2].slice(0, 2) &&
    thingy[2].slice(0, 2) == thingy[3].slice(0, 2) &&
    thingy[3].slice(0, 2) == thingy[4].slice(0, 2)
  ) {
    return [7, +thingy[1].slice(0, 2), +thingy[0].slice(0, 2)]; // quads
  } else if (
    thingy[0].slice(0, 2) == thingy[1].slice(0, 2) &&
    thingy[1].slice(0, 2) == thingy[2].slice(0, 2) &&
    thingy[3].slice(0, 2) == thingy[4].slice(0, 2)
  ) {
    return [6, +thingy[0].slice(0, 2), +thingy[3].slice(0, 2)]; // full
  } else if (
    thingy[0].slice(0, 2) == thingy[1].slice(0, 2) &&
    thingy[2].slice(0, 2) == thingy[3].slice(0, 2) &&
    thingy[3].slice(0, 2) == thingy[4].slice(0, 2)
  ) {
    return [6, +thingy[2].slice(0, 2), +thingy[0].slice(0, 2)]; // full
  } else if (
    thingy[0].charAt(2) == thingy[1].charAt(2) &&
    thingy[1].charAt(2) == thingy[2].charAt(2) &&
    thingy[2].charAt(2) == thingy[3].charAt(2) &&
    thingy[3].charAt(2) == thingy[4].charAt(2)
  ) {
    return [
      5,
      +thingy[0].slice(0, 2),
      +thingy[1].slice(0, 2),
      +thingy[2].slice(0, 2),
      +thingy[3].slice(0, 2),
      +thingy[4].slice(0, 2),
    ]; // flush
  } else if (
    +thingy[0].slice(0, 2) - +thingy[1].slice(0, 2) == 1 &&
    +thingy[1].slice(0, 2) - +thingy[2].slice(0, 2) == 1 &&
    +thingy[2].slice(0, 2) - +thingy[3].slice(0, 2) == 1 &&
    +thingy[3].slice(0, 2) - +thingy[4].slice(0, 2) == 1
  ) {
    return [4, +thingy[0].slice(0, 2)]; // straight
  } else if (
    thingy[0].slice(0, 2) == '14' &&
    thingy[1].slice(0, 2) == '05' &&
    thingy[2].slice(0, 2) == '04' &&
    thingy[3].slice(0, 2) == '03' &&
    thingy[4].slice(0, 2) == '02'
  ) {
    return [4, 5]; // wheel straight
  } else if (
    thingy[0].slice(0, 2) == thingy[1].slice(0, 2) &&
    thingy[1].slice(0, 2) == thingy[2].slice(0, 2)
  ) {
    return [
      3,
      +thingy[0].slice(0, 2),
      +thingy[3].slice(0, 2),
      +thingy[4].slice(0, 2),
    ]; // trips
  } else if (
    thingy[1].slice(0, 2) == thingy[2].slice(0, 2) &&
    thingy[2].slice(0, 2) == thingy[3].slice(0, 2)
  ) {
    return [
      3,
      +thingy[1].slice(0, 2),
      +thingy[0].slice(0, 2),
      +thingy[4].slice(0, 2),
    ]; // trips
  } else if (
    thingy[2].slice(0, 2) == thingy[3].slice(0, 2) &&
    thingy[3].slice(0, 2) == thingy[4].slice(0, 2)
  ) {
    return [
      3,
      +thingy[2].slice(0, 2),
      +thingy[0].slice(0, 2),
      +thingy[1].slice(0, 2),
    ]; // trips
  } else if (
    thingy[0].slice(0, 2) == thingy[1].slice(0, 2) &&
    thingy[2].slice(0, 2) == thingy[3].slice(0, 2)
  ) {
    return [
      2,
      +thingy[0].slice(0, 2),
      +thingy[2].slice(0, 2),
      +thingy[4].slice(0, 2),
    ]; // twopair
  } else if (
    thingy[0].slice(0, 2) == thingy[1].slice(0, 2) &&
    thingy[3].slice(0, 2) == thingy[4].slice(0, 2)
  ) {
    return [
      2,
      +thingy[0].slice(0, 2),
      +thingy[3].slice(0, 2),
      +thingy[2].slice(0, 2),
    ]; // twopair
  } else if (
    thingy[1].slice(0, 2) == thingy[2].slice(0, 2) &&
    thingy[3].slice(0, 2) == thingy[4].slice(0, 2)
  ) {
    return [
      2,
      +thingy[1].slice(0, 2),
      +thingy[3].slice(0, 2),
      +thingy[0].slice(0, 2),
    ]; // twopair
  } else if (thingy[0].slice(0, 2) == thingy[1].slice(0, 2)) {
    return [
      1,
      +thingy[0].slice(0, 2),
      +thingy[2].slice(0, 2),
      +thingy[3].slice(0, 2),
      +thingy[4].slice(0, 2),
    ]; // pair
  } else if (thingy[1].slice(0, 2) == thingy[2].slice(0, 2)) {
    return [
      1,
      +thingy[1].slice(0, 2),
      +thingy[0].slice(0, 2),
      +thingy[3].slice(0, 2),
      +thingy[4].slice(0, 2),
    ]; // pair
  } else if (thingy[2].slice(0, 2) == thingy[3].slice(0, 2)) {
    return [
      1,
      +thingy[2].slice(0, 2),
      +thingy[0].slice(0, 2),
      +thingy[1].slice(0, 2),
      +thingy[4].slice(0, 2),
    ]; // pair
  } else if (thingy[3].slice(0, 2) == thingy[4].slice(0, 2)) {
    return [
      1,
      +thingy[3].slice(0, 2),
      +thingy[0].slice(0, 2),
      +thingy[1].slice(0, 2),
      +thingy[2].slice(0, 2),
    ]; // pair
  } else {
    return [
      0,
      +thingy[0].slice(0, 2),
      +thingy[1].slice(0, 2),
      +thingy[2].slice(0, 2),
      +thingy[3].slice(0, 2),
      +thingy[4].slice(0, 2),
    ]; // high card
  }
}

function emma_watson_is_cool(thingy) {
  thingy.sort();
  thingy.reverse();
  if (
    thingy[0].slice(0, 2) == thingy[1].slice(0, 2) &&
    thingy[1].slice(0, 2) == thingy[2].slice(0, 2)
  ) {
    return [3, +thingy[0].slice(0, 2)]; // trips
  } else if (
    thingy[0].slice(0, 2) == thingy[1].slice(0, 2) ||
    thingy[1].slice(0, 2) == thingy[2].slice(0, 2)
  ) {
    return [
      1,
      +thingy[1].slice(0, 2),
      +thingy[0].slice(0, 2) + +thingy[2].slice(0, 2) - +thingy[1].slice(0, 2),
    ]; // pair
  } else {
    return [
      0,
      +thingy[0].slice(0, 2),
      +thingy[1].slice(0, 2),
      +thingy[2].slice(0, 2),
    ];
  }
}

function whatchamacallit(hippo, platypus) {
  var goldfish = Math.min(hippo.length, platypus.length);
  for (let baboon = 0; baboon < goldfish; baboon++) {
    if (hippo[baboon] < platypus[baboon]) {
      return false;
    } else if (hippo[baboon] > platypus[baboon]) {
      return true;
    }
  }
  return true;
}

function toproyalty(thingy) {
  var toilet = emma_watson_is_cool(thingy);
  if (toilet[0] == 3) {
    return 8 + toilet[1];
  } else if (toilet[0] == 1 && toilet[1] >= 6) {
    return toilet[1] - 5;
  } else {
    return 0;
  }
}

var midroyaltytable = [0, 0, 0, 2, 4, 8, 12, 20, 30, 50];
var bottomroyaltytable = [0, 0, 0, 0, 2, 4, 6, 10, 15, 25];

function midroyalty(thingy) {
  var broccoli = eddie_redmayne_is_awesome(thingy);
  return midroyaltytable[broccoli[0]];
}

function bottomroyalty(thingy) {
  var carrot = eddie_redmayne_is_awesome(thingy);
  return bottomroyaltytable[carrot[0]];
}

function omfg(cards) {
  // 13 of them, takes like a second
  let answer = -1;
  let benedict_cumberbatch_is_amazing = [];
  let _top = [];
  let _mid = [];
  let _bottom = [];
  for (let a = 0; a < 11; a++) {
    // top
    for (let b = a + 1; b < 12; b++) {
      for (let c = b + 1; c < 13; c++) {
        for (let d = 0; d < 6; d++) {
          // middle
          for (let e = d + 1; e < 7; e++) {
            for (let f = e + 1; f < 8; f++) {
              for (let g = f + 1; g < 9; g++) {
                for (let h = g + 1; h < 10; h++) {
                  // for (i=0; i<6; i++) { // discard
                  var thingything = cards.slice();
                  var top = [thingything[a], thingything[b], thingything[c]];
                  thingything.splice(c, 1);
                  thingything.splice(b, 1);
                  thingything.splice(a, 1);
                  var mid = [
                    thingything[d],
                    thingything[e],
                    thingything[f],
                    thingything[g],
                    thingything[h],
                  ];
                  thingything.splice(h, 1);
                  thingything.splice(g, 1);
                  thingything.splice(f, 1);
                  thingything.splice(e, 1);
                  thingything.splice(d, 1);
                  // thingything.splice(i, 1); // discard
                  var bottom = thingything.slice();
                  var chocolate = eddie_redmayne_is_awesome(mid);
                  if (
                    whatchamacallit(chocolate, emma_watson_is_cool(top)) &&
                    whatchamacallit(
                      eddie_redmayne_is_awesome(bottom),
                      chocolate
                    )
                  ) {
                    var royalty =
                      toproyalty(top) + midroyalty(mid) + bottomroyalty(bottom);
                    if (royalty > answer) {
                      answer = royalty;
                      _top = top;
                      _mid = mid;
                      _bottom = bottom;
                      // benedict_cumberbatch_is_amazing = [top, mid, bottom];
                    }
                    // }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  _top = revertToCardNames(_top);
  _mid = revertToCardNames(_mid);
  _bottom = revertToCardNames(_bottom);
  return {
    totalRoyalty: answer,
    chinesePokerSort: {
      top: _top,
      mid: _mid,
      bottom: _bottom,
    },
  };
}

function convertNumberCard(cardName) {
  var last = cardName.slice(cardName.length - 1, cardName.length);
  var pre = cardName.slice(0, cardName.length - 1).toLowerCase();
  switch (pre) {
    case 'a':
    case '14':
      pre = '14';
      break;
    case 'k':
    case '13':
      pre = '13';
      break;
    case 'q':
    case '12':
      pre = '12';
      break;
    case 'j':
    case '11':
      pre = '11';
      break;
    case '10':
      pre = '10';
      break;
    default:
      try {
        let temp = Number(pre);
        if (temp > 10) {
          throw Error(`Invalid card name ${cardName}`);
        }
        pre = `0${temp}`;
      } catch (e) {
        throw Error(`Convert ${cardName} err :${e}`);
      }
  }
  return `${pre}${last}`;
}

function convertNumberCards(cardNames) {
  let _cards = [];
  cardNames.forEach((cardName) => {
    _cards.push(convertNumberCard(cardName));
  });
  return _cards;
}

function revertToCardName(cardNumber) {
  var last = cardNumber
    .slice(cardNumber.length - 1, cardNumber.length)
    .toUpperCase();
  var pre = cardNumber.slice(0, cardNumber.length - 1);
  switch (pre) {
    case '14':
      pre = 'A';
      break;
    case '13':
      pre = 'K';
      break;
    case '12':
      pre = 'Q';
      break;
    case '11':
      pre = 'J';
      break;
    case '10':
      pre = '10';
      break;
    default:
      try {
        let temp = Number(pre);
        pre = `${temp}`;
      } catch (e) {
        throw Error(`Revert card Number ${cardNumber} err :${e}`);
      }
  }

  return `${pre}${last}`;
}

function revertToCardNames(cardNumbersNames) {
  let _cards = [];
  cardNumbersNames.forEach((cardNumbersName) => {
    _cards.push(revertToCardName(cardNumbersName));
  });
  return _cards;
}

export function sortChinesePokerCards(cards) {
  cards = convertNumberCards(cards);
  let sort = omfg(cards);
  return sort;
}

// var __card = ["Ac", "2s", "2h", "2d", "2c", "3h", "4h", "5c", "7h", "7d", "9h", "10d", "Jh"];
//
// let res = sortChinesePokerCards(__card);
//
// console.log(res);
