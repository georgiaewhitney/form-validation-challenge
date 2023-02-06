// grab form
const form = document.querySelector("form");

// select fields
const fields = form.querySelectorAll("input, textarea");

// tell form to not do own validation
// using novalidate attribute
form.setAttribute("novalidate", "");

// challenge 5 - step 1
// set aria-invalid field attribute
fields.forEach((field) => {
  // ensures all are false (valid) until checked
  field.setAttribute("aria-invalid", "false");

  // create a feedback message for the user
  const feedback = document.createElement("p");
  const id = field.id + "Error";
  feedback.setAttribute("id", id);

  // prevent aria-describedBy overwrite
  const prevIds = field.getAttribute("aria-describedBy");
  const describedBy = prevIds ? prevIds + " " + id : id;
  field.setAttribute("aria-describedBy", describedBy);

  field.after(feedback);
  // challenge 5 - step 2
  // when field fails, mark it as true (invalid)
  // update attribute when field fails
  field.addEventListener("invalid", () => {
    field.setAttribute("aria-invalid", "true");
    const message = field.validationMessage;
    feedback.textContent = message;
  });

  // clear invalid state after field edited
  field.addEventListener("input", () => {
    field.setAttribute("aria-invalid", "false");
    feedback.textContent = "";
  });
});

// listen for submit / push form through
form.addEventListener("submit", (event) => {
  // prevent submission if invalid fields
  const allValid = form.checkValidity();
  if (!allValid) {
    event.preventDefault();
  }
});
