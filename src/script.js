// JavaScript source code

const carValueInput = document.getElementById("carValueInput");
const carValueRange = document.getElementById("carValueRange");

carValueInput.addEventListener("input", function (e) { carValueRange.value = e.target.value });
carValueRange.addEventListener("input", function (e) { carValueInput.value = e.target.value });


const downPaymentInput = document.getElementById("downPaymentInput");
const downPaymentInputRange = document.getElementById("downPaymentInputRange");

downPaymentInput.addEventListener("input", function (e) { downPaymentInputRange.value = e.target.value });
downPaymentInputRange.addEventListener("input", function (e) { downPaymentInput.value = e.target.value });


calculateLeasing();

function calculateLeasing() {
    const carType = document.getElementById("carType").value;
    const annualInterest = carType == "new" ? 0.0299 : 0.037;

    const leasePeriod = document.getElementById("leasePeriod").value;
    const carValue = document.getElementById("carValueInput").value;
    const downPaymentPercentage = document.getElementById("downPaymentInput").value;

    const downPayment = carValue * (downPaymentPercentage / 100);
    const loanAmount = carValue - downPayment;

    const monthlyInterestRate = annualInterest / 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod));

    const totalPayment = monthlyPayment * leasePeriod + downPayment;

    showResults(totalPayment, downPayment, monthlyPayment, annualInterest);
}

function showResults(totalPayment, downPayment, monthlyPayment, annualInterest) {
    const currencyFormat = Intl.NumberFormat("en-US", {
        style: 'currency',
        currency: 'USD',
    });

    const percentFormat = Intl.NumberFormat("en-US", {
        style: 'percent', minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    document.getElementById("totalCost").textContent = currencyFormat.format(totalPayment);
    document.getElementById("downPayment").textContent = currencyFormat.format(downPayment);
    document.getElementById("monthlyInstallment").textContent = currencyFormat.format(monthlyPayment);
    document.getElementById("interestRate").textContent = percentFormat.format(annualInterest);
}