const btnSend = document.querySelector("#send");
const btnClean = document.querySelector("#clear");
const formEmail = document.querySelector("#send-email");

const email = document.querySelector("#email");
const issue = document.querySelector("#issue");
const message = document.querySelector("#message");

iniciarApp();

function iniciarApp() {
  // Disabled button send
  disabledBtn(true);

  // Inputs validation
  email.addEventListener("blur", validateForm);
  issue.addEventListener("blur", validateForm);
  message.addEventListener("blur", validateForm);

  // Submit form
  formEmail.addEventListener("submit", completedForm);

  // Clean form
  btnClean.addEventListener("click", cleanForm);
}

// Disabled button send email
function disabledBtn(condition) {
  if (condition) {
    btnSend.disabled = true;
    btnSend.className = "form-btn send-disabled";
  } else {
    btnSend.disabled = false;
    btnSend.className = "form-btn send";
  }
}

function cleanForm(e) {
  e.preventDefault();
  formEmail.reset();

  email.className = "form-email__input";
  issue.className = "form-email__input";
  message.className = "form-email__input textarea";

  // Delete messages error in screen
  const removeMessagesError = document.querySelectorAll(
    ".form-email__message.error"
  );

  if (removeMessagesError.length > 0) {
    removeMessagesError[0].remove();
  }
}

function validateForm(e) {
  const removeMessagesError = document.querySelector(
    ".form-email__message.error"
  );
  const errors = document.querySelectorAll(".form-email__message.error");

  // Regular phrase for email
  const rpEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (e.target.value.length > 0) {
    // Delete message error
    if (errors.length > 0) {
      removeMessagesError.remove();
    }

    e.target.classList.remove("error");
    e.target.classList.add("completed");
  } else {
    e.target.classList.remove("completed");
    e.target.classList.add("error");

    showErrorInfo("All fields are required");
  }

  if (e.target.type === "email") {
    if (rpEmail.test(e.target.value)) {
      // Delete message error
      if (errors.length > 0) {
        removeMessagesError.remove();
      }

      e.target.classList.remove("error");
      e.target.classList.add("completed");
    } else {
      e.target.classList.remove("completed");
      e.target.classList.add("error");
      showErrorInfo("Enter a valid email");
    }
  }

  if (rpEmail.test(email.value) && issue.value !== "" && message.value !== "") {
    disabledBtn(false);
  }
}

function showErrorInfo(message) {
  const textError = document.createElement("p");
  textError.textContent = message;
  textError.className = "form-email__message error";

  const errors = document.querySelectorAll(".form-email__message.error");

  if (errors.length > 0) {
    document.querySelector(".form-email__message.error").remove();
    formEmail.insertAdjacentElement("afterbegin", textError);
  } else {
    formEmail.insertAdjacentElement("afterbegin", textError);
  }
}

function completedForm(e) {
  cleanForm(e);

  const textCompleted = document.createElement("p");
  textCompleted.textContent = "Email sent successfully";
  textCompleted.className = "form-email__message completed";

  formEmail.insertAdjacentElement("afterbegin", textCompleted);

  const message = document.querySelector(".form-email__message.completed");

  disabledBtn(true);

  setTimeout(() => {
    message.remove();
  }, 2000);
}
