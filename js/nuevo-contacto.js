document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const contacto = Object.fromEntries(formData.entries());
            
            if (!contacto.nombre || !contacto.telefono) {
                alert('Por favor completa los campos obligatorios (Nombre y Teléfono)');
                return;
            }
            
            contacto.id = Date.now();
            contacto.favorito = document.getElementById('favorito').checked;
            
            const genero = Math.random() > 0.5 ? 'men' : 'women';
            const randomId = Math.floor(Math.random() * 99) + 1;
            contacto.imagen = `https://randomuser.me/api/portraits/${genero}/${randomId}.jpg`;

            const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
            contactosGuardados.push(contacto);
            localStorage.setItem('contactos', JSON.stringify(contactosGuardados));
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Contacto Guardado!';
            submitBtn.style.backgroundColor = '#2e8b57';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = '../HTML/contactos.html';
            }, 1500);
        });
    }
    
    const notebookLines = document.querySelector('.notebook-lines');
    if (notebookLines) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            notebookLines.style.backgroundPositionY = `${scrollPosition}px`;
        });
    }
    
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});