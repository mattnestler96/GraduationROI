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
  ARKANSAS: "AR",
  IOWA: "IA",
  ALABAMA: "AL",
  TEXAS: "TX",
  GEORGIA: "GA",
  LOUISIANA: "LA",
  "NEW JERSEY": "NJ",
  PENNSYLVANIA: "PA",
};

const stateMapper = (state?: string): string => {
  return stateMap[state || ""];
};
export default stateMapper;
