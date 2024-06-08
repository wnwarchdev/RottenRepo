"use strict";

//elements by ID

const commitGitAdd = document.getElementById("commit-gitAdd");
const commitOutput = document.getElementById("commit-output");
const commitDate = document.getElementById("commit-date");
const commitTime = document.getElementById("commit-time");
const commitMessage = document.getElementById("commit-message");
const copyclip = document.getElementById("copyclip");
const emoji = document.getElementById("emoji");
const checkbox = document.getElementById("checkbox");
const buttonCopy = document.getElementById("copy-button");
const buttonOops = document.getElementById("oops-button");
const buttonClear = document.getElementById("clear-button");
const buttonReset = document.getElementById("reset-button");

//get initial date
const currentDate = new Date().toISOString().split("T")[0];
commitDate.value = currentDate;

//set max date
commitDate.max = currentDate;

//set min date
commitDate.min = `2010-01-01`;

//get initial time
const now = new Date();
const currentHour = now.getHours().toString().padStart(2, "0");
const currentMinute = now.getMinutes().toString().padStart(2, "0");
const currentSecond = now.getSeconds().toString().padStart(2, "0");
const currentTime = `${currentHour}:${currentMinute}:${currentSecond}`;
commitTime.value = currentTime;

const sanitizeInput = function (input) {
  // Create a map of characters to be escaped
  const charMap = {
    "\\": "\\\\",
    '"': '\\"',
    "'": "\\'",
    $: "\\$",
    "`": "\\`",
    "|": "\\|",
    "<": "\\<",
    ">": "\\>",
    "\n": "\\n",
    "\r": "\\r",
  };
  // Use replace method with a regex and the map
  return input
    .replace(/[\\\"'$`|<>]/g, (match) => charMap[match])
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
};

const disallowedCharsRegex = /[\\\"'$`|<>]/g;

document
  .getElementById("commit-message")
  .addEventListener("input", function (event) {
    const input = event.target.value;
    const sanitizedInput = input.replace(disallowedCharsRegex, "");
    if (input !== sanitizedInput) {
      event.target.value = sanitizedInput;
    }
  });

const updateOutput = function () {
  const sanitizedMessage = sanitizeInput(commitMessage.value);
  const outputMessage = `${
    commitGitAdd.checked ? `git add . && ` : ``
  }git commit --date="${commitDate.value} ${
    commitTime.value
  }" -m "${sanitizedMessage}"`;
  commitOutput.innerText = outputMessage;
};

document.addEventListener(`change`, function (event) {
  event.preventDefault();
  updateOutput();
});

document.addEventListener(`keyup`, function (event) {
  event.preventDefault();
  updateOutput();
});

document.addEventListener("submit", function (event) {
  event.preventDefault();
});

commitMessage.addEventListener("paste", function (event) {
  event.preventDefault();
});

checkbox.addEventListener("change", function () {
  if (commitGitAdd.checked) {
    checkbox.style.backgroundColor = "#ff9900";
    checkbox.style.textDecoration = "none";
  } else {
    checkbox.style.backgroundColor = "white";
    checkbox.style.textDecoration = "line-through";
  }
});

const copyToClipboard = function () {
  const copyText = commitOutput.innerText;
  navigator.clipboard.writeText(copyText);

  copyclip.innerHTML = "Copied!";
  copyclip.style.backgroundColor = "#ff9900";
  emoji.innerText = "🤮";
};

const undoCommit = function () {
  commitOutput.innerText = "git reset --soft HEAD~";
};

const clearMessage = function () {
  commitMessage.value = "";
  updateOutput();
};

const resetPage = function () {
  location.reload();
};

const outFunc = function () {
  copyclip.innerHTML = "Copy to clipboard";
  copyclip.style.backgroundColor = "gray";
  emoji.innerText = "😖";
};

buttonReset.addEventListener("click", function (e) {
  e.preventDefault;
  resetPage();
});

buttonClear.addEventListener("click", function (e) {
  e.preventDefault;
  clearMessage();
});

buttonOops.addEventListener("click", function (e) {
  e.preventDefault;
  undoCommit();
});

buttonCopy.addEventListener("click", function (e) {
  e.preventDefault;
  copyToClipboard();
});

updateOutput();
