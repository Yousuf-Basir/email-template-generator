// get user data from url
export const getUserDataFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = {
        name: urlParams.get('name'),
        designation: urlParams.get('designation'),
        phoneNumber: urlParams.get('phoneNumber'),
        email: urlParams.get('email')
    }
    return userData;
}

// convert image to base64 and return img src string
export const getBase64Image = (img) => {
    const canvas = document.createElement("canvas");
    // get img height and width from img style
    canvas.width = img.width;
    canvas.height = img.height;
    console.log(img.width, img.height);
    const ctx = canvas.getContext("2d");
    // resize the canvas to the new dimensions
    ctx.drawImage(img, 0, 0, img.width, img.height);
    const dataURL = canvas.toDataURL("image/png");
    return dataURL;
}

// replace all image src with base64 string
export const replaceImageSrc = () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const base64Image = getBase64Image(img);
        img.src = base64Image;
        // set object-fit to cover
        // img.style.objectFit = 'contain';
    });
}