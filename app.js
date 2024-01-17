document.addEventListener("DOMContentLoaded", function () {
  // Get input elements
  const sellingPriceInput = document.getElementById("sale-price");
  const mortgagePayoffInput = document.getElementById("morgage-pay");
  const commissionInput = document.getElementById("commission");

  // Get output elements
  const sellingPriceOutput = document.getElementById("price");
  const mortgagePayoffOutput = document.getElementById("morgage-value");
  const commissionOutput = document.getElementsByClassName("commission-value");
  const titleInsuranceOutput = document.getElementById("title-ins");
  const titleSearchOutput = document.getElementById("title-search");
  const stateDocStampsOutput = document.querySelector("#state-ds");
  const lienSearchOutput = document.querySelector("#lien-search");
  const closingFeeOutput = document.getElementById("closing-fee");
  const brokerCommissionOutput = document.getElementById("commission-result");
  const estimatedProceedsOutput = document.getElementById("estimated-proceeds");

  // Set default values
  sellingPriceInput.value = 234099887766;
  mortgagePayoffInput.value = 300900;
  commissionInput.value = 3.5;

  // Call updateOutputs initially to set default values
  updateOutputs();

  // Update outputs on input change
  sellingPriceInput.addEventListener("input", updateOutputs);
  mortgagePayoffInput.addEventListener("input", updateOutputs);
  commissionInput.addEventListener("input", updateOutputs);

  function updateOutputs() {
    // Get input values
    const sellingPrice = parseFloat(sellingPriceInput.value) || 0;
    const mortgagePayoff = parseFloat(mortgagePayoffInput.value) || 0;
    const commissionRate = parseFloat(commissionInput.value) || 3.5; // Default commission rate

    // Formulas
    const titleInsurance = calculateTitleInsurance(sellingPrice);
    const mortgagePayoffMax = 1000000;
    const stateDocStamps = sellingPrice * 0.007;
    const lienSearch = 150;
    const closingFee = 349;
    const brokerCommission = (sellingPrice * commissionRate) / 100;
    const titleSearch = 175;
    const estimatedProceeds =
      sellingPrice -
      mortgagePayoff -
      closingFee -
      titleSearch -
      stateDocStamps -
      lienSearch -
      brokerCommission;

    // Update output elements with values
    sellingPriceOutput.textContent = sellingPrice
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    mortgagePayoffOutput.textContent = mortgagePayoff
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (commissionOutput.length > 0) {
      for (let i = 0; i < commissionOutput.length; i++) {
        commissionOutput[i].textContent = `${commissionRate.toFixed(2)}`;
      }
    }
    titleInsuranceOutput.textContent = titleInsurance
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    titleSearchOutput.textContent = titleSearch
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    stateDocStampsOutput.textContent = stateDocStamps
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    lienSearchOutput.textContent = lienSearch
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    closingFeeOutput.textContent = closingFee
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    brokerCommissionOutput.textContent = brokerCommission
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    estimatedProceedsOutput.textContent = estimatedProceeds
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Function to calculate title insurance
  function calculateTitleInsurance(amount) {
    if (amount <= 100000) {
      return amount * 0.00575; // 0.575%
    } else if (amount > 100000 && amount <= 1000000) {
      return 100000 * 0.00575 + (amount - 100000) * 0.005; // 0.5%
    } else if (amount > 1000000 && amount <= 5000000) {
      return 100000 * 0.00575 + 900000 * 0.005 + (amount - 1000000) * 0.0025; // 0.25%
    } else if (amount > 5000000 && amount <= 10000000) {
      return (
        100000 * 0.00575 +
        900000 * 0.005 +
        4000000 * 0.0025 +
        (amount - 5000000) * 0.00225
      ); // 0.225%
    } else {
      return (
        100000 * 0.00575 +
        900000 * 0.005 +
        4000000 * 0.0025 +
        5000000 * 0.00225 +
        (amount - 10000000) * 0.002
      ); // 0.2%
    }
  }
});

// range slider 1
const slider_input = document.getElementById("morgage-pay"),
  slider_thumb = document.getElementById("slider_thumb"),
  slider_line = document.getElementById("slider_line");

function showSliderValue() {
  slider_thumb.innerHTML = slider_input.value;

  const bulletPosition = slider_input.value / slider_input.max,
    space = slider_input.offsetWidth - slider_thumb.offsetWidth;

  const thumbPosition = bulletPosition * space > 0 ? bulletPosition * space : 0;

  slider_thumb.style.left = thumbPosition + "px";
  slider_line.style.width = bulletPosition * 100 + "%";
}

showSliderValue();
window.addEventListener("resize", showSliderValue);
slider_input.addEventListener("input", showSliderValue, false);

// range slider 2

const slider_inputc = document.getElementById("commission"),
  slider_thumbc = document.getElementById("slider_thumbc"),
  slider_linec = document.getElementById("slider_linec");

function showSliderValuec() {
  slider_thumbc.innerHTML = slider_inputc.value;

  const bulletPositionc = slider_inputc.value / slider_inputc.max,
    spacec = slider_inputc.offsetWidth - slider_thumbc.offsetWidth;

  const thumbPositionc =
    bulletPositionc * spacec > 0 ? bulletPositionc * spacec : 0;

  slider_thumbc.style.left = thumbPositionc + "px";
  slider_linec.style.width = bulletPositionc * 100 + "%";
}

showSliderValuec();
window.addEventListener("resize", showSliderValuec);
slider_inputc.addEventListener("input", showSliderValuec, false);

// toggle dropdown
function toggleTopSection() {
  const topSection = document.getElementById("toggle-results");
  const arrowImage = document.getElementById("calc-toggle");

  topSection.classList.toggle("collapsed");

  // Toggle the rotation of the arrow image
  const isCollapsed = topSection.classList.contains("collapsed");
  arrowImage.style.transform = isCollapsed ? "rotate(0deg)" : "rotate(180deg)";
}
