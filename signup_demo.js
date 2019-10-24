const R = require('ramda');

/**
 * R.and 
 * R.gte, lte 
 * R.both 
 * R.cond 
 * R.curry 
 * R.otherwise
 * R.then
 * R.pipe
 * R.curry
 * R.always
 * R.equals
 */


const isValidEmailFormat = char => char.includes("@");
const isValidEmailLength = char => R.and(R.gte(char.length, 6), R.lte(char.length, 32));
const isValidEmail = R.both(isValidEmailFormat, isValidEmailLength);
const isValidPassword = char => R.gte(char.length, 8);
const isValidRegisterFormInput = (email, password) => R.and(isValidEmail(email), isValidPassword(password));

const tryRegister = (email, password) => R.cond([
  [R.equals(true) , _ => saveUserToDB(email, password)],
  [R.equals(false), _ => Promise.resolve("Invalid Email or Password") ],
  [R.T,           , _ => R.always("Default Case: This never be triggered in this case.")]  
])(isValidRegisterFormInput(email, password));

const saveUserToDB = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      succeedOrNot(resolve, reject)(Math.random() * 11 > 4);
    }, 2000);
  })
};

const succeedOrNot = (onSuccess, onFailure) => R.cond([
  [R.equals(true), () => onSuccess("Success!!")],
  [R.equals(false), () => onFailure()]
]);

const showMsgToUser = R.curry((title, msg) => console.log(`${title}`, msg));

const onSubmitForm = R.pipe(
  tryRegister,
  R.otherwise(R.always("Failed to save DB...")),
  R.then(showMsgToUser("Notification: "))
);

onSubmitForm("valid@gmail.com", "validpassword");
