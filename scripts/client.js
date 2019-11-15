const salaryArray = [];
let totalSalaries = 0;

$(document).ready(init);

function init() {
    enable(true);
}

function enable(value) {
    if (value) {
        $('#customerForm').on('submit', submitCustomerForm);
        $('.js-btn-clear').on('click', resetInputs);
        $('.js-salary').on('click', '.js-btn-delete', deleteSalary);
    } else {
        $('#customerForm').off('submit', submitCustomerForm);
        $('.js-btn-clear').off('click', resetInputs);
        $('.js-salary').off('click', '.js-btn-delete', deleteSalary);
    }
}

function submitCustomerForm(event) {
    event.preventDefault();
//ID number, job title, annual salary
    const salaryObject = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        jobTitle: $('#jobTitle').val(),
        idNumber: parseInt($('#idNumber').val())
        annualSalary: parseInt($('#annualSalary').val())
    }

    // const dataObject = {};
    // const valueArray = $('#customerForm').serializeArray();
    // for(let item of valueArray) {
    //     dataObject[item.name] = item.value;
    // }
    // addToOrders(dataObject);

    addToSalaries(salaryObject);
    resetInputs();
}

function addToSalaries(salaryObject) {
    salaryArray.push(salaryObject);
    render();
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
}

function render() {
    $('.js-salaries').empty();
    findTotal();

    for (let i = 0; i < salaryArray.length; i++) {
        const salaries = salaryArray[i];

        $('.js-salaries').append(`
            <tr data-id="${i}">
                <td>${salary.firstName}</td>
                <td>${salary.lastName}</td>
                <td>${salary.jobTitle}</td>
                <td>$${salary.idNumber}</td>
                <td>$${salary.annualSalary}</td>
                <td><button class="js-btn-delete btn">X</button></td>
            </tr>
        `);
    }

    $('.total-salaries').text(`TOTAL : $${totalSalaries}`);
}



/*
function submitCustomerForm(event) {
    event.preventDefault();
    // EXAMPLE 1
    // let firstName = $('#firstName').val();
    // let lastName = $('#lastName').val();
    // let pizza = $('#pizza').val();
    // let cost =  parseInt($('#cost').val());
    // $('.js-orders').append(`
    //     <div>
    //         <p>${firstName} ${lastName} - ${pizza} - $${cost}</p>
    //     </div>
    // `);
    totalCost += orderObject.cost;
    resetInputs();
}
*/