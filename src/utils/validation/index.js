const EMAIL_VALIDATOR = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmailValid = email => EMAIL_VALIDATOR.test(String(email).toLowerCase());

// TODO
const PHONE_VALIDATOR = /^[\d-]{5,}$/;
export const isPhoneNumberValid = phone => PHONE_VALIDATOR.test(phone);
