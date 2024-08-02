function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function passwordValidator(password) {
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasCapitalCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasLowercase && hasDigit && hasCapitalCase && hasSpecialChar;
}

function yearValidator(year) {
  return /^\d{4}$/.test(year);
}

module.exports = {
  formatPrice,
  passwordValidator,
  yearValidator,
};