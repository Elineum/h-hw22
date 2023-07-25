"use strict";

const questions = [];
const formElement = document.querySelector(".question-form");
const div = document.createElement("p");
formElement.appendChild(div);

const formHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);

  event.submitter.disabled = true;

  fetch("http://localhost:7777/answers", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then(
      (result) =>
        (div.textContent = `You answer correct on ${result} questions!`)
    );

  setTimeout(() => {
    event.submitter.disabled = false;
  }, 1000);
};

const getFetchedQuestions = (url, arr) => {
  return fetch(url)
    .then((response) => response.json())
    .then((result) => {
      arr.push(...result);
    });
};

const getRadioBlock = (num, variant) => {
  const correctNum = num + 1;
  const lowerCasedVariant = variant.toLowerCase();
  const capitalizedVariant =
    variant.slice(0, 1).toUpperCase() + variant.slice(1);

  return `
    <div class="radio-wrap">
      <label for="question-${correctNum}">${capitalizedVariant}</label>
      <input
        type="radio" 
        value="${lowerCasedVariant}" 
        name='question-${correctNum}' 
        id='question-${correctNum}'
        required/>
    </div>`;
};

getFetchedQuestions("http://localhost:7777/questions", questions).then(() => {
  questions.forEach((q, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `
      <p class="question">${q.caption}</p>
      <div class="answers">
      ${getRadioBlock(index, "true")}
      ${getRadioBlock(index, "False")}
      </div>`;
    formElement.append(questionElement);
  });
  const sendResultButton = document.createElement("button");
  sendResultButton.textContent = "Check answers";
  //   sendResultButton.onclick = () => {
  //     sendResultButton.disabled = true;

  //     setTimeout(() => {
  //       sendResultButton.disabled = false;
  //     }, 1000);
  //   };
  formElement.append(sendResultButton);
});

formElement.addEventListener("submit", formHandler);
