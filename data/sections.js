// Glossary sections, in the order they appear on the page.
// Every entry in data/NN-*.js uses a `group` id from its section's list.

window.GLOSSARY = {
  sections: [
    {
      id: "uc-system",
      file: "01-uc-system.js",
      title: "UC system",
      intro: "What sits above the campus: the University of California, its ten campuses, its governance, and its shared programs and policies.",
      groups: [
        { id: "uc-campuses", title: "UC campuses" },
        { id: "uc-governance", title: "Systemwide governance and offices" },
        { id: "uc-programs", title: "Systemwide programs and benefits" },
        { id: "uc-policy", title: "Policies and manuals" },
      ],
    },
    {
      id: "administration",
      file: "02-campus-administration.js",
      title: "Campus administration",
      intro: "Who runs UC San Diego: the Chancellor, vice chancellor areas, the Academic Senate and administrative offices.",
      groups: [
        { id: "leadership", title: "Leadership and vice chancellor areas" },
        { id: "senate", title: "Academic Senate" },
        { id: "offices", title: "Administrative offices" },
        { id: "titles", title: "Titles and roles" },
      ],
    },
    {
      id: "schools",
      file: "03-schools-divisions.js",
      title: "Schools and academic divisions",
      intro: "The large academic units that house the departments.",
      groups: [
        { id: "schools", title: "Schools and divisions" },
      ],
    },
    {
      id: "colleges",
      file: "04-colleges.js",
      title: "Undergraduate colleges",
      intro: "Every undergraduate belongs to one of eight colleges, which set general education (GE) requirements, housing and writing sequences.",
      groups: [
        { id: "colleges", title: "The colleges" },
        { id: "college-writing", title: "Writing and core sequences" },
      ],
    },
    {
      id: "departments",
      file: "05-departments-subject-codes.js",
      title: "Departments, programs and subject codes",
      intro: "The codes that come before a course number (VIS 42, CSE 11…) plus major and program acronyms.",
      groups: [
        { id: "majors", title: "Majors and programs" },
        { id: "subject-codes", title: "Subject codes" },
      ],
    },
    {
      id: "degrees",
      file: "06-degrees.js",
      title: "Degrees",
      intro: "Abbreviations of the degrees UC San Diego awards.",
      groups: [
        { id: "degrees", title: "Degrees" },
      ],
    },
    {
      id: "enrollment",
      file: "07-enrollment.js",
      title: "Enrollment and academic life",
      intro: "Everyday vocabulary: enrollment, grades, class types and university requirements.",
      groups: [
        { id: "enrollment", title: "Enrollment and records" },
        { id: "soc-codes", title: "Schedule of Classes codes" },
        { id: "requirements", title: "University requirements" },
      ],
    },
    {
      id: "admissions",
      file: "08-admissions-financial-aid.js",
      title: "Admissions, costs and financial aid",
      intro: "Acronyms from applications, transfer, tuition and financial aid.",
      groups: [
        { id: "admissions", title: "Admissions and transfer" },
        { id: "finaid", title: "Financial aid and fees" },
      ],
    },
    {
      id: "graduate",
      file: "09-graduate-employment.js",
      title: "Graduate study and academic employment",
      intro: "TA, IA, GSR and the rest of the vocabulary for graduate students and academic student employees.",
      groups: [
        { id: "employment", title: "Academic student employment" },
        { id: "gradlife", title: "Graduate student life" },
      ],
    },
    {
      id: "international",
      file: "10-international.js",
      title: "International students",
      intro: "Visas, forms and offices for students coming from abroad.",
      groups: [
        { id: "international", title: "International students" },
      ],
    },
    {
      id: "services",
      file: "11-student-services.js",
      title: "Student services and community",
      intro: "Where to get help and find community: health, tutoring, resource centers and student government.",
      groups: [
        { id: "services", title: "Services and wellbeing" },
        { id: "centers", title: "Community and resource centers" },
        { id: "government", title: "Student government and organizations" },
      ],
    },
    {
      id: "campus-life",
      file: "12-campus-life.js",
      title: "Housing, transport and recreation",
      intro: "Living on campus, getting around San Diego, and recreation.",
      groups: [
        { id: "housing-transport", title: "Housing, dining and transport" },
        { id: "recreation", title: "Recreation and athletics" },
      ],
    },
    {
      id: "it-systems",
      file: "13-it-systems.js",
      title: "IT systems",
      intro: "Campus portals, accounts and digital tools.",
      groups: [
        { id: "it", title: "Systems and accounts" },
      ],
    },
    {
      id: "research",
      file: "14-research.js",
      title: "Research",
      intro: "Institutes, centers and the offices that administer research.",
      groups: [
        { id: "research-units", title: "Institutes and centers" },
        { id: "research-admin", title: "Research administration" },
      ],
    },
    {
      id: "buildings",
      file: "15-buildings.js",
      title: "Buildings and places",
      intro: "The building codes on your class schedule and the places everyone refers to by abbreviation.",
      groups: [
        { id: "building-codes", title: "Schedule of Classes building codes" },
        { id: "visarts-spaces", title: "Visual Arts spaces" },
        { id: "places", title: "Campus places and neighborhoods" },
        { id: "offcampus", title: "Health campus and off-campus" },
      ],
    },
  ],

  entries: [],

  add: function (sectionId, list) {
    for (var i = 0; i < list.length; i++) {
      list[i].section = sectionId;
      this.entries.push(list[i]);
    }
  },
};
