document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');
    const fabAddTask = document.getElementById('fabAddTask');
    
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    let filtroActual = 'todas';
    let ordenActual = 'fecha';

    actualizarEstadisticas();
    mostrarTareas();
    
    addTaskBtn.addEventListener('click', agregarTarea);
    fabAddTask.addEventListener('click', function() {
        taskInput.focus();
        taskInput.scrollIntoView({ behavior: 'smooth' });
    });
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarTarea();
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtroActual = this.dataset.filter;
            mostrarTareas();
        });
    });

    sortSelect.addEventListener('change', function() {
        ordenActual = this.value;
        mostrarTareas();
    });
    
    function agregarTarea() {
        const texto = taskInput.value.trim();
        const prioridad = prioritySelect.value;
        
        if (!texto) {
            alert('Por favor ingresa una tarea');
            taskInput.focus();
            return;
        }
        
        const nuevaTarea = {
            id: Date.now(),
            texto: texto,
            prioridad: prioridad,
            completada: false,
            fecha: new Date().toISOString()
        };
        
        tareas.unshift(nuevaTarea);
        guardarTareas();
        mostrarTareas();
        
        taskInput.value = '';
        taskInput.focus();
        
        mostrarNotificacion('Tarea agregada correctamente');
    }
    
    function mostrarTareas() {
        let tareasFiltradas = [...tareas];
        
        if (filtroActual === 'pendientes') {
            tareasFiltradas = tareasFiltradas.filter(t => !t.completada);
        } else if (filtroActual === 'completadas') {
            tareasFiltradas = tareasFiltradas.filter(t => t.completada);
        }

        tareasFiltradas.sort((a, b) => {
            if (ordenActual === 'prioridad') {
                const prioridadOrden = { alta: 1, media: 2, baja: 3 };
                return prioridadOrden[a.prioridad] - prioridadOrden[b.prioridad];
            } else if (ordenActual === 'nombre') {
                return a.texto.localeCompare(b.texto);
            } else {
                return new Date(b.fecha) - new Date(a.fecha);
            }
        });

        if (tareasFiltradas.length === 0) {
            tasksList.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            tasksList.style.display = 'flex';
            emptyState.style.display = 'none';

            tasksList.innerHTML = '';
            
            tareasFiltradas.forEach((tarea, index) => {
                const taskItem = document.createElement('div');
                taskItem.className = `task-item ${tarea.prioridad} ${tarea.completada ? 'completed' : ''}`;
                taskItem.style.animationDelay = `${index * 0.1}s`;
                
                const fechaFormateada = new Date(tarea.fecha).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
                
                taskItem.innerHTML = `
                    <input type="checkbox" class="task-checkbox" ${tarea.completada ? 'checked' : ''} data-id="${tarea.id}">
                    <div class="task-content">
                        <div class="task-text">${tarea.texto}</div>
                        <div class="task-meta">
                            <span class="task-priority ${tarea.prioridad}">${tarea.prioridad}</span>
                            <span class="task-date">
                                <i class="far fa-calendar"></i>
                                ${fechaFormateada}
                            </span>
                        </div>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn edit" data-id="${tarea.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-btn delete" data-id="${tarea.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                
                tasksList.appendChild(taskItem);
            });

            document.querySelectorAll('.task-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    toggleCompletada(parseInt(this.dataset.id));
                });
            });
            
            document.querySelectorAll('.task-btn.edit').forEach(btn => {
                btn.addEventListener('click', function() {
                    editarTarea(parseInt(this.dataset.id));
                });
            });
            
            document.querySelectorAll('.task-btn.delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    eliminarTarea(parseInt(this.dataset.id));
                });
            });
        }
        
        actualizarEstadisticas();
    }
    
    function toggleCompletada(id) {
        const tareaIndex = tareas.findIndex(t => t.id === id);
        if (tareaIndex !== -1) {
            tareas[tareaIndex].completada = !tareas[tareaIndex].completada;
            guardarTareas();
            mostrarTareas();
            
            const mensaje = tareas[tareaIndex].completada 
                ? '¡Tarea completada!' 
                : 'Tarea marcada como pendiente';
            mostrarNotificacion(mensaje);
        }
    }
    
    function editarTarea(id) {
        const tarea = tareas.find(t => t.id === id);
        if (!tarea) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Editar Tarea</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <input type="text" class="modal-input" id="editTaskInput" value="${tarea.texto}" maxlength="100">
                    <select class="modal-select" id="editPrioritySelect">
                        <option value="alta" ${tarea.prioridad === 'alta' ? 'selected' : ''}>Alta Prioridad</option>
                        <option value="media" ${tarea.prioridad === 'media' ? 'selected' : ''}>Media Prioridad</option>
                        <option value="baja" ${tarea.prioridad === 'baja' ? 'selected' : ''}>Baja Prioridad</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button class="btn-cancel">Cancelar</button>
                    <button class="btn-save">Guardar Cambios</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        const editTaskInput = modal.querySelector('#editTaskInput');
        editTaskInput.focus();
        editTaskInput.select();

        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.btn-cancel').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.querySelector('.btn-save').addEventListener('click', () => {
            const nuevoTexto = editTaskInput.value.trim();
            const nuevaPrioridad = modal.querySelector('#editPrioritySelect').value;
            
            if (!nuevoTexto) {
                alert('Por favor ingresa un texto para la tarea');
                return;
            }
            
            tarea.texto = nuevoTexto;
            tarea.prioridad = nuevaPrioridad;
            guardarTareas();
            mostrarTareas();
            document.body.removeChild(modal);
            
            mostrarNotificacion('Tarea actualizada correctamente');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    function eliminarTarea(id) {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            tareas = tareas.filter(t => t.id !== id);
            guardarTareas();
            mostrarTareas();
            mostrarNotificacion('Tarea eliminada');
        }
    }
    
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
    
    function actualizarEstadisticas() {
        const total = tareas.length;
        const completadas = tareas.filter(t => t.completada).length;
        
        totalTasks.textContent = total;
        completedTasks.textContent = completadas;
    }
    
    function mostrarNotificacion(mensaje) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = mensaje;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background-color: #2e4a7a;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    const notebookLines = document.querySelector('.notebook-lines');
    if (notebookLines) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            notebookLines.style.backgroundPositionY = `${scrollPosition}px`;
        });
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);