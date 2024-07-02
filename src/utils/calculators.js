var roundNearQtr = function (number) {
  return (Math.round(number * 4) / 4).toFixed(2);
};

function calculateDifficultCR(partyLevel) {
  if (partyLevel <= 16) {
    return roundNearQtr(partyLevel / 4);
  } else if (partyLevel < 20) {
    return roundNearQtr(partyLevel / 3);
  } else {
    return roundNearQtr(partyLevel / 2);
  }
}

function calculateBoss(cr) {
  let boss = roundNearQtr(cr / 2);
  return boss;
}

function calculateMinion(cr) {
  let minion = roundNearQtr(cr / 5);
  return minion;
}

export { calculateDifficultCR, calculateBoss, calculateMinion };
