const AUTH_SUCCESS_MESSAGES = {
    REGISTER: 'Register successfully',
    LOGIN: 'Login successfully'
};

const AUTH_ERROR_MESSAGES = {
    USERNAME_IS_STRING: 'Username must be a string',
    EMAIL_IS_STRING: 'Email must be a string',
    EMAIL_IS_REQUIRED: 'Email is required',
    PHONE_NUMBER_IS_STRING: 'Phone number must be a string',
    PASSWORD_IS_STRING: 'Password must be a string',
    PASSWORD_IS_REQUIRED: 'Password is required',
    CONFIRM_PASSWORD_IS_STRING: 'Confirm password must be a string',
    CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',

    EMAIL_EXISTED: 'Email already existed',
    CONFIRM_PASSWORD_NOT_MATCH: 'Confirm password not match with password',
    INVALID_CREDENTIALS: 'Invalid credentials'
};

export { AUTH_SUCCESS_MESSAGES, AUTH_ERROR_MESSAGES };
