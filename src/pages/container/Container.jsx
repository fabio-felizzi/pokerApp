import React from "react";
import StyledContainer from "StyledComponents/StyledContainer";
import PokerHand from "../../components/PokerHand";

const Container = () => {
  const compare = () => {
    const hand1 = new PokerHand("QC QH QD AH 9C");
    const hand2 = new PokerHand("QC QH QD AH 10C");
    hand1.compareWith(hand2);
  };
  return (
    <StyledContainer className="grid-container">
      <div className="page-title">
        <button onClick={() => compare()}>Generate Hand</button>
      </div>
    </StyledContainer>
  );
};

export default Container;
