import { getUserDataFromUrl, replaceImageSrc } from "./common";

const copyButton = document.getElementById('copy-button');
const emailSignature = document.getElementById('email-signature');
const editButton = document.getElementById('edit-button');
const downloadButton = document.getElementById('download-button');

// user data from email signature body
const userName = document.getElementById('user-name');
const userDesignation = document.getElementById('user-designation');
const userPhoneNumber = document.getElementById('user-phone-number');
const userEmail = document.getElementById('user-email');

// copy email signature to clipboard
const copyRichText = async (emailSignatureDiv) => {
    try {
        // select the email signature div
        const range = document.createRange();
        range.selectNode(emailSignatureDiv);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        // copy the selected email signature
        document.execCommand('copy');
        // clear the selection
        window.getSelection().removeAllRanges();
        // show copied message
        copyButton.innerText = "Copied!";
        setTimeout(() => {
            copyButton.innerText = "Copy";
        }, 1000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

// copy email signature without using execCommand
const copy = (html) => {
    const content = html.innerHTML;
    const blobInput = new Blob([content], {type: 'text/html'});
    const clipboardItemInput = new ClipboardItem({'text/html' : blobInput});
    navigator.clipboard.write([clipboardItemInput]);
};

// download email signature as html file
const downloadHtml = (html) => {
    const fileName = 'email-signature.html';
    const blob = new Blob([html], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
};

// get user data values from email signature body
const getUserDataFromInputs = () => {
    const userData = {
        name: userName.innerText,
        designation: userDesignation.innerText,
        phoneNumber: userPhoneNumber.innerText,
        email: userEmail.innerText
    }
    return userData;
}

// navigate to edit page
const goToEditPage = () => {
    const userData = getUserDataFromInputs();
    var url = "/edit-signature.html";
    url += "?name=" + encodeURIComponent(userData.name);
    url += "&designation=" + encodeURIComponent(userData.designation);
    url += "&phoneNumber=" + encodeURIComponent(userData.phoneNumber);
    url += "&email=" + encodeURIComponent(userData.email);

    window.location.href = url;
}

// window events
document.addEventListener("DOMContentLoaded", () => {
    // replaceImageSrc();

    // get user data from url and set form inputs
    const userData = getUserDataFromUrl();
    userName.innerText = userData.name || userName.innerText;
    userDesignation.innerText = userData.designation || userDesignation.innerText;
    userPhoneNumber.innerText = userData.phoneNumber || userPhoneNumber.innerText;
    userPhoneNumber.href = `tel:${userData.phoneNumber || userPhoneNumber.href}`;
    userEmail.innerText = userData.email || userEmail.innerText;
    userEmail.href = `mailto:${userData.email || userEmail.href}`;
});


// button events
// handle edit button click
editButton.addEventListener('click', () => {
    goToEditPage();
});

// handle copy button click
copyButton.addEventListener('click', () => {
    copyRichText(emailSignature);
    // copy(emailSignature);
});

// handle download button click
downloadButton.addEventListener('click', () => {
    downloadHtml(emailSignature.innerHTML);
});