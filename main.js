"use strict";

const currentDate = new Date().toISOString().split("T")[0];
document.getElementById("commit-date").value = currentDate;

const now = new Date();
const currentHour = now.getHours().toString().padStart(2, "0");
const currentMinute = now.getMinutes().toString().padStart(2, "0");
const currentSecond = now.getSeconds().toString().padStart(2, "0");
const currentTime = `${currentHour}:${currentMinute}:${currentSecond}`;
document.getElementById("commit-time").value = currentTime;

const commitGitAdd = document.getElementById("commit-gitAdd");
const commitOutput = document.getElementById("commit-output");
const commitDate = document.getElementById("commit-date");
const commitTime = document.getElementById("commit-time");
const commitMessage = document.getElementById("commit-message");
const form = document.getElementById("form");
const emoji = document.getElementById("emoji");
const checkbox = document.getElementById("checkbox");
const buttonCopy = null;
const buttonOops = document.getElementById("oops-button");

let outputMessage;

function sanitizeInput(input) {
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
}

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
  outputMessage = `${
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

checkbox.addEventListener("change", function () {
  if (commitGitAdd.checked) {
    checkbox.style.backgroundColor = "#ff9900";
    checkbox.style.textDecoration = "none";
  } else {
    checkbox.style.backgroundColor = "white";
    checkbox.style.textDecoration = "line-through";
  }
});

function copyToClipboard() {
  var copyText = commitOutput.innerText;
  navigator.clipboard.writeText(copyText);

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied!";
  tooltip.style.backgroundColor = "#ff9900";
  emoji.innerText = "🤮";
}

function undoCommit() {
  commitOutput.innerText = "git reset --soft HEAD~";
}

function cleanPage() {
  location.reload();
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
  tooltip.style.backgroundColor = "gray";
  emoji.innerText = "😖";
}

updateOutput();
