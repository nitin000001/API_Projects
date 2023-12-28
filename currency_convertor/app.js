const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const amt = document.querySelector(".amount input");
const btn = document.querySelector(".btn");
const toCurr = document.querySelector(".to select");
const fromCurr = document.querySelector(".from select");
const dropdowns = document.querySelectorAll(".dropdown select");
const msg = document.querySelector("#msg");



for (let select of dropdowns) { 
  for (currCode in countryList) { //country.js wala list for {in method} se access kiya hai
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

  select.addEventListener("change", (evt) =>{
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amtvalue = amt.value;
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amt.value = "1";
    }
    
    // console.log(fromCurr.value, toCurr.value);

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];


    let finalAmount = amtvalue * rate;
    msg.innerHTML = `${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});
