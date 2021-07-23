const date = document.querySelector("#birthday");
const output = document.querySelector("#outputMsg");
const checkBtn = document.querySelector(".check");
const loading = document.querySelector(".loading");
loading.style.display = "none"

//Setting max date to today, if entered without data will trigger
let today = new Date();
let maxDate = dateToString(today);
date.setAttribute("max", maxDate);
date.setAttribute("value", maxDate);

//Convert Date to String
function dateToString(date) {
  let dd = date.getDate();
  //js month start from 0
  let mm = date.getMonth() + 1;

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return date.getFullYear() + "-" + mm + "-" + dd;
}

const findNextDate = (dateArr) => {
  let currDate = new Date(dateArr.join("-"));
  //+1 for checking the next month
  currDate.setDate(currDate.getDate() + 1);
  // console.log(dateToString(currDate));
  let nextDateFormat = "";
  let dayCount = 0;
  while (!nextDateFormat) {
    currDate.setDate(currDate.getDate() + 1);
    dayCount++;
    // console.log(dateToString(currDate));
    [nextDateFormat, palinDate] = isPalindrome(
      dateToString(currDate).split("-")
    );
  }
  return [nextDateFormat, palinDate, dayCount];
};

//Checks if date is palindrome with different date formats
const isPalindrome = function (dateArray) {
  let dateFormats = [
    //mm/dd/yyyy
    dateArray[1] + dateArray[2] + dateArray[0],
    //dd/mm/yyyy
    dateArray[2] + dateArray[1] + dateArray[0],
    //mm/dd/yy
    dateArray[1] + dateArray[2] + dateArray[0].substring(2),
    //dd/mm/yy
    dateArray[2] + dateArray[1] + dateArray[0].substring(2),
  ];

  for (let idx = 0; idx < dateFormats.length; idx++) {
    let revStr = dateFormats[idx].split("").reverse().join("");

    if (dateFormats[idx] === revStr) {
      switch (idx) {
        case 0:
          console.log("Matched with " + idx + "i.e. MM/DD/YYYY");
          return [
            `MM/DD/YYYY`,
            `${dateArray[1]}-${dateArray[2]}-${dateArray[0]}`,
          ];

        case 1:
          console.log("Matched with " + idx + "i.e. DD/MM/YYYY");
          return [
            `DD/MM/YYYY`,
            `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`,
          ];

        case 2:
          console.log("Matched with " + idx + "i.e. MM/DD/YY");
          return [
            `MM/DD/YY`,
            `${dateArray[1]}-${dateArray[2]}-${dateArray[0].substring(2)}`,
          ];

        case 3:
          console.log("Matched with " + idx + "i.e. DD/MM/YY");
          return [
            `DD/MM/YY`,
            `${dateArray[2]}-${dateArray[1]}-${dateArray[0].substring(2)}`,
          ];
        default:
          console.log("No Format Found");
      }
    }
  }
  return ["", ""];
};

//checks for different date formats
function checkPalindrome(date) {
  let dateList = date.split("-");
  //check if date is palindrome in 4 formats
  let [format, palindromeDate] = isPalindrome(dateList);
  // console.log(format);
  if (format) {
    output.innerText = `Congratulations🎉🥳!\n Your birthday forms a palindrome string in the ${format} format as ${palindromeDate}.`;
  } else {
    let [dateFormat, nextDate, days] = findNextDate(dateList);
    output.innerText = `Oh No😓, Your Birthday is not Palindrome.\n The Nearest date is ${nextDate} in ${dateFormat} format which occurs in ${days} days from your birthday.`;
  }
}

//Button trigger to check
checkBtn.addEventListener("click", () => {
  output.style.display = "none"
  loading.style.display = "block"
  if (!date.value) {
    output.innerText = "Enter a valid date";
  }
  checkPalindrome(date.value);
  setTimeout(()=>{
    loading.style.display = "none"
    output.style.display = "block";
  }, 3000)
});
