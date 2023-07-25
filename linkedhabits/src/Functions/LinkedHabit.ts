export const CARD_GAP = 15;

export const PositionToColor = (
  index: number,
  current: number,
  workingOn: number
) => {
  if (index <= current) {
    return "#1497F0";
  }
  if (workingOn === index) {
    return "#00DFA2";
  }
  return "#9BABB8";
};
