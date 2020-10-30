// export class PokerHand {
//   compareWith() {
//     return Result.TIE;
//   }
// }

// export const Result = {
//   WIN: 1,
//   LOSS: 2,
//   TIE: 3,
// };

// export default PokerHand;

import React from "react";
import _, { forEach } from "lodash";
import deck from "../data/deck.json";

const PokerHand = () => {
  const generateHand = () => {
    const hands = [[], []];

    hands.forEach((hand) => {
      for (let index = 0; index < 5; index++) {
        const randomNumber = Math.floor(Math.random() * deck.deck.length - 5);
        const card = deck.deck.splice(randomNumber, 1);
        hand.push(card[0]);
      }
    });

    console.log(hands);
  };

  return <button onClick={() => generateHand()}>Generate Hands</button>;
};

export default PokerHand;
