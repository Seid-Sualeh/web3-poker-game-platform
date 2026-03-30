import React, { memo, useMemo, useCallback } from "react";

// Memoized PokerCard component to prevent unnecessary re-renders
export const MemoizedPokerCard = memo(({ card, index }) => {
  return (
    <div className="poker-card" key={index}>
      <img
        src={require(`../../assets/game/cards/${card.suit}${card.rank}.png`)}
        alt={`${card.rank} of ${card.suit}`}
        loading="lazy"
      />
    </div>
  );
});

// Memoized Seat component wrapper
export const createMemoizedSeat = (SeatComponent) => {
  return memo(({ currentTable, seatNumber, sitDown }) => {
    const seat = currentTable.seats[seatNumber];

    // Memoize derived values
    const seatData = useMemo(
      () => ({
        isEmpty: !seat,
        hasTurn: seat?.turn || false,
        lastAction: seat?.lastAction || null,
        bet: seat?.bet || 0,
        stack: seat?.stack || 0,
      }),
      [seat],
    );

    return (
      <SeatComponent
        currentTable={currentTable}
        seatNumber={seatNumber}
        sitDown={sitDown}
        seatData={seatData}
      />
    );
  });
};

// Memoized GameUI component
export const MemoizedGameUI = memo(
  ({
    currentTable,
    seatId,
    bet,
    setBet,
    raise,
    standUp,
    fold,
    check,
    call,
  }) => {
    // Memoize callback functions
    const handleFold = useCallback(() => {
      fold();
    }, [fold]);

    const handleCheck = useCallback(() => {
      check();
    }, [check]);

    const handleCall = useCallback(() => {
      call();
    }, [call]);

    const handleRaise = useCallback(() => {
      raise(bet);
    }, [raise, bet]);

    const handleBetChange = useCallback(
      (e) => {
        setBet(Number(e.target.value));
      },
      [setBet],
    );

    return <div className="game-ui">{/* Game UI implementation */}</div>;
  },
);

// Memoized InfoPill component
export const MemoizedInfoPill = memo(({ children }) => {
  return <div className="info-pill">{children}</div>;
});

// Memoized ChipsAmount component
export const MemoizedChipsAmount = memo(({ amount }) => {
  const formattedAmount = useMemo(() => {
    return amount?.toLocaleString() || "0";
  }, [amount]);

  return (
    <div className="chips-amount">
      <span className="chips-icon">💰</span>
      <span className="amount">{formattedAmount}</span>
    </div>
  );
});

// Custom hook for memoized game state
export const useMemoizedGameState = (currentTable, seatId) => {
  return useMemo(() => {
    if (!currentTable) return null;

    const seat = currentTable.seats[seatId];
    const isPlayerTurn = seat?.turn || false;
    const callAmount = currentTable.callAmount || 0;
    const minRaise = currentTable.minRaise || 0;
    const pot = currentTable.pot || 0;
    const board = currentTable.board || [];

    return {
      seat,
      isPlayerTurn,
      callAmount,
      minRaise,
      pot,
      board,
      phase: currentTable.phase,
    };
  }, [currentTable, seatId]);
};

// Custom hook for memoized player actions
export const usePlayerActions = (fold, check, call, raise) => {
  return useMemo(
    () => ({
      fold: () => fold(),
      check: () => check(),
      call: () => call(),
      raise: (amount) => raise(amount),
    }),
    [fold, check, call, raise],
  );
};

export default {
  MemoizedPokerCard,
  MemoizedGameUI,
  MemoizedInfoPill,
  MemoizedChipsAmount,
  useMemoizedGameState,
  usePlayerActions,
};
