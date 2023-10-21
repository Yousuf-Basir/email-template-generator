const copyButton = document.getElementById('copy-button');
const emailSignature = document.getElementById('email-signature');


const copyRichText = async (innerHTML) => {
    const blob = new Blob([innerHTML], { type: "text/html" });
    const richTextInput = new ClipboardItem({ "text/html": blob });
    await navigator.clipboard.write([richTextInput]);
};


copyButton.addEventListener('click', () => {
    // Copy the email signature to the clipboard as rich text
    navigator.clipboard.writeText(emailSignature.innerText).then(() => {
        // Show a success message
        copyButton.innerText = 'Copied!';
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