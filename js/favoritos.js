document.addEventListener('DOMContentLoaded', function() {
    const favoritesList = document.getElementById('favoritesList');
    const emptyState = document.getElementById('emptyState');
    const totalFavorites = document.getElementById('totalFavorites');

    function cargarFavoritos() {
        const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
        const favoritos = contactosGuardados.filter(contacto => contacto.favorito);
        
        if (favoritos.length === 0) {
            favoritesList.style.display = 'none';
            emptyState.style.display = 'block';
            totalFavorites.textContent = '0';
            return;
        }
        favoritesList.style.display = 'grid';
        emptyState.style.display = 'none';
        totalFavorites.textContent = favoritos.length;

        favoritesList.innerHTML = '';
        
        favoritos.forEach((contacto, index) => {
            const card = document.createElement('div');
            card.className = 'favorite-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="favorite-header">
                    <div class="favorite-avatar">
                        <img src="${contacto.imagen}" alt="${contacto.nombre}">
                    </div>
                    <div class="favorite-info">
                        <h3>${contacto.nombre}</h3>
                        <p>${contacto.empresa || 'Sin empresa'}</p>
                    </div>
                </div>
                <div class="favorite-body">
                    <ul class="favorite-details">
                        <li>
                            <i class="fas fa-phone"></i>
                            <span>${contacto.telefono}</span>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <span>${contacto.correo || 'Sin correo'}</span>
                        </li>
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${contacto.direccion || 'Sin dirección'}</span>
                        </li>
                    </ul>
                </div>
                <button class="remove-favorite-btn" data-id="${contacto.id}">
                    <i class="fas fa-star"></i>
                </button>
            `;
            card.addEventListener('click', function(e) {
                if (!e.target.closest('.remove-favorite-btn')) {
                    localStorage.setItem('contactoSeleccionado', JSON.stringify(contacto));
                    window.location.href = `../HTML/detalle-contacto.html?id=${contacto.id}`;
                }
            });

            const removeBtn = card.querySelector('.remove-favorite-btn');
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                eliminarFavorito(contacto.id);
            });
            
            favoritesList.appendChild(card);
        });
    }
    
    function eliminarFavorito(id) {
        const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
        const contactoIndex = contactosGuardados.findIndex(c => c.id == id);
        
        if (contactoIndex !== -1) {
            contactosGuardados[contactoIndex].favorito = false;
            localStorage.setItem('contactos', JSON.stringify(contactosGuardados));

            mostrarNotificacion('Contacto eliminado de favoritos');

            cargarFavoritos();
        }
    }
    
    function mostrarNotificacion(mensaje) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = mensaje;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background-color: #0e2849;
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
    
    cargarFavoritos();
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