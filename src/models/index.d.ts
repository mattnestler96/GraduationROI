import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserInfoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ROIMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UserInfo {
  readonly id: string;
  readonly email?: string;
  readonly dayPreferences?: string;
  readonly timePreferences?: string;
  readonly location?: string;
  readonly modalityPreferences?: string;
  readonly userType?: string;
  readonly viewHistory?: string;
  readonly searchHistory?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserInfo, UserInfoMetaData>);
  static copyOf(source: UserInfo, mutator: (draft: MutableModel<UserInfo, UserInfoMetaData>) => MutableModel<UserInfo, UserInfoMetaData> | void): UserInfo;
}

export declare class ROI {
  readonly id: string;
  readonly institutionName?: string;
  readonly programName?: string;
  readonly unitId?: number;
  readonly stateFIPSCode?: number;
  readonly state?: string;
  readonly programCIPCode?: number;
  readonly programCategory?: string;
  readonly control?: string;
  readonly carnegieClassification2015?: string;
  readonly admissionsRate?: number;
  readonly credentialLevel?: number;
  readonly credentialLevelDescription?: string;
  readonly collegeScorecardCohortCount?: number;
  readonly annualNetTuitionCost?: number;
  readonly fourYearNetTuitionCost?: number;
  readonly annualEducationRelatedSpending?: number;
  readonly shareOfStudentWhoGraduateIn4Years?: number;
  readonly shareOfStudentWhoGraduateIn5Years?: number;
  readonly shareOfStudentWhoGraduateIn6Years?: number;
  readonly shareOfStudentWhoTransferOutIn6Years?: number;
  readonly shareOfStudentWhoRemainIn6Years?: number;
  readonly shareOfStudentWhoNoLongerEnrolledIn6Years?: number;
  readonly absoluteIncreaseInLifetimeEarnings?: number;
  readonly percentageIncreaseInLifetimeEarnings?: string;
  readonly lifetimeReturnOnInvestmentROI?: number;
  readonly ageAtWhichROITurnsPositive?: number;
  readonly rankOfProgramByROI?: number;
  readonly ROIIfStudentTakes5YearsToGraduate?: number;
  readonly ROIIfStudentTakes6YearsToGraduate?: number;
  readonly ROIIfStudentDropsBeforeGraduating?: number;
  readonly ROIWeightedByInstitutionsCompletionOutcomes?: number;
  readonly ROIBasedOnInstitutionsEducationRelatedSpending?: number;
  readonly ROIBasedOnInstitutionsEducationRelatedSpending5years?: number;
  readonly ROIBasedOnInstitutionsEducationRelatedSpending6Years?: number;
  readonly ROIBasedOnInstitutionsEducationRelatedSpendingDrops?: number;
  readonly ROIBasedOnInstitutionsEducationRelatedSpendingCompletionOutcomes?: number;
  readonly estimatedEarnings23?: number;
  readonly estimatedEarnings26?: number;
  readonly estimatedEarnings29?: number;
  readonly estimatedEarnings32?: number;
  readonly estimatedEarnings35?: number;
  readonly estimatedEarnings38?: number;
  readonly estimatedEarnings41?: number;
  readonly estimatedEarnings44?: number;
  readonly estimatedEarnings47?: number;
  readonly estimatedEarnings50?: number;
  readonly estimatedEarnings53?: number;
  readonly estimatedEarnings56?: number;
  readonly estimatedEarnings59?: number;
  readonly estimatedEarnings62?: number;
  readonly estimatedCounterfactualEarnings19?: number;
  readonly estimatedCounterfactualEarnings21?: number;
  readonly estimatedCounterfactualEarnings23?: number;
  readonly estimatedCounterfactualEarnings26?: number;
  readonly estimatedCounterfactualEarnings29?: number;
  readonly estimatedCounterfactualEarnings32?: number;
  readonly estimatedCounterfactualEarnings35?: number;
  readonly estimatedCounterfactualEarnings38?: number;
  readonly estimatedCounterfactualEarnings41?: number;
  readonly estimatedCounterfactualEarnings44?: number;
  readonly estimatedCounterfactualEarnings47?: number;
  readonly estimatedCounterfactualEarnings50?: number;
  readonly estimatedCounterfactualEarnings53?: number;
  readonly estimatedCounterfactualEarnings56?: number;
  readonly estimatedCounterfactualEarnings59?: number;
  readonly estimatedCounterfactualEarnings62?: number;
  readonly resultsAvailableForAllSpecifications?: number;
  readonly fourYearEducationRelatedSpending?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ROI, ROIMetaData>);
  static copyOf(source: ROI, mutator: (draft: MutableModel<ROI, ROIMetaData>) => MutableModel<ROI, ROIMetaData> | void): ROI;
}