document.addEventListener('DOMContentLoaded', (event) => {
    let salaryForm = document.getElementById('salaryForm');
    let workingCheckbox = document.getElementById('working');
    let workDetails = document.getElementById('workDetails');
    let calculateSalaryButton = document.getElementById('calculateSalary');
    let calculatedSalaryMessage = document.getElementById('calculatedSalaryMessage');
    let outputMessage = document.getElementById('outputMessage');

    
    workingCheckbox.addEventListener('change', () => {
        if (workingCheckbox.checked) {
            workDetails.classList.remove('hidden');
        } else {
            workDetails.classList.add('hidden');
        }
    });

    
    function isLeapYear(year) {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    
    function validateForm() {
        let isValid = true;
        document.querySelectorAll('#salaryForm input').forEach(input => {
            if (!input.value) {
                isValid = false;
                input.style.borderColor = 'red';
            } else if (input.type === 'number' && input.value <= 0) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = 'green';
            }
        });
        return isValid;
    }

   
    function calculateSalary(hours, rate) {
        let taxRate = 0.18; 
        let grossSalary = hours * rate;
        let netSalary = grossSalary * (1 - taxRate);
        return netSalary.toFixed(2);
    }

   
    salaryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (!validateForm()) {
            alert("Please fill out all required fields correctly.");
            return;
        }

        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let age = document.getElementById('age').value;
        let dob = document.getElementById('dob').value;
        let gender = document.querySelector('input[name="gender"]:checked').value;
        let greetingType = document.getElementById('greetingType').value;
        let subjects = Array.from(document.querySelectorAll('input[name="subject"]:checked')).map(subject => subject.value);
        let working = workingCheckbox.checked;

        let salary = 0;
        if (working) {
            let hoursWorked = document.getElementById('hoursWorked').value;
            let hourlyRate = document.getElementById('hourlyRate').value;
            salary = calculateSalary(hoursWorked, hourlyRate);
        }

        let birthYear = new Date(dob).getFullYear();
        let isBornInLeapYear = isLeapYear(birthYear);

        let userData = {
            firstName,
            lastName,
            age,
            dob,
            gender,
            greetingType,
            subjects,
            working,
            salary,
            isBornInLeapYear
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        let greeting = `Hello ${greetingType} ${firstName} ${lastName},\nWe hope you're doing well. Here's your salary after deductions R${salary}.\n Thank you.`;
        if (!working) {
            greeting = `Hello${greetingType} ${firstName} ${lastName},\nWe hope you're doing well.\nThank you.`;
        }

        outputMessage.textContent = greeting;
        outputMessage.classList.remove('hidden');

        if (isBornInLeapYear) {
            outputMessage.style.backgroundColor = 'lightblue';
        } else {
            outputMessage.style.backgroundColor = '';
        }

        console.log(userData); 
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const workingCheckbox = document.getElementById('working');
    const workDetails = document.getElementById('workDetails');
    const calculateSalaryButton = document.getElementById('calculateSalary');
    const outputMessage = document.getElementById('outputMessage');
    const resetButton = document.querySelector('button[type="reset"]');

    workingCheckbox.addEventListener('change', function() {
        if (this.checked) {
            workDetails.classList.remove('hidden');
        } else {
            workDetails.classList.add('hidden');
        }
    });

    calculateSalaryButton.addEventListener('click', function() {
        const hoursWorked = document.getElementById('hoursWorked').value;
        const hourlyRate = document.getElementById('hourlyRate').value;
        
        if (hoursWorked && hourlyRate) {
            const salary = hoursWorked * hourlyRate;
            outputMessage.textContent = `Your salary is R${salary.toFixed(2)}`;
            outputMessage.classList.remove('hidden');
        } else {
            outputMessage.textContent = 'Please enter both hours worked and hourly rate';
            outputMessage.classList.remove('hidden');
        }
    });
    resetButton.addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('salaryForm').reset(); 
        outputMessage.textContent = '';
        outputMessage.classList.add('hidden');
        workDetails.classList.add('hidden');
    });

});
