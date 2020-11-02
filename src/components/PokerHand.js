import _ from "lodash";

class PokerHand {
  constructor(hand) {
    this.hand = this.parseHand(hand);
    this.handRank = this.storeHand(this.hand, null);

    this.isHighCard(this.hand);
    this.isPair(this.hand);
    this.isTwoPair(this.hand);
    this.isThreeOfAKInd(this.hand);
    this.isStraight(this.hand);
    this.isFlush(this.hand);
    this.isFullHouse(this.hand);
    this.isFourOfAKind(this.hand);
    this.isStraightFlush(this.hand);
    this.isRoyalFlush(this.hand);
  }

  // break up intitial hand string into objects containing card value, suit and score
  parseHand = (hand) => {
    const cardValues = [
      { A: 14 },
      { K: 13 },
      { Q: 12 },
      { J: 11 },
      { 10: 10 },
      { 9: 9 },
      { 8: 8 },
      { 7: 7 },
      { 6: 6 },
      { 5: 5 },
      { 4: 4 },
      { 3: 3 },
      { 2: 2 },
    ];

    const parsedHand = hand.split(" ").map((card) => {
      const suit = card.slice(-1);
      const value = card.slice(0, -1);
      const matchValue = cardValues.find((cardValue) => {
        return Object.keys(cardValue)[0] === value;
      });

      return { value, suit, score: Object.values(matchValue)[0] };
    });

    const sortedHand = this.sortHand(parsedHand);

    return sortedHand;
  };

  // sort the hand into sequential order based on the individial card score
  sortHand = (hand) => {
    const sortedHand = hand.sort((a, b) => b.score - a.score);

    return sortedHand;
  };

  // find the cards in the hand that have the highest individual score and return the matches as 1 array, and the remaining cards as a separate array
  findCardsWithHighestValue = (hand) => {
    const highValue = Math.max.apply(
      Math,
      hand.map((card) => card.score)
    );
    const matchingCards = hand.filter((card) => card.score === highValue);
    const remainders = hand.filter((card) => card.score !== highValue);

    return { highCards: matchingCards, restOfHand: remainders };
  };

  // total score of all cards combined
  tallyScore = (hand) => {
    const total = hand
      .map((card) => card.score)
      .reduce((accumulator, currentValue) => accumulator + currentValue);

    return total;
  };

  // update this.handRank with whatever hand you have, each hand has a score to allow for comparison
  storeHand = (hand, handName) => {
    const handRankings = [
      { RoyalFlush: 10 },
      { StraightFlush: 9 },
      { Quads: 8 },
      { FullHouse: 7 },
      { Flush: 6 },
      { Straight: 5 },
      { Trips: 4 },
      { TwoPair: 3 },
      { Pair: 2 },
      { HighCard: 1 },
    ];

    if (handName) {
      const handRank = handRankings.find(
        (rank) => Object.keys(rank)[0] === handName
      );

      this.handRank = handRank;
    }

    return this.handRank;
  };

  // pass in an array of cards that have been matched with this.findCardsWithHighestValue, and return true if the length of that array is equal to the number you pass in e.g this.isNumberOfAKind(matches, 2) if you want to check for a pair.
  isNumberOfAKind = (hand, number) => {
    const { highCards } = this.findCardsWithHighestValue(hand);
    return highCards.length === number;
  };

  isHighCard = (hand) => {
    const { highCards } = this.findCardsWithHighestValue(hand);
    const isHighCard = this.isNumberOfAKind(highCards, 1);
    isHighCard && this.storeHand(hand, "HighCard");

    return isHighCard ? hand : false;
  };

  isPair = (hand) => {
    const { highCards } = this.findCardsWithHighestValue(hand);
    const isPair = this.isNumberOfAKind(highCards, 2);

    isPair && this.storeHand(hand, "Pair");

    return isPair;
  };

  isTwoPair = (hand) => {
    const { highCards, restOfHand } = this.findCardsWithHighestValue(hand);
    const isTwoPair =
      this.isNumberOfAKind(highCards, 2) && this.isNumberOfAKind(restOfHand, 2);

    isTwoPair && this.storeHand(hand, "TwoPair");

    return isTwoPair;
  };

  isThreeOfAKInd = (hand) => {
    const { highCards, restOfHand } = this.findCardsWithHighestValue(hand);
    const isThreeOfAKInd =
      this.isNumberOfAKind(highCards, 3) || this.isNumberOfAKind(restOfHand, 3);

    isThreeOfAKInd && this.storeHand(hand, "Trips");

    return isThreeOfAKInd;
  };

  isStraight = (hand) => {
    const handCopy = _.cloneDeep(hand);

    if (handCopy[0].score === 14 && handCopy[handCopy.length - 1].score === 2) {
      handCopy.push(handCopy.shift());
      handCopy[handCopy.length - 1].score = 1;
    }

    const isStraight = handCopy.every((card, i) => {
      return (
        i === handCopy.length - 1 || card.score - handCopy[i + 1].score === 1
      );
    });

    isStraight && this.storeHand(hand, "Straight");

    return isStraight;
  };

  isFlush = (hand) => {
    const allArrayItemsAreEqual = hand.every(
      (card, i, arr) => card.suit === arr[0].suit
    );

    const isFlush = allArrayItemsAreEqual;

    isFlush && this.storeHand(hand, "Flush");

    return isFlush;
  };

  isFullHouse = (hand) => {
    const { highCards, restOfHand } = this.findCardsWithHighestValue(hand);
    const isPair =
      this.isNumberOfAKind(highCards, 2) || this.isNumberOfAKind(restOfHand, 2);
    const isTrips =
      this.isNumberOfAKind(highCards, 3) || this.isNumberOfAKind(restOfHand, 3);

    const isFullHouse = isPair && isTrips;

    isFullHouse && this.storeHand(hand, "FullHouse");

    return isFullHouse;
  };

  isFourOfAKind = (hand) => {
    const { highCards } = this.findCardsWithHighestValue(hand);
    const isFourOfAKind = this.isNumberOfAKind(highCards, 4);

    isFourOfAKind && this.storeHand(hand, "Quads");

    return isFourOfAKind;
  };

  isStraightFlush = (hand) => {
    const isStraightFlush = this.isStraight(hand) && this.isFlush(hand);

    isStraightFlush && this.storeHand(hand, "StraightFlush");

    return isStraightFlush;
  };

  isRoyalFlush = (hand) => {
    const total = this.tallyScore(hand);
    const isRoyalFlush = this.isStraightFlush(hand) && total === 60;

    isRoyalFlush && this.storeHand(hand, "RoyalFlush");

    return isRoyalFlush;
  };

  compareWith = (comparison) => {
    const hand1Total = this.tallyScore(this.hand);
    const hand2Total = this.tallyScore(comparison.hand);

    const hand1Score = Object.values(this.handRank)[0];
    const hand2Score = Object.values(comparison.handRank)[0];

    if (hand1Score === hand2Score) {
      console.log("tiebreak");
      if (hand1Total > hand2Total) {
        console.log("tie win");
        return Result.WIN;
      } else if (hand1Total < hand2Total) {
        console.log("tie loss");
        return Result.LOSS;
      }
      return Result.TIE;
    } else if (hand1Score > hand2Score) {
      console.log("win");
      return Result.WIN;
    }
    console.log("loss");
    return Result.LOSS;
  };
}

export const Result = {
  WIN: 1,
  LOSS: 2,
  TIE: 3,
};

export default PokerHand;
