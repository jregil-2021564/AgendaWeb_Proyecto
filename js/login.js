document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const correoInput = document.getElementById('correo');
    
    // Almacenar el correo para usarlo en el perfil
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const correo = correoInput.value.trim();
            
            if (!correo) {
                alert('Por favor ingresa tu correo electrónico');
                return;
            }
            
            // Guardar el correo en localStorage para usarlo en el perfil
            localStorage.setItem('usuarioCorreo', correo);
            localStorage.setItem('usuarioNombre', correo.split('@')[0]);
            
            // Mostrar mensaje de éxito
            const button = loginForm.querySelector('.btn-login');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i> Redirigiendo...';
            button.style.backgroundColor = '#2e8b57';
            
            // Redirigir a la página de contactos después de un breve retraso
            setTimeout(() => {
                window.location.href = '../HTML/contactos.html';
            }, 1000);
        });
    }
    
    // Efecto de línea de cuaderno móvil
    const notebookEffect = document.querySelector('.notebook-effect');
    if (notebookEffect) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            notebookEffect.style.backgroundPositionY = `-${scrollPosition}px`;
        });
    }
    
    // Efecto de entrada para los campos de entrada
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});