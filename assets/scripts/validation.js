export function validateRequiredField({ target: input }, regex) {
  const errorElement = input.nextElementSibling;
  if (!regex.test(input.value)) {
    errorElement.innerHTML = "&#x274C";
    input.classList.add("error");
  } else {
    errorElement.innerHTML = "";
    input.classList.remove("error");
  }
}

export function validateUnrequiredField({ target: input }, regex) {
  const errorElement = input.nextElementSibling;

  if (!regex.test(input.value)) {
    errorElement.innerHTML = "&#x274C";
  } else {
    errorElement.innerHTML = "";
  }

  if (phoneInput.value.length === 0) {
    errorElement.innerHTML = "";
  }
}

export function confirmPassword({ target }, passwordInput) {
  const confirmPasswordInput = target;
  const errorElement = confirmPasswordInput.nextElementSibling;

  if (confirmPasswordInput.value !== passwordInput.value) {
    errorElement.innerHTML = "&#x274C";
    passwordInput.classList.add("error");
  } else {
    errorElement.innerHTML = "&#x2713";
    errorElement.style.color = "#0f0";
    passwordInput.nextElementSibling.innerHTML = "&#x2713";
    passwordInput.nextElementSibling.style.color = "#0f0";
    passwordInput.classList.remove("error");
  }
}

export function validateForm() {
  const allInputs = document.querySelectorAll("input:not([type='checkbox'])");
  const form = document.getElementById("tourneyForm");
  const terms = document.getElementById("terms");
  let hasError = false;

  allInputs.forEach((input) => {
    if (input.classList.contains("required") && input.value.trim() === "") {
      hasError = true;
    }
    if (input.classList.contains("error")) {
      hasError = true;
    }
  });

  if (!hasError && terms.checked) {
    form.submit();
  }
}
