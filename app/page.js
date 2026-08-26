"use client";

// Importamos useState porque vamos a guardar la información de la lista.
// Este componente será interactivo, por eso necesitamos estado.
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  // task guarda lo que el usuario escribe en el input.
  const [task, setTask] = useState("");

  // tasks guarda todas las tareas que se agregan a la lista.
  const [tasks, setTasks] = useState([
    { id: 1, text: "Aprender JSX", done: false },
    { id: 2, text: "Crear una función en JavaScript", done: true },
    { id: 3, text: "Probar la app en el navegador", done: false },
  ]);

  // Esta función se ejecuta cuando el usuario hace clic en "Agregar".
  const handleAddTask = () => {
    // Si el texto está vacío o solo tiene espacios, no agregamos nada.
    if (!task.trim()) {
      return;
    }

    // Creamos una nueva tarea con un id único y el texto limpio.
    const nuevaTarea = {
      id: Date.now(),
      text: task.trim(),
      done: false,
    };

    // setTasks recibe una función para mantener el estado anterior.
    setTasks((tareasAnteriores) => [nuevaTarea, ...tareasAnteriores]);

    // Limpiamos el input después de agregar la tarea.
    setTask("");
  };

  // Esta función marca o desmarca una tarea como completada.
  const handleToggleTask = (id) => {
    setTasks((tareasAnteriores) =>
      tareasAnteriores.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  // Esta función elimina una tarea de la lista.
  const handleDeleteTask = (id) => {
    setTasks((tareasAnteriores) =>
      tareasAnteriores.filter((item) => item.id !== id)
    );
  };

  // Contamos cuántas tareas están completadas.
  const completedTasks = tasks.filter((item) => item.done).length;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Proyecto para principiantes</p>
        <h1>Mi lista de tareas</h1>
        <p className={styles.subtitle}>
          Escribe lo que debes hacer hoy y marca cada tarea cuando la completes.
        </p>

        <div className={styles.inputRow}>
          <input
            type="text"
            value={task}
            placeholder="Ejemplo: Estudiar JavaScript"
            onChange={(event) => setTask(event.target.value)}
            onKeyDown={(event) => {
              // Si presiona Enter, agrega la tarea.
              if (event.key === "Enter") {
                handleAddTask();
              }
            }}
            aria-label="Nueva tarea"
          />

          <button type="button" onClick={handleAddTask}>
            Agregar
          </button>
        </div>

        <div className={styles.summary}>
          <span>{tasks.length} tareas</span>
          <span>{completedTasks} completadas</span>
        </div>

        <ul className={styles.list}>
          {tasks.length === 0 ? (
            <li className={styles.emptyState}>No hay tareas todavía. ¡Agrega una!</li>
          ) : (
            tasks.map((item) => (
              <li key={item.id} className={styles.taskItem}>
                <label className={styles.taskLabel}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleToggleTask(item.id)}
                  />
                  <span className={item.done ? styles.completedText : ""}>
                    {item.text}
                  </span>
                </label>

                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDeleteTask(item.id)}
                  aria-label={`Eliminar la tarea ${item.text}`}
                >
                  Eliminar
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
