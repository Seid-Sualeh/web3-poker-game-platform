import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import "./CardAnimation.scss";
import { useSound } from "../../context/sound/SoundContext";

// Card dealing animation
const dealCard = keyframes`
  0% {
    transform: translate(-200px, -100px) rotate(-180deg) scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
    opacity: 1;
  }
`;

// Card flip animation
const flipCard = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;

// Chip animation
const chipMove = keyframes`
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
  }
`;

// Win celebration
const celebrate = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1) rotate(-5deg);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(1.1) rotate(5deg);
  }
`;

const AnimatedCard = styled.div`
  animation: ${dealCard} 0.5s ease-out forwards;
  animation-delay: ${(props) => props.delay || "0s"};
  opacity: 0;
`;

const FlippingCard = styled.div`
  animation: ${flipCard} 0.6s ease-in-out;
  transform-style: preserve-3d;
`;

const AnimatedChip = styled.div`
  animation: ${chipMove} 0.3s ease-out;
`;

const WinningHand = styled.div`
  animation: ${celebrate} 0.5s ease-in-out 3;
`;

export const CardWithAnimation = ({ card, delay, children }) => (
  <AnimatedCard delay={delay}>{children}</AnimatedCard>
);

export const CardFlip = ({ children }) => (
  <FlippingCard>{children}</FlippingCard>
);

export const ChipAnimation = ({ children }) => (
  <AnimatedChip>{children}</AnimatedChip>
);

export const WinCelebration = ({ children }) => (
  <WinningHand>{children}</WinningHand>
);

// Card dealing container with staggered animation
export const CardDealContainer = ({ cards, renderCard }) => {
  const { playSound } = useSound();

  useEffect(() => {
    // Play card deal sound when cards are dealt
    if (cards && cards.length > 0) {
      playSound("cardDeal");
    }
  }, [cards, playSound]);

  return (
    <div className="card-deal-container">
      {cards.map((card, index) => (
        <AnimatedCard key={index} delay={`${index * 0.15}s`}>
          {renderCard(card, index)}
        </AnimatedCard>
      ))}
    </div>
  );
};

// Pot animation component
export const PotAnimation = ({ amount, isWinning }) => {
  return (
    <div className={`pot-container ${isWinning ? "winning" : ""}`}>
      <AnimatedChip>
        <span className="pot-amount">{amount.toLocaleString()}</span>
      </AnimatedChip>
    </div>
  );
};

// Winner announcement overlay
export const WinnerAnnouncement = ({ winnerName, amount, handRank }) => {
  const { playSound } = useSound();

  useEffect(() => {
    // Play win sound when winner is announced
    playSound("win");
  }, [playSound]);

  return (
    <div className="winner-overlay">
      <WinningHand>
        <div className="winner-content">
          <div className="winner-icon">🏆</div>
          <h2>{winnerName} Wins!</h2>
          <p className="win-amount">+{amount.toLocaleString()} chips</p>
          <p className="hand-rank">{handRank}</p>
        </div>
      </WinningHand>
    </div>
  );
};

export default {
  CardWithAnimation,
  CardFlip,
  ChipAnimation,
  WinCelebration,
  CardDealContainer,
  PotAnimation,
  WinnerAnnouncement,
};
