"use strict";

const benchmarkRows = [...document.querySelectorAll(".benchmark-row")];
benchmarkRows.forEach((row) => {
  row.addEventListener("click", () => {
    benchmarkRows.forEach((item) => {
      item.classList.toggle("selected", item === row);
      item.setAttribute("aria-pressed", String(item === row));
    });
    document.querySelector(".benchmark-note .accent").textContent =
      row.querySelector(".model-name").textContent.replace(/[✳✧]/g, "").trim();
  });
});

const modes = [...document.querySelectorAll(".mode-switch button")];
const comparisons = [...document.querySelectorAll(".comparison-card")];
modes.forEach((button, index) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  button.addEventListener("click", () => {
    modes.forEach((item, position) => {
      item.classList.toggle("active", position === index);
      item.setAttribute("aria-pressed", String(position === index));
      comparisons[position].classList.toggle("focused", position === index);
    });
  });
});

const descriptions = {
  "Environment API": "evaluate_task(task, response) scores one answer; run_episode(client_fn, task) manages the feedback loop.",
  "Task Generator": "Generate specifications from physically valid systems.",
  "Simulator Adapter": "Translate a model action into simulator inputs and return measurements.",
  "Reward / Verifier": "Compare physical measurements with the task constraints.",
  "Trajectory": "Collect actions, measurements, rewards and outcomes.",
  "Evaluation": "Evaluate solutions against engineering specifications.",
};
const components = [...document.querySelectorAll(".component-list button")];
components.forEach((button) => {
  button.setAttribute("aria-pressed", String(button.classList.contains("active")));
  button.addEventListener("click", () => {
    components.forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    const name = button.textContent.replace("↗", "").trim();
    document.querySelector(".api-inspector > p").textContent = descriptions[name];
  });
});

if (location.protocol !== "file:") {
  fetch(new URL("./data/benchmarks.json", document.baseURI))
    .then((response) => {
      if (!response.ok) throw new Error("Benchmark data unavailable");
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) return;
      benchmarkRows.forEach((row) => {
        const name = row.querySelector(".model-name").textContent.replace(/[✳✧]/g, "").trim();
        const entry = data.find((item) => item.model === name);
        if (!entry || !Number.isFinite(entry.success_rate) || entry.success_rate < 0 || entry.success_rate > 1) return;
        row.querySelector(".bar-track > span").style.width = `${entry.success_rate * 100}%`;
        row.querySelector("strong").textContent = `${Math.round(entry.success_rate * 100)}%`;
      });
    })
    .catch(() => { /* Embedded values remain available offline. */ });
}
