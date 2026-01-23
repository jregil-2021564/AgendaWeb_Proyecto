document.addEventListener('DOMContentLoaded', function() {
    const contactsList = document.getElementById('contactsList');

    const contactos = [
        {
            id: 1,
            nombre: "María González",
            telefono: "+502 87965413",
            correo: "maria.gonzalez@ejemplo.com",
            direccion: "Guatemala, Mixo",
            empresa: "Tech Solutions S.A.",
            imagen: "https://randomuser.me/api/portraits/women/32.jpg",
            favorito: true
        },
        {
            id: 2,
            nombre: "Carlos Rodríguez",
            telefono: "+502 21365897",
            correo: "carlos.rodriguez@ejemplo.com",
            direccion: "Guatemala, Zona 7 ",
            empresa: "Innovación Digital",
            imagen: "https://randomuser.me/api/portraits/men/75.jpg",
            favorito: true
        },
        {
            id: 3,
            nombre: "Ana Martínez",
            telefono: "+502 89743652",
            correo: "ana.martinez@ejemplo.com",
            direccion: "Guatemala, Ciudad de Guatemala",
            empresa: "Marketing Creativo",
            imagen: "https://randomuser.me/api/portraits/women/44.jpg",
            favorito: false
        },
        {
            id: 4,
            nombre: "Pedro Sánchez",
            telefono: "+502 98741023",
            correo: "pedro.sanchez@ejemplo.com",
            direccion: "Quetzaltenango, Guatemala",
            empresa: "Arquitectura Moderna",
            imagen: "https://randomuser.me/api/portraits/men/22.jpg",
            favorito: false
        },
        {
            id: 5,
            nombre: "Laura Fernández",
            telefono: "+502 10203654",
            correo: "laura.fernandez@ejemplo.com",
            direccion: "Guatemala, Zona 2",
            empresa: "Consultoría Empresarial",
            imagen: "https://randomuser.me/api/portraits/women/65.jpg",
            favorito: false
        },
        {
            id: 6,
            nombre: "Javier López",
            telefono: "+502 98745321",
            correo: "javier.lopez@ejemplo.com",
            direccion: "Guatemala, Zona 17",
            empresa: "Desarrollo Web",
            imagen: "https://randomuser.me/api/portraits/men/33.jpg",
            favorito: false
        }
    ];

    function mostrarContactos() {
        contactsList.innerHTML = '';
        
        contactos.forEach((contacto, index) => {
            const card = document.createElement('div');
            card.className = 'contact-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="contact-header">
                    <div class="contact-avatar">
                        <img src="${contacto.imagen}" alt="${contacto.nombre}">
                    </div>
                    <div class="contact-info">
                        <h3>${contacto.nombre}</h3>
                        <p>${contacto.empresa}</p>
                    </div>
                </div>
                <div class="contact-body">
                    <ul class="contact-details">
                        <li>
                            <i class="fas fa-phone"></i>
                            <span>${contacto.telefono}</span>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <span>${contacto.correo}</span>
                        </li>
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${contacto.direccion}</span>
                        </li>
                        <li>
                            <i class="fas fa-building"></i>
                            <span>${contacto.empresa}</span>
                        </li>
                    </ul>
                </div>
                <button class="favorite-btn" data-id="${contacto.id}">
                    <i class="${contacto.favorito ? 'fas' : 'far'} fa-star"></i>
                </button>
            `;

            card.addEventListener('click', function(e) {
                if (!e.target.closest('.favorite-btn')) {
                    localStorage.setItem('contactoSeleccionado', JSON.stringify(contacto));
                    window.location.href = `detalle-contacto.html?id=${contacto.id}`;
                }
            });

            const favBtn = card.querySelector('.favorite-btn');
            favBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleFavorito(contacto.id);
            });
            
            contactsList.appendChild(card);
        });
    }

    function toggleFavorito(id) {
        const contacto = contactos.find(c => c.id === id);
        if (contacto) {
            contacto.favorito = !contacto.favorito;
            mostrarContactos();

            localStorage.setItem('contactos', JSON.stringify(contactos));
        }
    }
    
    // Cargar contactos del localStorage si existen
    //const contactosGuardados = localStorage.getItem('contactos');
    //if (contactosGuardados) {
    //    Object.assign(contactos, JSON.parse(contactosGuardados));
    //}
    
    mostrarContactos();

    const notebookLines = document.querySelector('.notebook-lines');
    if (notebookLines) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            notebookLines.style.backgroundPositionY = `${scrollPosition}px`;
        });
    }
});