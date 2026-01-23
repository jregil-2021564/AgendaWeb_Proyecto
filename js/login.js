document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const correoInput = document.getElementById('correo');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const correo = correoInput.value.trim();
            
            if (!correo) {
                alert('Por favor ingresa tu correo electrónico');
                return;
            }

            localStorage.setItem('usuarioCorreo', correo);
            localStorage.setItem('usuarioNombre', correo.split('@')[0]);

            const button = loginForm.querySelector('.btn-login');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-check"></i> Redirigiendo...';
            button.style.backgroundColor = '#2e8b57';

            setTimeout(() => {
                window.location.href = '../HTML/contactos.html';
            }, 1000);
        });
    }

    const notebookEffect = document.querySelector('.notebook-effect');
    if (notebookEffect) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            notebookEffect.style.backgroundPositionY = `-${scrollPosition}px`;
        });
    }

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