// phone 10
const vnfRegex10 = /([\+0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
// phone 11
const vnfRegex11 = /([\+84|84|0]+(2|3|5|7|8|9|1[2|6|8|9]))+([0-9]{9})\b/;
// email
const email =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const number = /\D/g;

export {
    vnfRegex10,
    vnfRegex11,
    email, number
}