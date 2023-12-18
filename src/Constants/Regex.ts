const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

function isEmailValid(email: string): boolean {
  return emailRegex.test(email);
}

export default isEmailValid;
