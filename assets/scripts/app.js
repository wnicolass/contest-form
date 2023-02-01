import * as validator from "./modules/validation.js";
import { regexpValidation } from "./modules/regexp.js";

function main() {
  const nameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const birthdateInput = document.getElementById("birthdate");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");
  const submitButton = document.querySelector('button[type="button"]');

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
  submitButton.addEventListener("click", validator.fetchData);
}

window.addEventListener("load", main);
