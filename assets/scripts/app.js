import * as validator from "./validation.js";
import { regexpValidation } from "./regexp.js";

function main() {
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const birthdateInput = document.getElementById("birthdate");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const form = document.getElementById("tourneyForm");
  const terms = document.getElementById("terms");

  nameInput.addEventListener("input", (event) =>
    validator.validateRequiredField(event, regexpValidation.nameRegex)
  );
  emailInput.addEventListener("input", (event) =>
    validator.validateRequiredField(event, regexpValidation.emailRegex)
  );
  passwordInput.addEventListener("input", (event) =>
    validator.validateRequiredField(event, regexpValidation.passwordRegex)
  );
  phoneInput.addEventListener("input", (event) =>
    validator.validateUnrequiredField(event, regexpValidation.phoneRegex)
  );
  birthdateInput.addEventListener("input", (event) =>
    validator.validateUnrequiredField(event, regexpValidation.birthdateRegex)
  );
  confirmPasswordInput.addEventListener("input", (event) =>
    validator.confirmPassword(event, passwordInput)
  );
  terms.addEventListener("click", () =>
    validator.validateIfTermIsChecked(terms)
  );
  form.addEventListener("submit", (event) => validator.validateForm(event));
}

window.addEventListener("load", main);
