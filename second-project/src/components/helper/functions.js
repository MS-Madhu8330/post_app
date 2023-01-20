// This functions.js file will produce every time a new values to the images we are uploading, this is to avoid inconsistancy of data when different persons uploading same image.


export default function makeid(length) {
    var result = "";

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234556789";

    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {

        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}