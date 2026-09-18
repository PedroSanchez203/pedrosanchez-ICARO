import { Task } from "./Task.js";

export class TaskManager {
  constructor() {
    this.tareas = [];
    this.nextId = 1;
  }

  agregar(nombre, prioridad, vencimiento) {
    const tarea = new Task(this.nextId++, nombre, prioridad, vencimiento);
    this.tareas.push(tarea);
  }

  editar(id, nombre, prioridad, vencimiento) {
    const tarea = this.tareas.find((t) => t.id === id);
    if (tarea) {
      tarea.nombre = nombre;
      tarea.prioridad = prioridad;
      tarea.vencimiento = vencimiento;
    }
  }

  eliminar(id) {
    this.tareas = this.tareas.filter((t) => t.id !== id);
  }

  marcarCompletada(id) {
    const tarea = this.tareas.find((t) => t.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada;
    }
  }

  obtenerTareas() {
    return [...this.tareas];
  }

  obtenerPendientes() {
    return this.tareas.filter((t) => !t.completada).length;
  }
}