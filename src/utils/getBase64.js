function GetBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            return resolve(reader.result);            
        }

        reader.onerror = (err) => {
            return reject(err);
        }
    })
}

export default GetBase64;