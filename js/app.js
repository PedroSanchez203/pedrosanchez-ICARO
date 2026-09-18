import { TaskManager } from "./TaskManager.js";
import { TaskUI } from "./TaskUI.js";
import { Calculator } from "./Calculator.js";

const manager = new TaskManager();
const taskUI = new TaskUI(manager);
const calculator = new Calculator();

taskUI.render();
