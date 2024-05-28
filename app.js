const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    // giving one default value of usd in left and inr in right
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
//   gives all the option of all the countries

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
} //changes the flag according to the country

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
//   default value 1

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//   modifying url from currency, to currency

  let response = await fetch(URL);
  let data = await response.json();
//   finding exchange rate

  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
// multiplying final amount with rate

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; //SIS
//   1 usd = 80 inr 
};

const updateFlag = (element) => {
  let currCode = element.value;
//   getting currency code
  let countryCode = countryList[currCode]; //IN country code for INR

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//   flag changes

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
//   preventing refreshing of page..

  updateExchangeRate();
});
// const button

window.addEventListener("load", () => {
  updateExchangeRate();
});
// Values update as 1USD to INR
