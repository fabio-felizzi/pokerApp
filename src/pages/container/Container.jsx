import React from "react";
import StyledContainer from "StyledComponents/StyledContainer";
import PokerHand from "../../components/PokerHand";

const Container = () => (
  <StyledContainer className="grid-container">
    <div className="page-title">
      <PokerHand />
    </div>
  </StyledContainer>
);

export default Container;
