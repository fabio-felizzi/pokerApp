/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
export class PokerHand {
  compareWith() {
    return Result.TIE;
  }
}

export const Result = {
  WIN: 1,
  LOSS: 2,
  TIE: 3,
};

export default PokerHand;
