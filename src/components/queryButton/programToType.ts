const programs = {
  "Fine and Studio Arts.": "Visual Arts and Music",
  "Teacher Education and Professional Development, Specific Levels and Methods.":
    "Education",
  "Political Science and Government.": "Social Sciences excluding Economics",
  "Mathematics.": "Mathematics and Statistics",
  "Drama/Theatre Arts and Stagecraft.": "Visual Arts and Music",
  "Computer and Information Sciences, General.":
    "Computer and Information Sciences",
  "Philosophy.": "Philosophy and Religious Studies",
  "Physiology, Pathology and Related Sciences.": "Life Sciences and Biology",
  "Chemistry.": "Physical Sciences",
  "Film/Video and Photographic Arts.": "Visual Arts and Music",
  "Management Sciences and Quantitative Methods.": "Business and Management",
  "Psychology, General.": "Psychology",
  "Health and Medical Administrative Services.": "Health and Nursing",
  "Agricultural Business and Management.": "Agriculture and Natural Resources",
  "Journalism.": "Communications and Journalism",
  "Design and Applied Arts.": "Visual Arts and Music",
  "Mechanical Engineering.": "Engineering",
  "Criminal Justice and Corrections.":
    "Public Administration and Human Services",
  "Ethnic, Cultural Minority, Gender, and Group Studies.":
    "Social Sciences excluding Economics",
  "Romance Languages, Literatures, and Linguistics.": "Miscellaneous",
  "Architecture.": "Transportation, Construction, and Architecture",
  "Computer Science.": "Computer and Information Sciences",
  "Geological and Earth Sciences/Geosciences.": "Physical Sciences",
  "Engineering Science.": "Engineering",
  "Agricultural Engineering.": "Engineering",
  "Computer Engineering.": "Engineering",
  "History.": "English, Liberal Arts, and Humanities",
  "Health Services/Allied Health/Health Sciences, General.":
    "Health and Nursing",
  "Human Resources Management and Services.": "Business and Management",
  "Rhetoric and Composition/Writing Studies.":
    "English, Liberal Arts, and Humanities",
  "Physics.": "Physical Sciences",
  "Nutrition Sciences.": "Miscellaneous",
  "Architectural Sciences and Technology.":
    "Transportation, Construction, and Architecture",
  "Sociology.": "Social Sciences excluding Economics",
  "Biochemistry, Biophysics and Molecular Biology.":
    "Life Sciences and Biology",
  "Human Development, Family Studies, and Related Services.": "Miscellaneous",
  "Marketing.": "Business and Management",
  "Behavioral Sciences.": "Miscellaneous",
  "Classical and Ancient Studies.": "Miscellaneous",
  "Music.": "Visual Arts and Music",
  "Electrical, Electronics and Communications Engineering.": "Engineering",
  "Cell/Cellular Biology and Anatomical Sciences.": "Life Sciences and Biology",
  "Area Studies.": "Social Sciences excluding Economics",
  "Industrial Engineering.": "Engineering",
  "Health and Physical Education/Fitness.":
    "Public Administration and Human Services",
  "Intercultural/Multicultural and Diversity Studies.": "Miscellaneous",
  "Teacher Education and Professional Development, Specific Subject Areas.":
    "Education",
  "Linguistic, Comparative, and Related Language Studies and Services.":
    "Miscellaneous",
  "Urban Studies/Affairs.": "Social Sciences excluding Economics",
  "Forestry.": "Agriculture and Natural Resources",
  "Business Administration, Management and Operations.":
    "Business and Management",
  "Economics.": "Economics",
  "Social Work.": "Public Administration and Human Services",
  "Parks, Recreation and Leisure Studies.":
    "Public Administration and Human Services",
  "Psychology, Other.": "Psychology",
  "Anthropology.": "Social Sciences excluding Economics",
  "Educational Assessment, Evaluation, and Research.": "Education",
  "Civil Engineering.": "Engineering",
  "Landscape Architecture.": "Transportation, Construction, and Architecture",
  "Liberal Arts and Sciences, General Studies and Humanities.":
    "English, Liberal Arts, and Humanities",
  "Pastoral Counseling and Specialized Ministries.":
    "Philosophy and Religious Studies",
  "English Language and Literature, General.":
    "English, Liberal Arts, and Humanities",
  "Social Sciences, General.": "Social Sciences excluding Economics",
  "Communication and Media Studies.": "Communications and Journalism",
  "Industrial Production Technologies/Technicians.": "Engineering",
  "Public Relations, Advertising, and Applied Communication.":
    "Communications and Journalism",
  "Air Transportation.": "Transportation, Construction, and Architecture",
  "Dietetics and Clinical Nutrition Services.": "Health and Nursing",
  "Accounting and Related Services.": "Business and Management",
  "Engineering, Other.": "Engineering",
  "Ecology, Evolution, Systematics, and Population Biology.":
    "Life Sciences and Biology",
  "Construction Engineering Technologies.": "Engineering",
  "Business/Managerial Economics.": "Business and Management",
  "Applied Mathematics.": "Mathematics and Statistics",
  "Engineering, General.": "Engineering",
  "Health Professions and Related Clinical Sciences, Other.":
    "Health and Nursing",
  "Engineering Technologies/Technicians, Other.": "Engineering",
  "East Asian Languages, Literatures, and Linguistics.": "Miscellaneous",
  "Research and Experimental Psychology.": "Psychology",
  "Business/Commerce, General.": "Business and Management",
  "Biomedical/Medical Engineering.": "Engineering",
  "Graphic Communications.": "Communications and Journalism",
  "Clinical/Medical Laboratory Science/Research and Allied Professions.":
    "Health and Nursing",
  "Teaching English or French as a Second or Foreign Language.": "Education",
  "Finance and Financial Management Services.": "Business and Management",
  "Biology, General.": "Life Sciences and Biology",
  "Operations Research.": "Engineering",
  "Plant Sciences.": "Agriculture and Natural Resources",
  "City/Urban, Community and Regional Planning.":
    "Transportation, Construction, and Architecture",
  "Mechanical Engineering Related Technologies/Technicians.": "Engineering",
  "Apparel and Textiles.": "Miscellaneous",
  "Natural Resources Conservation and Research.":
    "Agriculture and Natural Resources",
  "Chemical Engineering.": "Engineering",
  "Registered Nursing, Nursing Administration, Nursing Research and Clinical Nursing.":
    "Health and Nursing",
  "Communication Disorders Sciences and Services.": "Health and Nursing",
  "Microbiological Sciences and Immunology.": "Life Sciences and Biology",
  "Public Administration and Social Service Professions, Other.":
    "Public Administration and Human Services",
  "Education, Other.": "Education",
  "International Relations and National Security Studies.":
    "Social Sciences excluding Economics",
  "Foods, Nutrition, and Related Services.": "Miscellaneous",
  "Environmental/Environmental Health Engineering.": "Engineering",
  "Electrical Engineering Technologies/Technicians.": "Engineering",
  "Theological and Ministerial Studies.": "Philosophy and Religious Studies",
  "Visual and Performing Arts, General.": "Visual Arts and Music",
  "Management Information Systems and Services.": "Business and Management",
  "Public Administration.": "Public Administration and Human Services",
  "Social Sciences, Other.": "Social Sciences excluding Economics",
  "Public Health.": "Health and Nursing",
  "International Business.": "Business and Management",
  "Radio, Television, and Digital Communication.":
    "Communications and Journalism",
  "Clinical, Counseling and Applied Psychology.": "Psychology",
  "Multi/Interdisciplinary Studies, Other.": "Miscellaneous",
  "Bible/Biblical Studies.": "Philosophy and Religious Studies",
  "Fire Protection.": "Public Administration and Human Services",
  "Materials Sciences.": "Physical Sciences",
  "Religion/Religious Studies.": "Philosophy and Religious Studies",
  "Animal Sciences.": "Agriculture and Natural Resources",
  "Entrepreneurial and Small Business Operations.": "Business and Management",
  "Statistics.": "Mathematics and Statistics",
  "Biological and Biomedical Sciences, Other.": "Life Sciences and Biology",
  "Human Services, General.": "Public Administration and Human Services",
  "Business/Corporate Communications.": "Business and Management",
  "Culinary Arts and Related Services.": "Miscellaneous",
  "Geography and Cartography.": "Social Sciences excluding Economics",
  "Cognitive Science.": "Miscellaneous",
  "Construction Management.": "Business and Management",
  "Food Science and Technology.": "Agriculture and Natural Resources",
  "Aerospace, Aeronautical and Astronautical Engineering.": "Engineering",
  "Allied Health Diagnostic, Intervention, and Treatment Professions.":
    "Health and Nursing",
  "Engineering-Related Technologies.": "Engineering",
  "Agricultural Public Services.": "Agriculture and Natural Resources",
  "Gerontology.": "Miscellaneous",
  "Mental and Social Health Services and Allied Professions.":
    "Health and Nursing",
  "Engineering-Related Fields.": "Engineering",
  "International/Global Studies.": "Miscellaneous",
  "Agriculture, General.": "Agriculture and Natural Resources",
  "Hospitality Administration/Management.": "Business and Management",
  "Dance.": "Visual Arts and Music",
  "Pharmacy, Pharmaceutical Sciences, and Administration.":
    "Health and Nursing",
  "Peace Studies and Conflict Resolution.": "Miscellaneous",
  "Religious Education.": "Philosophy and Religious Studies",
  "Manufacturing Engineering.": "Engineering",
  "Biotechnology.": "Life Sciences and Biology",
  "Family and Consumer Sciences/Human Sciences, General.": "Miscellaneous",
  "Computer/Information Technology Administration and Management.":
    "Computer and Information Sciences",
  "Criminology.": "Social Sciences excluding Economics",
  "Architectural Engineering.": "Engineering",
  "Natural Resources and Conservation, Other.":
    "Agriculture and Natural Resources",
  "Business, Management, Marketing, and Related Support Services, Other.":
    "Business and Management",
  "Zoology/Animal Biology.": "Life Sciences and Biology",
  "Computer Software and Media Applications.":
    "Computer and Information Sciences",
  "Natural Resources Management and Policy.":
    "Agriculture and Natural Resources",
  "Non-Professional General Legal Studies (Undergraduate).": "Miscellaneous",
  "Drafting/Design Engineering Technologies/Technicians.": "Engineering",
  "Communication, Journalism, and Related Programs, Other.":
    "Communications and Journalism",
  "Science, Technology and Society.": "Miscellaneous",
  "Arts, Entertainment,and Media Management.": "Visual Arts and Music",
  "Education, General.": "Education",
  "Agriculture, Agriculture Operations, and Related Sciences, Other.":
    "Agriculture and Natural Resources",
  "Engineering Technology, General.": "Engineering",
  "Parks, Recreation and Leisure Facilities Management.":
    "Public Administration and Human Services",
  "Atmospheric Sciences and Meteorology.": "Physical Sciences",
  "English Language and Literature/Letters, Other.":
    "English, Liberal Arts, and Humanities",
  "Construction Engineering.": "Engineering",
  "Human Biology.": "Miscellaneous",
  "Specialized Sales, Merchandising and  Marketing Operations.":
    "Business and Management",
  "Literature.": "English, Liberal Arts, and Humanities",
  "Community Organization and Advocacy.":
    "Public Administration and Human Services",
  "Materials Engineering": "Engineering",
  "Genetics.": "Life Sciences and Biology",
  "Rehabilitation and Therapeutic Professions.": "Health and Nursing",
  "Information Science/Studies.": "Computer and Information Sciences",
  "Interior Architecture.": "Transportation, Construction, and Architecture",
  "Neurobiology and Neurosciences.": "Life Sciences and Biology",
  "Audiovisual Communications Technologies/Technicians.":
    "Communications and Journalism",
  "Agricultural Production Operations.": "Agriculture and Natural Resources",
  "Astronomy and Astrophysics.": "Physical Sciences",
  "Dental Support Services and Allied Professions.": "Health and Nursing",
  "Alternative and Complementary Medicine and Medical Systems.":
    "Health and Nursing",
  "International Agriculture.": "Agriculture and Natural Resources",
  "Computer and Information Sciences and Support Services, Other.":
    "Computer and Information Sciences",
  "Real Estate.": "Business and Management",
  "Health/Medical Preparatory Programs.": "Health and Nursing",
  "Marine Transportation.": "Transportation, Construction, and Architecture",
  "Fishing and Fisheries Sciences and Management.":
    "Agriculture and Natural Resources",
  "Cultural Studies/Critical Theory and Analysis.": "Miscellaneous",
  "Sustainability Studies.": "Miscellaneous",
  "Missions/Missionary Studies and Missiology.":
    "Philosophy and Religious Studies",
  "Public Policy Analysis.": "Public Administration and Human Services",
  "Family and Consumer Economics and Related Studies.": "Miscellaneous",
  "Architectural History and Criticism.":
    "Transportation, Construction, and Architecture",
  "Environmental Design.": "Transportation, Construction, and Architecture",
  "Special Education and Teaching.": "Education",
  "Wildlife and Wildlands Science and Management.":
    "Agriculture and Natural Resources",
  "Visual and Performing Arts, Other.": "Visual Arts and Music",
  "Homeland Security.": "Public Administration and Human Services",
  "Social and Philosophical Foundations of Education.": "Education",
  "International and Comparative Education.": "Education",
  "Educational/Instructional Media Design.": "Education",
  "Security Science and Technology.":
    "Public Administration and Human Services",
  "Legal Support Services.": "Miscellaneous",
  "Religious/Sacred Music.": "Philosophy and Religious Studies",
  "Multi-/Interdisciplinary Studies, General.": "Miscellaneous",
  "Legal Professions and Studies, Other.": "Miscellaneous",
  "Engineering Physics.": "Engineering",
  "Natural Sciences.": "Miscellaneous",
  "Marine Sciences.": "Miscellaneous",
  "Biomathematics, Bioinformatics, and Computational Biology.":
    "Life Sciences and Biology",
};
export default programs;
