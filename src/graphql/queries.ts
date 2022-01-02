/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($id: ID!) {
    getUserInfo(id: $id) {
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
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUserInfos = /* GraphQL */ `
  query SyncUserInfos(
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getROI = /* GraphQL */ `
  query GetROI($id: ID!) {
    getROI(id: $id) {
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
export const listROIS = /* GraphQL */ `
  query ListROIS(
    $filter: ModelROIFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listROIS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncROIS = /* GraphQL */ `
  query SyncROIS(
    $filter: ModelROIFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncROIS(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
