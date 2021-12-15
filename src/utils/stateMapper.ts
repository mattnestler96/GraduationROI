const stateMap: Record<string, string> = {
  CALIFORNIA: "CA",
  MARYLAND: "MD",
  KANSAS: "KS",
  MISSOURI: "MO",
  NEVADA: "NV",
  NEBRASKA: "NE",
  COLORADO: "CO",
  ARIZONA: "AZ",
  ALASKA: "AK",
  IOWA: "IA",
  ALABAMA: "AL",
};

const stateMapper = (state?: string): string => {
  return stateMap[state || ""];
};
export default stateMapper;
