class Account {
    constructor(name, lastName, age) {
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.init();
    }

    init() {
        this.setupEventListener();
    }

    setupEventListener() {
        document.addEventListener('input', this.getValues.bind(this));
        const button = document.getElementById('send');
        button.addEventListener('click', this.sendValues.bind(this));
    }

    getValues() {
        return {
            nameI: this.name.value,
            lastNameI: this.lastName.value,
            ageI: this.age.value,
        }
    }

    sendValues(event) {
        event.preventDefault();

        this.clearErrors(this.name);
        this.clearErrors(this.lastName);
        this.clearErrors(this.age);

        if (!this.isEmptyValue() && !this.isError()) {
            const values = this.getValues();
            this.showSuccess();
        }
    }

    isEmptyValue() {
        let hasError = false;

        if(!this.name.value){
            this.showError(this.name, 'Name should not be empty');
            hasError = true;
        }
        if(!this.lastName.value){
            this.showError(this.lastName, 'Last Name should not be empty');
            hasError = true;
        }
        if(!this.age.value){
            this.showError(this.age, 'Age should be a number');
            hasError = true;
        }

        return hasError;
    }

    isError() {
        const age = Number(this.age.value);
        if (isNaN(age)) {
            this.showError(this.age, 'Age should be a number');
            return true;
        }
        return false;
    }

    showError(input, message) {
        this.clearErrors(input);
        let span = document.createElement('span');
        span.classList.add('isError');
        input.style.border = '1px solid red';
        span.innerText = message;
        input.parentElement.append(span);
    }

    clearErrors(input) {
        input.style.border = '1px solid lightgrey';
        const existingError = input.parentElement.querySelector('.isError');
        if (existingError) {
            existingError.remove()
        }
    }
    showSuccess(){
        const existingSuccess = document.querySelector('.successMessage');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        let successMessage = document.createElement('div');
        successMessage.classList.add('successMessage');
        successMessage.style.color = 'green';
        successMessage.style.marginTop = '10px';
        successMessage.innerText = 'Form submitted successfully!';

        const formContainer = document.querySelector('form');
        formContainer.append(successMessage);
    }
}

const name = document.querySelector('input[name="name"]');
const lastName = document.querySelector('input[name="prenume"]');
const age = document.querySelector('input[name="age"]');
const account = new Account(name, lastName, age);