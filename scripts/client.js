const salaryArray = [];
const monthlyMax = 20000
let monthlyCost = 0;

$(document).ready(init);

function init() {
    enable(true);
}

function enable(value) {
    if (value) {
        $('#employeeForm').on('submit', submitEmployeeForm);
        $('.js-btn-clear').on('click', resetInputs);
        $('.js-salaries').on('click', '.js-btn-delete', deleteSalary);
    } else {
        $('#employeeForm').off('submit', submitEmployeeForm);
        $('.js-btn-clear').off('click', resetInputs);
        $('.js-salaries').off('click', '.js-btn-delete', deleteSalary);
    }
}

function submitEmployeeForm(event) {
    event.preventDefault();
    const salaryObject = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        jobTitle: $('#jobTitle').val(),
        idNumber: parseInt($('#idNumber').val()),
        annualSalary: parseInt($('#annualSalary').val())
        }
    addToSalaries(salaryObject);
    resetInputs();
    render();
}

function addToSalaries(salaryObject) {
    salaryArray.push(salaryObject);
}

function deleteSalary() {
    const id = $(this).parent().data('id');
    salaryArray.splice(id, 1);
    render();
}

function resetInputs() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#jobTitle').val('');
    $('#idNumber').val('');
    $('#annualSalary').val('');
}

function findTotal() {
    totalSalaries = 0;
    for (let salaries of salaryArray) {
        totalSalaries += salaries.annualSalary;
    }
    monthlyCost = totalSalaries/12;
}

function render() {
    $('.js-salaries').empty();
    findTotal();

    for (let i = 0; i < salaryArray.length; i++) {
        const salaries = salaryArray[i];

        $('.js-salaries').append(`
            <tr data-id="${i}">
                <td>${salaries.firstName}</td>
                <td>${salaries.lastName}</td>
                <td>${salaries.jobTitle}</td>
                <td>${salaries.idNumber}</td>
                <td>$${salaries.annualSalary}</td>
                <td><button class="js-btn-delete btn">X</button></td>
            </tr>
        `);
    }

    $('.total-salaries').text(`TOTAL : $${totalSalaries/12}`);
    if (monthlyCost < monthlyMax) {
        $('.js-Total-Monthly-Cost').text(`Monthly Total: $${monthlyCost}`).css('background-color', 'white');
    } else if (monthlyCost > monthlyMax) {
        $('.js-Total-Monthly-Cost').text(`Monthly Total: $${monthlyCost}`).css('background-color', 'red');
    }


}



