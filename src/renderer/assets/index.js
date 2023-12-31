export const images = {
    no_picture: require('./images/no_picture.png'),
}

const abc = '♠ ♥ ♦ ♣'

// export const cards = [
//     {
//         label: "AS",
//         txt: "A♠",
//         img: require('./playing-cards/spades_A.png')
//     },
//     {
//         label: "2S",
//         txt: "2♠",
//         img: require('./playing-cards/spades_2.png')
//     },
//     {
//         label: "3S",
//         txt: "3♠",
//         img: require('./playing-cards/spades_3.png')
//     },
//     {
//         label: "4S",
//         txt: "4♠",
//         img: require('./playing-cards/spades_4.png')
//     },
//     {
//         label: "5S",
//         txt: "5♠",
//         img: require('./playing-cards/spades_5.png')
//     },
//     {
//         label: "6S",
//         txt: "6♠",
//         img: require('./playing-cards/spades_6.png')
//     },
//     {
//         label: "7S",
//         txt: "7♠",
//         img: require('./playing-cards/spades_7.png')
//     },
//     {
//         label: "8S",
//         txt: "8♠",
//         img: require('./playing-cards/spades_8.png')
//     },
//     {
//         label: "9S",
//         txt: "9♠",
//         img: require('./playing-cards/spades_9.png')
//     },
//     {
//         label: "10S",
//         txt: "10♠",
//         img: require('./playing-cards/spades_10.png')
//     },
//     {
//         label: "JS",
//         txt: "J♠",
//         img: require('./playing-cards/spades_J.png')
//     },
//     {
//         label: "QS",
//         txt: "Q♠",
//         img: require('./playing-cards/spades_Q.png')
//     },
//     {
//         label: "KS",
//         txt: "K♠",
//         img: require('./playing-cards/spades_K.png')
//     },
//     {
//         label: "AH",
//         txt: "A♥",
//         img: require('./playing-cards/hearts_A.png')
//     },
//     {
//         label: "2H",
//         txt: "2♥",
//         img: require('./playing-cards/hearts_2.png')
//     },
//     {
//         label: "3H",
//         txt: "3♥",
//         img: require('./playing-cards/hearts_3.png')
//     },
//     {
//         label: "4H",
//         txt: "4♥",
//         img: require('./playing-cards/hearts_4.png')
//     },
//     {
//         label: "5H",
//         txt: "5♥",
//         img: require('./playing-cards/hearts_5.png')
//     },
//     {
//         label: "6H",
//         txt: "6♥",
//         img: require('./playing-cards/hearts_6.png')
//     },
//     {
//         label: "7H",
//         txt: "7♥",
//         img: require('./playing-cards/hearts_7.png')
//     },
//     {
//         label: "8H",
//         txt: "8♥",
//         img: require('./playing-cards/hearts_8.png')
//     },
//     {
//         label: "9H",
//         txt: "9♥",
//         img: require('./playing-cards/hearts_9.png')
//     },
//     {
//         label: "10H",
//         txt: "10♥",
//         img: require('./playing-cards/hearts_10.png')
//     },
//     {
//         label: "JH",
//         txt: "J♥",
//         img: require('./playing-cards/hearts_J.png')
//     },
//     {
//         label: "QH",
//         txt: "Q♥",
//         img: require('./playing-cards/hearts_Q.png')
//     },
//     {
//         label: "KH",
//         txt: "K♥",
//         img: require('./playing-cards/hearts_K.png')
//     },
//     {
//         label: "AC",
//         txt: "A♣",
//         img: require('./playing-cards/clubs_A.png')
//     },
//     {
//         label: "2C",
//         txt: "2♣",
//         img: require('./playing-cards/clubs_2.png')
//     },
//     {
//         label: "3C",
//         txt: "3♣",
//         img: require('./playing-cards/clubs_3.png')
//     },
//     {
//         label: "4C",
//         txt: "4♣",
//         img: require('./playing-cards/clubs_4.png')
//     },
//     {
//         label: "5C",
//         txt: "5♣",
//         img: require('./playing-cards/clubs_5.png')
//     },
//     {
//         label: "6C",
//         txt: "6♣",
//         img: require('./playing-cards/clubs_6.png')
//     },
//     {
//         label: "7C",
//         txt: "7♣",
//         img: require('./playing-cards/clubs_7.png')
//     },
//     {
//         label: "8C",
//         txt: "8♣",
//         img: require('./playing-cards/clubs_8.png')
//     },
//     {
//         label: "9C",
//         txt: "9♣",
//         img: require('./playing-cards/clubs_9.png')
//     },
//     {
//         label: "10C",
//         txt: "10♣",
//         img: require('./playing-cards/clubs_10.png')
//     },
//     {
//         label: "JC",
//         txt: "J♣",
//         img: require('./playing-cards/clubs_J.png')
//     },
//     {
//         label: "QC",
//         txt: "Q♣",
//         img: require('./playing-cards/clubs_Q.png')
//     },
//     {
//         label: "KC",
//         txt: "K♣",
//         img: require('./playing-cards/clubs_K.png')
//     },
//     {
//         label: "AD",
//         txt: "A♦",
//         img: require('./playing-cards/diamonds_A.png')
//     },
//     {
//         label: "2D",
//         txt: "2♦",
//         img: require('./playing-cards/diamonds_2.png')
//     },
//     {
//         label: "3D",
//         txt: "3♦",
//         img: require('./playing-cards/diamonds_3.png')
//     },
//     {
//         label: "4D",
//         txt: "4♦",
//         img: require('./playing-cards/diamonds_4.png')
//     },
//     {
//         label: "5D",
//         txt: "5♦",
//         img: require('./playing-cards/diamonds_5.png')
//     },
//     {
//         label: "6D",
//         txt: "6♦",
//         img: require('./playing-cards/diamonds_6.png')
//     },
//     {
//         label: "7D",
//         txt: "7♦",
//         img: require('./playing-cards/diamonds_7.png')
//     },
//     {
//         label: "8D",
//         txt: "8♦",
//         img: require('./playing-cards/diamonds_8.png')
//     },
//     {
//         label: "9D",
//         txt: "9♦",
//         img: require('./playing-cards/diamonds_9.png')
//     },
//     {
//         label: "10D",
//         txt: "10♦",
//         img: require('./playing-cards/diamonds_10.png')
//     },
//     {
//         label: "JD",
//         txt: "J♦",
//         img: require('./playing-cards/diamonds_J.png')
//     },
//     {
//         label: "QD",
//         txt: "Q♦",
//         img: require('./playing-cards/diamonds_Q.png')
//     },
//     {
//         label: "KD",
//         txt: "K♦",
//         img: require('./playing-cards/diamonds_K.png')
//     },
// ]

