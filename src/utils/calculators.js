var roundNearQtr = function (number) {
  return (Math.round(number * 4) / 4).toFixed(2);
};

var roundNearQtr = function (number) {
  if (number < 1) {
    return (Math.round(number * 4) / 4).toFixed(2);
  } else {
    return Math.round(number);
  }
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

function calculateOne(cr) {
  let one = roundNearQtr(cr);
  return one;
}

export { calculateDifficultCR, calculateBoss, calculateMinion, calculateOne };
