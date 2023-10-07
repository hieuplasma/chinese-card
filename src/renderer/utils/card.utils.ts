import { cards } from '../assets';
import { sortChinesePokerCards } from './chinese-pocker-sort';

const list_card: Array<ICard> = cards;

export type ICard = {
  label: string;
  txt: string;
  img: any;
};

export async function randomCard(
  card1: Array<ICard> = [],
  card2: Array<ICard> = [],
  card3: Array<ICard> = []
) {
  //@ts-ignore
  const exits_card: Array<ICard> = [...card1, ...card2, ...card3];
  console.log(exits_card);
  const remaining_card = list_card.filter(
    (obj) => !exits_card.some((item) => item.label === obj.label)
  );
  const shuffled: ICard[] = remaining_card.sort(() => 0.5 - Math.random());
  const random_card: ICard[] = shuffled.slice(0, 13);
  return random_card;
}

export async function randomCard2(exits_card: Array<ICard>) {
  const remaining_card = list_card.filter(
    (obj) => !exits_card.some((item) => item.label === obj.label)
  );
  const shuffled: ICard[] = remaining_card.sort(() => 0.5 - Math.random());
  const random_card: ICard[] = shuffled.slice(0, 13);
  return random_card;
}

export function getCardFromBox(box: any[]) {
  box.sort(function (a, b) {
    if (a[1] - b[1] > 40 || a[1] - b[1] < -40) return a[1] - b[1];
    return a[0] - b[0];
  });
  let set = new Set();
  let cards: ICard[] = [];
  for (const element of box) {
    if (!set.has(element[4])) {
      const tmp = list_card.find((x) => x.label === element[4]);
      if (tmp) {
        cards.push(tmp);
        set.add(element[4]);
      }
    }
  }
  return cards;
}

export function DataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(',');
  const byteString =
    splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}

function tranformCards(cards: ICard[]) {
  const __card = [];
  for (const element of cards) {
    __card.push(element.label);
  }
  return __card;
}

export function sortCards(cards: ICard[]) {
  const labels = tranformCards(cards);
  const sorted = sortChinesePokerCards(labels);
  console.log(sorted)
  const top = sorted.chinesePokerSort.top.reverse();
  const mid = sorted.chinesePokerSort.mid.reverse();
  const bottom = sorted.chinesePokerSort.bottom.reverse();
  const sortedLabel =  [...top, ...mid, ...bottom];

  let res: ICard[] = [];
  for (const element of sortedLabel) {
    const tmp = cards.find((x) => x.label === element.toUpperCase());
    if (tmp) res.push(tmp);
  }

  return res;
}