export const cards = [
    {
        label: "AS",
        txt: "A♠",
        img: require('./playing-cards2/As.png')
    },
    {
        label: "2S",
        txt: "2♠",
        img: require('./playing-cards2/2s.png')
    },
    {
        label: "3S",
        txt: "3♠",
        img: require('./playing-cards2/3s.png')
    },
    {
        label: "4S",
        txt: "4♠",
        img: require('./playing-cards2/4s.png')
    },
    {
        label: "5S",
        txt: "5♠",
        img: require('./playing-cards2/5s.png')
    },
    {
        label: "6S",
        txt: "6♠",
        img: require('./playing-cards2/6s.png')
    },
    {
        label: "7S",
        txt: "7♠",
        img: require('./playing-cards2/7s.png')
    },
    {
        label: "8S",
        txt: "8♠",
        img: require('./playing-cards2/8s.png')
    },
    {
        label: "9S",
        txt: "9♠",
        img: require('./playing-cards2/9s.png')
    },
    {
        label: "10S",
        txt: "10♠",
        img: require('./playing-cards2/Ts.png')
    },
    {
        label: "JS",
        txt: "J♠",
        img: require('./playing-cards2/Js.png')
    },
    {
        label: "QS",
        txt: "Q♠",
        img: require('./playing-cards2/Qs.png')
    },
    {
        label: "KS",
        txt: "K♠",
        img: require('./playing-cards2/Ks.png')
    },
    {
        label: "AH",
        txt: "A♥",
        img: require('./playing-cards2/Ah.png')
    },
    {
        label: "2H",
        txt: "2♥",
        img: require('./playing-cards2/2h.png')
    },
    {
        label: "3H",
        txt: "3♥",
        img: require('./playing-cards2/3h.png')
    },
    {
        label: "4H",
        txt: "4♥",
        img: require('./playing-cards2/4h.png')
    },
    {
        label: "5H",
        txt: "5♥",
        img: require('./playing-cards2/5h.png')
    },
    {
        label: "6H",
        txt: "6♥",
        img: require('./playing-cards2/6h.png')
    },
    {
        label: "7H",
        txt: "7♥",
        img: require('./playing-cards2/7h.png')
    },
    {
        label: "8H",
        txt: "8♥",
        img: require('./playing-cards2/8h.png')
    },
    {
        label: "9H",
        txt: "9♥",
        img: require('./playing-cards2/9h.png')
    },
    {
        label: "10H",
        txt: "10♥",
        img: require('./playing-cards2/Th.png')
    },
    {
        label: "JH",
        txt: "J♥",
        img: require('./playing-cards2/Jh.png')
    },
    {
        label: "QH",
        txt: "Q♥",
        img: require('./playing-cards2/Qh.png')
    },
    {
        label: "KH",
        txt: "K♥",
        img: require('./playing-cards2/Kh.png')
    },
    {
        label: "AC",
        txt: "A♣",
        img: require('./playing-cards2/Ac.png')
    },
    {
        label: "2C",
        txt: "2♣",
        img: require('./playing-cards2/2c.png')
    },
    {
        label: "3C",
        txt: "3♣",
        img: require('./playing-cards2/3c.png')
    },
    {
        label: "4C",
        txt: "4♣",
        img: require('./playing-cards2/4c.png')
    },
    {
        label: "5C",
        txt: "5♣",
        img: require('./playing-cards2/5c.png')
    },
    {
        label: "6C",
        txt: "6♣",
        img: require('./playing-cards2/6c.png')
    },
    {
        label: "7C",
        txt: "7♣",
        img: require('./playing-cards2/7c.png')
    },
    {
        label: "8C",
        txt: "8♣",
        img: require('./playing-cards2/8c.png')
    },
    {
        label: "9C",
        txt: "9♣",
        img: require('./playing-cards2/9c.png')
    },
    {
        label: "10C",
        txt: "10♣",
        img: require('./playing-cards2/Tc.png')
    },
    {
        label: "JC",
        txt: "J♣",
        img: require('./playing-cards2/Jc.png')
    },
    {
        label: "QC",
        txt: "Q♣",
        img: require('./playing-cards2/Qc.png')
    },
    {
        label: "KC",
        txt: "K♣",
        img: require('./playing-cards2/Kc.png')
    },
    {
        label: "AD",
        txt: "A♦",
        img: require('./playing-cards2/Ad.png')
    },
    {
        label: "2D",
        txt: "2♦",
        img: require('./playing-cards2/2d.png')
    },
    {
        label: "3D",
        txt: "3♦",
        img: require('./playing-cards2/3d.png')
    },
    {
        label: "4D",
        txt: "4♦",
        img: require('./playing-cards2/4d.png')
    },
    {
        label: "5D",
        txt: "5♦",
        img: require('./playing-cards2/5d.png')
    },
    {
        label: "6D",
        txt: "6♦",
        img: require('./playing-cards2/6d.png')
    },
    {
        label: "7D",
        txt: "7♦",
        img: require('./playing-cards2/7d.png')
    },
    {
        label: "8D",
        txt: "8♦",
        img: require('./playing-cards2/8d.png')
    },
    {
        label: "9D",
        txt: "9♦",
        img: require('./playing-cards2/9d.png')
    },
    {
        label: "10D",
        txt: "10♦",
        img: require('./playing-cards2/Td.png')
    },
    {
        label: "JD",
        txt: "J♦",
        img: require('./playing-cards2/Jd.png')
    },
    {
        label: "QD",
        txt: "Q♦",
        img: require('./playing-cards2/Qd.png')
    },
    {
        label: "KD",
        txt: "K♦",
        img: require('./playing-cards2/Kd.png')
    },
]