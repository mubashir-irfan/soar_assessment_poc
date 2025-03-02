export const required = (message: string) => (value: string) =>
  value.trim() ? undefined : message;

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const isEmailValid = (email: string | undefined) => email && EMAIL_REGEX.test(email)

export const isPasswordValid = (password: string | undefined) => {
  if (!password) {
    return false; // Password is required
  }

  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  // Check if all requirements are met
  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSymbol
  );
};