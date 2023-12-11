document.addEventListener("DOMContentLoaded", function () {
  // Get input elements
  const sellingPriceInput = document.getElementById("sale-price");
  const mortgagePayoffInput = document.getElementById("morgage-pay");
  const commissionInput = document.getElementById("commission");

  // Get output elements
  const sellingPriceOutput = document.getElementById("price");
  const mortgagePayoffOutput = document.getElementById("morgage-value");
  const commissionOutput = document.getElementById("commission-value");
  const titleInsuranceOutput = document.getElementById("title-ins");
  const titleSearchOutput = document.getElementById("title-search");
  const stateDocStampsOutput = document.querySelector(".state-ds");
  const lienSearchOutput = document.querySelector(".lien-search");
  const closingFeeOutput = document.getElementById("closing-fee");
  const brokerCommissionOutput = document.getElementById("commission-result");
  const estimatedProceedsOutput = document.getElementById("estimated-proceeds");

  // Set default values
  sellingPriceInput.value = 10000;
  mortgagePayoffInput.value = 300900;
  commissionInput.value = 3.5;

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
    if (commissionOutput) {
      commissionOutput.textContent = `${commissionRate.toFixed(2)}%`;
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
