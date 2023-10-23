const copyButton = document.getElementById('copy-button');
const emailSignature = document.getElementById('email-signature');
const editButton = document.getElementById('edit-button');

// user data from email signature body
const userName = document.getElementById('user-name');
const userDesignation = document.getElementById('user-designation');
const userPhoneNumber = document.getElementById('user-phone-number');
const userEmail = document.getElementById('user-email');


const copyRichText = async (innerHTML) => {
    const blob = new Blob([innerHTML], { type: "text/html" });
    const richTextInput = new ClipboardItem({ "text/html": blob });
    await navigator.clipboard.write([richTextInput]);
};


copyButton.addEventListener('click', () => {
    // Copy the email signature to the clipboard as rich text
    navigator.clipboard.writeText(emailSignature.innerText).then(() => {
        // Show a success message
        copyButton.innerText = 'Copied';
        setTimeout(() => {
            copyButton.innerText = 'Copy';
        }, 2000);
    }, () => {
        // Show an error message
        copyButton.innerText = 'Error!';
        setTimeout(() => {
            copyButton.innerText = 'Copy';
        }, 2000);
    });
});

// get user data values from email signature body
const getUserData = () => {
    const userData = {
        name: userName.innerText,
        designation: userDesignation.innerText,
        mobileNumber: userPhoneNumber.innerText,
        email: userEmail.innerText
    }
    return userData;
}

// navigate to edit page
editButton.addEventListener('click', () => {
    const userData = getUserData();
    const userDataString = JSON.stringify(userData);
    window.location.href = `edit.html?user=${userDataString}`;
});

// get user data from url
const getUserDataFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userDataString = urlParams.get('user');
    const userData = JSON.parse(userDataString);
    return userData;
}