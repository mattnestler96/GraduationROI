export const schema = {
    "models": {
        "UserInfo": {
            "name": "UserInfo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "dayPreferences": {
                    "name": "dayPreferences",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "timePreferences": {
                    "name": "timePreferences",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "modalityPreferences": {
                    "name": "modalityPreferences",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "userType": {
                    "name": "userType",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "viewHistory": {
                    "name": "viewHistory",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "searchHistory": {
                    "name": "searchHistory",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "UserInfos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admins"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        },
        "ROI": {
            "name": "ROI",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "uniqueId": {
                    "name": "uniqueId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "state": {
                    "name": "state",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "institutionName": {
                    "name": "institutionName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "programName": {
                    "name": "programName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "unitId": {
                    "name": "unitId",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "stateFIPSCode": {
                    "name": "stateFIPSCode",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "programCIPCode": {
                    "name": "programCIPCode",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "programCategory": {
                    "name": "programCategory",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "control": {
                    "name": "control",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "carnegieClassification2015": {
                    "name": "carnegieClassification2015",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "admissionsRate": {
                    "name": "admissionsRate",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "credentialLevel": {
                    "name": "credentialLevel",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "credentialLevelDescription": {
                    "name": "credentialLevelDescription",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "collegeScorecardCohortCount": {
                    "name": "collegeScorecardCohortCount",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "annualNetTuitionCost": {
                    "name": "annualNetTuitionCost",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "fourYearNetTuitionCost": {
                    "name": "fourYearNetTuitionCost",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "annualEducationRelatedSpending": {
                    "name": "annualEducationRelatedSpending",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "shareOfStudentWhoGraduateIn4Years": {
                    "name": "shareOfStudentWhoGraduateIn4Years",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "shareOfStudentWhoGraduateIn5Years": {
                    "name": "shareOfStudentWhoGraduateIn5Years",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "shareOfStudentWhoGraduateIn6Years": {
                    "name": "shareOfStudentWhoGraduateIn6Years",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "shareOfStudentWhoTransferOutIn6Years": {
                    "name": "shareOfStudentWhoTransferOutIn6Years",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "shareOfStudentWhoRemainIn6Years": {
                    "name": "shareOfStudentWhoRemainIn6Years",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "shareOfStudentWhoNoLongerEnrolledIn6Years": {
                    "name": "shareOfStudentWhoNoLongerEnrolledIn6Years",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "absoluteIncreaseInLifetimeEarnings": {
                    "name": "absoluteIncreaseInLifetimeEarnings",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "percentageIncreaseInLifetimeEarnings": {
                    "name": "percentageIncreaseInLifetimeEarnings",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lifetimeReturnOnInvestmentROI": {
                    "name": "lifetimeReturnOnInvestmentROI",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ageAtWhichROITurnsPositive": {
                    "name": "ageAtWhichROITurnsPositive",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "rankOfProgramByROI": {
                    "name": "rankOfProgramByROI",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIIfStudentTakes5YearsToGraduate": {
                    "name": "ROIIfStudentTakes5YearsToGraduate",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIIfStudentTakes6YearsToGraduate": {
                    "name": "ROIIfStudentTakes6YearsToGraduate",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIIfStudentDropsBeforeGraduating": {
                    "name": "ROIIfStudentDropsBeforeGraduating",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIWeightedByInstitutionsCompletionOutcomes": {
                    "name": "ROIWeightedByInstitutionsCompletionOutcomes",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIBasedOnInstitutionsEducationRelatedSpending": {
                    "name": "ROIBasedOnInstitutionsEducationRelatedSpending",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIBasedOnInstitutionsEducationRelatedSpending5years": {
                    "name": "ROIBasedOnInstitutionsEducationRelatedSpending5years",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIBasedOnInstitutionsEducationRelatedSpending6Years": {
                    "name": "ROIBasedOnInstitutionsEducationRelatedSpending6Years",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIBasedOnInstitutionsEducationRelatedSpendingDrops": {
                    "name": "ROIBasedOnInstitutionsEducationRelatedSpendingDrops",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "ROIBasedOnInstitutionsEducationRelatedSpendingCompletionOutcomes": {
                    "name": "ROIBasedOnInstitutionsEducationRelatedSpendingCompletionOutcomes",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings23": {
                    "name": "estimatedEarnings23",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings26": {
                    "name": "estimatedEarnings26",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings29": {
                    "name": "estimatedEarnings29",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings32": {
                    "name": "estimatedEarnings32",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings35": {
                    "name": "estimatedEarnings35",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings38": {
                    "name": "estimatedEarnings38",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings41": {
                    "name": "estimatedEarnings41",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings44": {
                    "name": "estimatedEarnings44",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings47": {
                    "name": "estimatedEarnings47",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings50": {
                    "name": "estimatedEarnings50",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings53": {
                    "name": "estimatedEarnings53",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings56": {
                    "name": "estimatedEarnings56",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings59": {
                    "name": "estimatedEarnings59",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedEarnings62": {
                    "name": "estimatedEarnings62",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings19": {
                    "name": "estimatedCounterfactualEarnings19",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings21": {
                    "name": "estimatedCounterfactualEarnings21",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings23": {
                    "name": "estimatedCounterfactualEarnings23",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings26": {
                    "name": "estimatedCounterfactualEarnings26",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings29": {
                    "name": "estimatedCounterfactualEarnings29",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings32": {
                    "name": "estimatedCounterfactualEarnings32",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings35": {
                    "name": "estimatedCounterfactualEarnings35",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings38": {
                    "name": "estimatedCounterfactualEarnings38",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings41": {
                    "name": "estimatedCounterfactualEarnings41",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings44": {
                    "name": "estimatedCounterfactualEarnings44",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings47": {
                    "name": "estimatedCounterfactualEarnings47",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings50": {
                    "name": "estimatedCounterfactualEarnings50",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings53": {
                    "name": "estimatedCounterfactualEarnings53",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings56": {
                    "name": "estimatedCounterfactualEarnings56",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings59": {
                    "name": "estimatedCounterfactualEarnings59",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "estimatedCounterfactualEarnings62": {
                    "name": "estimatedCounterfactualEarnings62",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "resultsAvailableForAllSpecifications": {
                    "name": "resultsAvailableForAllSpecifications",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "fourYearEducationRelatedSpending": {
                    "name": "fourYearEducationRelatedSpending",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ROIS",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "stateByUniqueId",
                        "fields": [
                            "state",
                            "uniqueId"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admins"
                                ],
                                "operations": [
                                    "read",
                                    "create",
                                    "update",
                                    "delete"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "dbba4329a502596a477af4cfb88441ea"
};