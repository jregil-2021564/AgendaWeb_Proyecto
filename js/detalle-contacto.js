document.addEventListener('DOMContentLoaded', function() {
    // Obtener el ID del contacto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const contactoId = urlParams.get('id');
    
    // Obtener contacto desde localStorage o datos de ejemplo
    let contacto;
    const contactoGuardado = localStorage.getItem('contactoSeleccionado');
    
    if (contactoGuardado) {
        contacto = JSON.parse(contactoGuardado);
    } else {
        // Datos de ejemplo si no hay contacto en localStorage
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
    
// Aqui se muestran los datos del los contactos
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
        
        // Codigo para hacer funcionar el boton de favoritos
        const favBtn = document.getElementById('btnFavorite');
        favBtn.innerHTML = contacto.favorito 
            ? '<i class="fas fa-star"></i> Favorito' 
            : '<i class="far fa-star"></i> Favorito';
    }
    
    
});