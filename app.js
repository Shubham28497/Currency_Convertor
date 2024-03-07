const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

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
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const fromCurrency = fromCurr.value.toLowerCase();
  const toCurrency = toCurr.value.toLowerCase();
  const Url = `${BASE_URL}`;
  let response = await fetch(Url);
  let fdata = await response.json();
  let data=fdata.eur


  // Check if the response contains the necessary conversion rates
  if (data[fromCurrency] && data[toCurrency]) {
    let fromRate = data[fromCurrency];
    let toRate = data[toCurrency];
    let rate = toRate / fromRate; // Conversion rate from "from" to "to"
    let famount = amtVal * rate;
    console.log(famount);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${famount} ${toCurr.value}`;
  } else {
    console.error("Conversion rates not available for selected currencies");
  }
});
