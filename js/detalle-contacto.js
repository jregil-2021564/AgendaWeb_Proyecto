document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const contactoId = urlParams.get('id');

    let contacto;
    const contactoGuardado = localStorage.getItem('contactoSeleccionado');
    
    if (contactoGuardado) {
        contacto = JSON.parse(contactoGuardado);
    } else {
        contacto = {
            id: 1,
            nombre: "María González",
            telefono: "+34 600 123 456",
            correo: "maria.gonzalez@ejemplo.com",
            direccion: "Calle Principal 123, Madrid",
            empresa: "Tech Solutions S.A.",
            imagen: "https://randomuser.me/api/portraits/women/32.jpg",
            favorito: true,
            fechaNacimiento: "1990-05-15",
            notas: "Contacto importante para reuniones mensuales. Le gusta el café negro sin azúcar."
        };
    }

    function mostrarDetalleContacto() {
        document.getElementById('contactImage').src = contacto.imagen;
        document.getElementById('contactName').textContent = contacto.nombre;
        document.getElementById('contactCompany').textContent = contacto.empresa;
        document.getElementById('contactCompanyFull').textContent = contacto.empresa;
        document.getElementById('contactPhone').textContent = contacto.telefono;
        document.getElementById('contactEmail').textContent = contacto.correo;
        document.getElementById('contactAddress').textContent = contacto.direccion;
        document.getElementById('contactBirthday').textContent = contacto.fechaNacimiento 
            ? new Date(contacto.fechaNacimiento).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }) 
            : 'No especificada';
        
        if (contacto.notas) {
            document.getElementById('contactNotes').textContent = contacto.notas;
        }

        const favBtn = document.getElementById('btnFavorite');
        favBtn.innerHTML = contacto.favorito 
            ? '<i class="fas fa-star"></i> Favorito' 
            : '<i class="far fa-star"></i> Favorito';
    }

    document.getElementById('btnCall').addEventListener('click', function() {
        alert(`Llamando a ${contacto.nombre} al número ${contacto.telefono}`);
    });
    
    document.getElementById('btnMessage').addEventListener('click', function() {
        alert(`Enviando mensaje a ${contacto.nombre}`);
    });
    
    document.getElementById('btnEmail').addEventListener('click', function() {
        alert(`Enviando correo a ${contacto.correo}`);
    });
    
    document.getElementById('btnFavorite').addEventListener('click', function() {
        contacto.favorito = !contacto.favorito;

        const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
        const index = contactosGuardados.findIndex(c => c.id == contacto.id);
        if (index !== -1) {
            contactosGuardados[index].favorito = contacto.favorito;
            localStorage.setItem('contactos', JSON.stringify(contactosGuardados));
        }

        this.innerHTML = contacto.favorito 
            ? '<i class="fas fa-star"></i> Favorito' 
            : '<i class="far fa-star"></i> Favorito';

        this.style.backgroundColor = contacto.favorito 
            ? 'rgba(255, 215, 0, 0.3)' 
            : 'rgba(255, 255, 255, 0.2)';

        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    const notebookLines = document.querySelector('.notebook-lines');
    if (notebookLines) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            notebookLines.style.backgroundPositionY = `${scrollPosition}px`;
        });
    }

    mostrarDetalleContacto();

});