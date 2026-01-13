const display = document.getElementById("calculator_display");

const PROMPT = "C:\\Users\\Admin> ";
let currentInput = "";

// Startup text
display.value =
`Microsoft Windows [Version 10.0.19045.6466]
(c) Microsoft Corporation. All rights reserved.

${PROMPT}`;

// Scroll to bottom
function scrollDown() {
  display.scrollTop = display.scrollHeight;
}

// Add text to display
function print(text = "") {
  display.value += text + "\n";
  scrollDown();
}

// Handle calculator / CMD input
function PutInDisplay(value) {

  if (value === "Clear") {
    display.value = `${PROMPT}`;
    currentInput = "";
    return;
  }

  if (value === "Delete") {
    currentInput = currentInput.slice(0, -1);
    refreshLine();
    return;
  }

  if (value === "=") {
    executeCommand();
    return;
  }

  currentInput += value;
  refreshLine();
}

// Refresh current CMD line
function refreshLine() {
  const lines = display.value.split("\n");
  lines[lines.length - 1] = PROMPT + currentInput;
  display.value = lines.join("\n");
  scrollDown();
}

// Execute command / calculation
function executeCommand() {
  // If no input, just create a new prompt line (like real CMD)
  if (currentInput.trim() === "") {
    print(PROMPT);
    return;
  }

  // Move to new line before output
  print("");

  if (currentInput.toLowerCase() === "cls") {
    display.value = PROMPT;
    currentInput = "";
    return;
  }

  try {
    const result = eval(currentInput);
    print(result);
  } catch {
    print(`'${currentInput}' is not recognized as an internal or external command.`);
  }

  // Always end with a fresh prompt
  print(PROMPT);
  currentInput = "";
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if ("0123456789+-*/.".includes(e.key)) {
    PutInDisplay(e.key);
  } else if (e.key === "Enter") {
    e.preventDefault();
    PutInDisplay("=");
  } else if (e.key === "Backspace") {
    PutInDisplay("Delete");
  }
});
