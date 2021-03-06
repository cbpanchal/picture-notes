export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const required = value => (value ? undefined : "Required");

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength6 = minLength(6);

export const confirmPasswordValidation = (
  value,
  { password, confirmPassword }
) =>
  password === confirmPassword
    ? undefined
    : "Password does not match the confirm password";
