const validator = {
  validateEmail: (rule, value, callback) => {
    const regExpEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value && !regExpEmail.test(value)) {
      return callback(new Error("Please enter valid email address"));
    }
    callback();
  },
  validatePhone: (rule, value, callback) => {
    const regexPhone = /^[+]?[0-9]{8,15}$/;
    if (!value) {
      return callback(new Error("Please enter phone number"));
    }
    if (!regexPhone.test(value)) {
      return callback(new Error("Please enter valid phone number"));
    }
    callback();
  },
};

export default validator;
