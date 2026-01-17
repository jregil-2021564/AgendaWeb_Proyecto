// Script compartido para todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    const userNameElements = document.querySelectorAll('#userName, #userNameHeader');
    const usuarioNombre = localStorage.getItem('usuarioNombre') || 'Usuario';
    
    userNameElements.forEach(element => {
        if (element) {
            element.textContent = usuarioNombre.charAt(0).toUpperCase() + usuarioNombre.slice(1);
        }
    });

    const buttons = document.querySelectorAll('button, .btn-action, .security-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const cards = document.querySelectorAll('.contact-card, .favorite-card');
    cards.forEach(card => {
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    const currentPage = window.location.pathname;
    if (!currentPage.includes('login') && !localStorage.getItem('usuarioCorreo')) {
        alert('Por favor inicia sesión para continuar');
        window.location.href = '../HTML/index.html';
    }

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});