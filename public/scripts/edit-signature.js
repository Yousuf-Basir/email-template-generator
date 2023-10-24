const getUserDataFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = {
        name: urlParams.get('name'),
        designation: urlParams.get('designation'),
        phoneNumber: urlParams.get('phoneNumber'),
        email: urlParams.get('email')
    }
    return userData;
}

// form inputs
const nameInput = document.getElementById('name');
const designationInput = document.getElementById('designation');
const phoneNumberInput = document.getElementById('phone-number');
const emailInput = document.getElementById('email');
const submitButton = document.getElementById('submit-button');

const onSubmit = () => {
    var url = "/index.html";
    url += "?name=" + encodeURIComponent(nameInput.value);
    url += "&designation=" + encodeURIComponent(designationInput.value);
    url += "&phoneNumber=" + encodeURIComponent(phoneNumberInput.value);
    url += "&email=" + encodeURIComponent(emailInput.value);
    window.location.href = url;
}


// window events
window.onload = () => {
    // get user data from url and set form inputs
    const userData = getUserDataFromUrl();
    console.log("userData", userData)
    nameInput.value = userData.name;
    designationInput.value = userData.designation;
    phoneNumberInput.value = userData.phoneNumber;
    emailInput.value = userData.email;
}

// button events
submitButton.addEventListener('click', () => {
    onSubmit();
});