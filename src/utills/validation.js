const validator = require("validator");

const valideSignUpData = (req) => {
  const { firstName, lastName, GmailId, Password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not Valide");
  } else if (!validator.isEmail(GmailId)) {
    throw new Error("gmail  is not Valide");
  } else if (!validator.isStrongPassword(Password)) {
    throw new Error("write strong password");
  }
};
// const validateEditeProfileData = (req) => {
//   const allowedEditeFeiled = [
//     "firstName",
//     "Age",
//     "Gender",
//     "lastName",
//     "About",
//   ];
//   const isEditeAllowed=Object.keys(req.body).every((field)=>{
//     allowedEditeFeiled.includes(field)
//   })
//   return isEditeAllowed;
// };
const validateEditeProfileData = (req) => {
  const allowedEditeFeiled = [
    "firstName",
    "Age",
    "Gender",
    "lastName",
    "Skills",
    "About", // Make sure the field is spelled correctly as "About"
  ];

  // Ensure every field in req.body is in the allowedEditeFeiled list
  const isEditeAllowed = Object.keys(req.body).every((field) =>
    allowedEditeFeiled.includes(field)
  );

  return isEditeAllowed; // Returns true if all fields are allowed
};

module.exports = { valideSignUpData,validateEditeProfileData };
