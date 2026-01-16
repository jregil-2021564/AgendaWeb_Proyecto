document.addEventListener('DOMContentLoaded', function() {
    const usuarioCorreo = localStorage.getItem('usuarioCorreo') || 'usuario@ejemplo.com';
    const usuarioNombre = localStorage.getItem('usuarioNombre') || 'Usuario';
    
    function configurarPerfil() {

        document.getElementById('userNameHeader').textContent = usuarioNombre;

        document.getElementById('userFullName').textContent = usuarioNombre.charAt(0).toUpperCase() + usuarioNombre.slice(1);
        document.getElementById('profileName').textContent = usuarioNombre.charAt(0).toUpperCase() + usuarioNombre.slice(1);
        document.getElementById('profileEmail').textContent = usuarioCorreo;
        document.getElementById('userAvatar').src = usuarioCorreo.includes('@') 
            ? '../IMG/imagen1.jpg' 
            : '../IMG/imagen1.jpg';

        const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
        const favoritos = contactosGuardados.filter(c => c.favorito).length;
        const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
        
        document.getElementById('totalContacts').textContent = contactosGuardados.length;
        document.getElementById('totalFavorites').textContent = favoritos;
        document.getElementById('totalTasks').textContent = tareasGuardadas.length;

        const fechaRegistro = new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        document.getElementById('profileJoinDate').textContent = fechaRegistro;
        document.getElementById('userTitle').textContent = `Miembro desde ${fechaRegistro}`;
    }

    document.getElementById('btnEditProfile').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
        this.disabled = true;
        
        setTimeout(() => {
            alert('La función de editar perfil estará disponible en la próxima versión');
            this.innerHTML = '<i class="fas fa-edit"></i> Editar Perfil';
            this.disabled = false;
        }, 1500);
    });
    
    document.getElementById('btnChangePassword').addEventListener('click', function() {
        alert('La función de cambiar contraseña estará disponible en la próxima versión');
    });
    
    document.getElementById('btnTwoFactor').addEventListener('click', function() {
        alert('La autenticación en dos pasos estará disponible en la próxima versión');
    });
    
    document.getElementById('btnDeleteAccount').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
            alert('Tu cuenta ha sido eliminada. Redirigiendo al login...');
            setTimeout(() => {
                window.location.href = '../HTML/index.html';
            }, 2000);
        }
    });

    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
    
    if (localStorage.getItem('darkMode') === 'true') {
        darkModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    }
    
    const notebookLines = document.querySelector('.notebook-lines');
    if (notebookLines) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            notebookLines.style.backgroundPositionY = `${scrollPosition}px`;
        });
    }
    
    configurarPerfil();
});