function calculateDifficultCR(partyLevel) {
  if (partyLevel <= 16) {
    return Math.round(partyLevel / 4);
  } else if (partyLevel < 20) {
    return Math.round(partyLevel / 3);
  } else {
    return Math.round(partyLevel / 2);
  }
}

export { calculateDifficultCR };
