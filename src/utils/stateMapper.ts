const stateMap: Record<string, string> = {
  CALIFORNIA: "CA",
};

const stateMapper = (state?: string): string => {
  return stateMap[state || ""];
};
export default stateMapper;
