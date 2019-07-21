const EMAIL_VALIDATOR = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmailValid = email => EMAIL_VALIDATOR.test(String(email).toLowerCase());

const PHONE_VALIDATOR = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
export const isPhoneNumberValid = phone => PHONE_VALIDATOR.test(phone);
