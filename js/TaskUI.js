export class TaskUI {
  constructor(manager) {
    this.manager = manager;
    this.tareaEditando = null;

    this.nombre = document.getElementById("nombreTarea");
    this.prioridad = document.getElementById("prioridadTarea");
    this.vencimiento = document.getElementById("fechaVencimiento");
    this.btnAgregar = document.getElementById("agregarTarea");
    this.listado = document.getElementById("listadoTareas");
    this.pendientes = document.getElementById("tareasPendientes");

    this.btnAgregar.addEventListener("click", () => this.handleAgregar());
  }

  handleAgregar() {
    const nombre = this.nombre.value.trim();
    const prioridad = this.prioridad.value;
    const vencimiento = this.vencimiento.value;

    if (!nombre || !prioridad || !vencimiento) {
      alert("Debes completar todos los campos");
      return;
    }

    if (this.tareaEditando) {
      this.manager.editar(
        this.tareaEditando.id,
        nombre,
        prioridad,
        vencimiento
      );
      this.tareaEditando = null;
      this.btnAgregar.textContent = "Agregar Tarea";
      this.btnAgregar.className = "btn btn-primary w-100";
    } else {
      this.manager.agregar(nombre, prioridad, vencimiento);
    }

    this.limpiarFormulario();
    this.render();
  }

  cargarParaEdicion(tarea) {
    this.nombre.value = tarea.nombre;
    this.prioridad.value = tarea.prioridad;
    this.vencimiento.value = tarea.vencimiento;

    this.tareaEditando = tarea;
    this.btnAgregar.textContent = "Guardar Cambios";
    this.btnAgregar.className = "btn btn-success w-100";
  }

  render() {
    this.listado.innerHTML = "";
    const tareas = this.manager.obtenerTareas();

    if (tareas.length === 0) {
      const vacio = document.createElement("li");
      vacio.className = "list-group-item text-center text-muted py-3";
      vacio.textContent = "No hay tareas registradas.";
      this.listado.appendChild(vacio);
    } else {
      tareas.forEach((tarea) => {
        this.listado.appendChild(this.crearItemTarea(tarea));
      });
    }

    this.actualizarPendientes();
  }

  crearItemTarea(tarea) {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap gap-2";

    const contDatos = document.createElement("div");
    contDatos.className = "d-flex align-items-center gap-3";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input mt-0";
    checkbox.checked = tarea.completada;

    checkbox.addEventListener("change", () => {
      this.manager.marcarCompletada(tarea.id);
      this.render();
    });

    const info = document.createElement("div");
    const texto = document.createElement("span");
    texto.textContent = tarea.nombre;
    texto.className = "fw-semibold";

    if (tarea.completada) {
      texto.classList.add("text-decoration-line-through", "text-muted");
    }

    const badgePrioridad = document.createElement("span");
    badgePrioridad.className = `badge ms-2 ${this.obtenerColorPrioridad(tarea.prioridad)}`;
    badgePrioridad.textContent = tarea.prioridad;

    const fecha = document.createElement("small");
    fecha.className = "text-muted d-block";
    fecha.textContent = `Vence: ${tarea.vencimiento}`;

    info.append(texto, badgePrioridad, fecha);
    contDatos.append(checkbox, info);

    const contBotones = document.createElement("div");
    contBotones.className = "d-flex gap-2";

    const btnEditar = this.crearBoton("Editar", "btn btn-sm btn-outline-primary");
    const btnEliminar = this.crearBoton("Eliminar", "btn btn-sm btn-outline-danger");

    btnEditar.addEventListener("click", () => this.cargarParaEdicion(tarea));
    btnEliminar.addEventListener("click", () => {
      this.manager.eliminar(tarea.id);
      this.render();
    });

    contBotones.append(btnEditar, btnEliminar);
    item.append(contDatos, contBotones);

    return item;
  }

  obtenerColorPrioridad(prioridad) {
    if (prioridad === "Alta") return "bg-danger";
    if (prioridad === "Media") return "bg-warning text-dark";
    return "bg-secondary";
  }

  crearBoton(texto, clase) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = clase;
    return btn;
  }

  actualizarPendientes() {
    this.pendientes.textContent = `Tareas pendientes: ${this.manager.obtenerPendientes()}`;
  }

  limpiarFormulario() {
    this.nombre.value = "";
    this.prioridad.value = "Media";
    this.vencimiento.value = "";
  }
}