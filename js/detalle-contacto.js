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
    
});