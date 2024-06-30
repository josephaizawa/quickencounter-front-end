function calculateDifficultCR(partyLevel) {
  if (partyLevel <= 16) {
    return Math.round(partyLevel / 4);
  } else if (partyLevel < 20) {
    return Math.round(partyLevel / 3);
  } else {
    return Math.round(partyLevel / 2);
  }
}

function calculateBoss(cr) {
  let boss = Math.round(cr / 2);
  return boss;
}

function calculateMinion(cr) {
  let minion = Math.round(cr / 5);
  return boss;
}

export { calculateDifficultCR };
