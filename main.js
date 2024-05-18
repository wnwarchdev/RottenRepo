"use strict";

const currentDate = new Date().toISOString().split("T")[0];
document.getElementById("commit-date").value = currentDate;
console.log(currentDate);

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

let outputMessage;

const updateOutput = function () {
  outputMessage = `${
    commitGitAdd.checked ? `git add . && ` : ``
  }git commit --date="${commitDate.value} ${commitTime.value}" -m "${
    commitMessage.value
  }"`;
  commitOutput.innerText = outputMessage;
};

document.addEventListener(`change`, function (event) {
  event.preventDefault();
  console.log("change!");
  updateOutput();
});

document.addEventListener(`keyup`, function (event) {
  event.preventDefault();
  console.log("keyup!");
  updateOutput();
});

document.addEventListener("submit", function (event) {
  event.preventDefault();
});

function copyToClipboard() {
  var copyText = commitOutput.innerText;
  navigator.clipboard.writeText(copyText);

  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied!";
  tooltip.style.backgroundColor = "#ff9900";
  emoji.innerText = "🤮";
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
  tooltip.style.backgroundColor = "gray";
  emoji.innerText = "😖";
}

updateOutput();
