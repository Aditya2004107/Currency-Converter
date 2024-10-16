const Base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// Add the All Country
const dropdowns = document.querySelectorAll(".dropdown  select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select ");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  updateExchangeRate();
});

for (let select of dropdowns) {
  for (CurrCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = CurrCode;
    newOption.value = CurrCode;
    if (select.name === "from" && CurrCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && CurrCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

let btn = document.querySelector("form button");

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const url = `${Base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json;
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} ${finalAmount} ${toCurr.value}`;
};
