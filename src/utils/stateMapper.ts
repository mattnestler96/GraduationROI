const stateMap: Record<string, string> = {
  CALIFORNIA: "CA",
  MARYLAND: "MD",
  KANSAS: "KS",
  MISSOURI: "MO",
  COLORADO: "CO",
};

const stateMapper = (state?: string): string => {
  return stateMap[state || ""];
};
export default stateMapper;
