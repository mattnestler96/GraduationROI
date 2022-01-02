/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
      id
      email
      dayPreferences
      timePreferences
      location
      modalityPreferences
      userType
      viewHistory
      searchHistory
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
      id
      email
      dayPreferences
      timePreferences
      location
      modalityPreferences
      userType
      viewHistory
      searchHistory
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
      id
      email
      dayPreferences
      timePreferences
      location
      modalityPreferences
      userType
      viewHistory
      searchHistory
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createROI = /* GraphQL */ `
  mutation CreateROI(
    $input: CreateROIInput!
    $condition: ModelROIConditionInput
  ) {
    createROI(input: $input, condition: $condition) {
      id
      uniqueId
      state
      institutionName
      programName
      unitId
      stateFIPSCode
      programCIPCode
      programCategory
      control
      carnegieClassification2015
      admissionsRate
      credentialLevel
      credentialLevelDescription
      collegeScorecardCohortCount
      annualNetTuitionCost
      fourYearNetTuitionCost
      annualEducationRelatedSpending
      shareOfStudentWhoGraduateIn4Years
      shareOfStudentWhoGraduateIn5Years
      shareOfStudentWhoGraduateIn6Years
      shareOfStudentWhoTransferOutIn6Years
      shareOfStudentWhoRemainIn6Years
      shareOfStudentWhoNoLongerEnrolledIn6Years
      absoluteIncreaseInLifetimeEarnings
      percentageIncreaseInLifetimeEarnings
      lifetimeReturnOnInvestmentROI
      ageAtWhichROITurnsPositive
      rankOfProgramByROI
      ROIIfStudentTakes5YearsToGraduate
      ROIIfStudentTakes6YearsToGraduate
      ROIIfStudentDropsBeforeGraduating
      ROIWeightedByInstitutionsCompletionOutcomes
      ROIBasedOnInstitutionsEducationRelatedSpending
      ROIBasedOnInstitutionsEducationRelatedSpending5years
      ROIBasedOnInstitutionsEducationRelatedSpending6Years
      ROIBasedOnInstitutionsEducationRelatedSpendingDrops
      ROIBasedOnInstitutionsEducationRelatedSpendingCompletionOutcomes
      estimatedEarnings23
      estimatedEarnings26
      estimatedEarnings29
      estimatedEarnings32
      estimatedEarnings35
      estimatedEarnings38
      estimatedEarnings41
      estimatedEarnings44
      estimatedEarnings47
      estimatedEarnings50
      estimatedEarnings53
      estimatedEarnings56
      estimatedEarnings59
      estimatedEarnings62
      estimatedCounterfactualEarnings19
      estimatedCounterfactualEarnings21
      estimatedCounterfactualEarnings23
      estimatedCounterfactualEarnings26
      estimatedCounterfactualEarnings29
      estimatedCounterfactualEarnings32
      estimatedCounterfactualEarnings35
      estimatedCounterfactualEarnings38
      estimatedCounterfactualEarnings41
      estimatedCounterfactualEarnings44
      estimatedCounterfactualEarnings47
      estimatedCounterfactualEarnings50
      estimatedCounterfactualEarnings53
      estimatedCounterfactualEarnings56
      estimatedCounterfactualEarnings59
      estimatedCounterfactualEarnings62
      resultsAvailableForAllSpecifications
      fourYearEducationRelatedSpending
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateROI = /* GraphQL */ `
  mutation UpdateROI(
    $input: UpdateROIInput!
    $condition: ModelROIConditionInput
  ) {
    updateROI(input: $input, condition: $condition) {
      id
      uniqueId
      state
      institutionName
      programName
      unitId
      stateFIPSCode
      programCIPCode
      programCategory
      control
      carnegieClassification2015
      admissionsRate
      credentialLevel
      credentialLevelDescription
      collegeScorecardCohortCount
      annualNetTuitionCost
      fourYearNetTuitionCost
      annualEducationRelatedSpending
      shareOfStudentWhoGraduateIn4Years
      shareOfStudentWhoGraduateIn5Years
      shareOfStudentWhoGraduateIn6Years
      shareOfStudentWhoTransferOutIn6Years
      shareOfStudentWhoRemainIn6Years
      shareOfStudentWhoNoLongerEnrolledIn6Years
      absoluteIncreaseInLifetimeEarnings
      percentageIncreaseInLifetimeEarnings
      lifetimeReturnOnInvestmentROI
      ageAtWhichROITurnsPositive
      rankOfProgramByROI
      ROIIfStudentTakes5YearsToGraduate
      ROIIfStudentTakes6YearsToGraduate
      ROIIfStudentDropsBeforeGraduating
      ROIWeightedByInstitutionsCompletionOutcomes
      ROIBasedOnInstitutionsEducationRelatedSpending
      ROIBasedOnInstitutionsEducationRelatedSpending5years
      ROIBasedOnInstitutionsEducationRelatedSpending6Years
      ROIBasedOnInstitutionsEducationRelatedSpendingDrops
      ROIBasedOnInstitutionsEducationRelatedSpendingCompletionOutcomes
      estimatedEarnings23
      estimatedEarnings26
      estimatedEarnings29
      estimatedEarnings32
      estimatedEarnings35
      estimatedEarnings38
      estimatedEarnings41
      estimatedEarnings44
      estimatedEarnings47
      estimatedEarnings50
      estimatedEarnings53
      estimatedEarnings56
      estimatedEarnings59
      estimatedEarnings62
      estimatedCounterfactualEarnings19
      estimatedCounterfactualEarnings21
      estimatedCounterfactualEarnings23
      estimatedCounterfactualEarnings26
      estimatedCounterfactualEarnings29
      estimatedCounterfactualEarnings32
      estimatedCounterfactualEarnings35
      estimatedCounterfactualEarnings38
      estimatedCounterfactualEarnings41
      estimatedCounterfactualEarnings44
      estimatedCounterfactualEarnings47
      estimatedCounterfactualEarnings50
      estimatedCounterfactualEarnings53
      estimatedCounterfactualEarnings56
      estimatedCounterfactualEarnings59
      estimatedCounterfactualEarnings62
      resultsAvailableForAllSpecifications
      fourYearEducationRelatedSpending
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteROI = /* GraphQL */ `
  mutation DeleteROI(
    $input: DeleteROIInput!
    $condition: ModelROIConditionInput
  ) {
    deleteROI(input: $input, condition: $condition) {
      id
      uniqueId
      state
      institutionName
      programName
      unitId
      stateFIPSCode
      programCIPCode
      programCategory
      control
      carnegieClassification2015
      admissionsRate
      credentialLevel
      credentialLevelDescription
      collegeScorecardCohortCount
      annualNetTuitionCost
      fourYearNetTuitionCost
      annualEducationRelatedSpending
      shareOfStudentWhoGraduateIn4Years
      shareOfStudentWhoGraduateIn5Years
      shareOfStudentWhoGraduateIn6Years
      shareOfStudentWhoTransferOutIn6Years
      shareOfStudentWhoRemainIn6Years
      shareOfStudentWhoNoLongerEnrolledIn6Years
      absoluteIncreaseInLifetimeEarnings
      percentageIncreaseInLifetimeEarnings
      lifetimeReturnOnInvestmentROI
      ageAtWhichROITurnsPositive
      rankOfProgramByROI
      ROIIfStudentTakes5YearsToGraduate
      ROIIfStudentTakes6YearsToGraduate
      ROIIfStudentDropsBeforeGraduating
      ROIWeightedByInstitutionsCompletionOutcomes
      ROIBasedOnInstitutionsEducationRelatedSpending
      ROIBasedOnInstitutionsEducationRelatedSpending5years
      ROIBasedOnInstitutionsEducationRelatedSpending6Years
      ROIBasedOnInstitutionsEducationRelatedSpendingDrops
      ROIBasedOnInstitutionsEducationRelatedSpendingCompletionOutcomes
      estimatedEarnings23
      estimatedEarnings26
      estimatedEarnings29
      estimatedEarnings32
      estimatedEarnings35
      estimatedEarnings38
      estimatedEarnings41
      estimatedEarnings44
      estimatedEarnings47
      estimatedEarnings50
      estimatedEarnings53
      estimatedEarnings56
      estimatedEarnings59
      estimatedEarnings62
      estimatedCounterfactualEarnings19
      estimatedCounterfactualEarnings21
      estimatedCounterfactualEarnings23
      estimatedCounterfactualEarnings26
      estimatedCounterfactualEarnings29
      estimatedCounterfactualEarnings32
      estimatedCounterfactualEarnings35
      estimatedCounterfactualEarnings38
      estimatedCounterfactualEarnings41
      estimatedCounterfactualEarnings44
      estimatedCounterfactualEarnings47
      estimatedCounterfactualEarnings50
      estimatedCounterfactualEarnings53
      estimatedCounterfactualEarnings56
      estimatedCounterfactualEarnings59
      estimatedCounterfactualEarnings62
      resultsAvailableForAllSpecifications
      fourYearEducationRelatedSpending
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
