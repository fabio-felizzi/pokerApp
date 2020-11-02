import PokerHand, { Result } from "./PokerHand";

describe("PokerHand", () => {
  describe("compareWith()", () => {
    it("ties", () => {
      const hand1 = new PokerHand("AC 4S 5S 8C AH");
      const hand2 = new PokerHand("4S 5S 8C AS AD");

      expect(hand1.compareWith(hand2)).toBe(Result.TIE);
    });

    it("wins", () => {
      const hand1 = new PokerHand("AC AS 5S 8C AH");
      const hand2 = new PokerHand("4S 5S 8C AS AD");

      expect(hand1.compareWith(hand2)).toBe(Result.WIN);
    });

    it("loses", () => {
      const hand1 = new PokerHand("2C 4S 5S 8C AH");
      const hand2 = new PokerHand("4S 5S 8C AS AD");

      expect(hand1.compareWith(hand2)).toBe(Result.LOSS);
    });

    it("wins based on kicker", () => {
      const hand1 = new PokerHand("10C 10S 5S 8C AH");
      const hand2 = new PokerHand("10S 10S 8C 5S QD");

      expect(hand1.compareWith(hand2)).toBe(Result.WIN);
    });

    it("loses based on kicker", () => {
      const hand1 = new PokerHand("10C 10S 5S 8C QH");
      const hand2 = new PokerHand("10S 10S 8C 5S AD");

      expect(hand1.compareWith(hand2)).toBe(Result.LOSS);
    });
  });
});
