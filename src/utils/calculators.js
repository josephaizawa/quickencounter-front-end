var roundNearQtr = function (number) {
  return (Math.round(number * 4) / 4).toFixed(2);
};

var roundNearQtr = function (number) {
  if (number < 0.5) {
    return (Math.round(number * 4) / 4).toFixed(2);
  } else {
    return Math.round(number);
  }
};

function calculateDifficultCR(partyLevel, partyMembers) {
  if (partyLevel <= partyMembers * 4) {
    return roundNearQtr(partyLevel / 4);
  } else if (partyLevel < partyMembers * 5) {
    return roundNearQtr(partyLevel / 3);
  } else {
    return roundNearQtr(partyLevel / 2);
  }
}

function calculateBoss(cr) {
  let boss = roundNearQtr(cr / 2);
  return boss;
}

function calculateMinion(cr, party) {
  let minion = roundNearQtr(cr / (party + 1));
  console.log(minion);
  console.log(party);
  return minion;
}

function calculateOne(cr) {
  let one = roundNearQtr(cr);
  return one;
}

export { calculateDifficultCR, calculateBoss, calculateMinion, calculateOne };
