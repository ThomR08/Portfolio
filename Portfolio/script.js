/* ============================================
   PORTFOLIO JAVASCRIPT - ALAN RAMÍREZ
   Funcionalidades: Smooth scroll, animaciones,
   validación de formulario, menú móvil
   ============================================ */

// ============================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // VALIDACIÓN Y ENVÍO DE FORMULARIO
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validación básica
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Validar longitud mínima del mensaje
            if (message.length < 10) {
                showNotification('El mensaje debe tener al menos 10 caracteres', 'error');
                return;
            }
            
            const tuEmail = 'thomasramirez0806@gmail.com';
            
            // Crear el mailto link con los datos del formulario
            const subject = `Mensaje de ${name} desde el portafolio`;
            const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
            
            // Codificar para URL
            const mailtoLink = `mailto:${tuEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Abrir el cliente de email
            window.location.href = mailtoLink;
            
            // Mostrar mensaje y limpiar formulario
            showNotification('Abriendo tu cliente de email...', 'success');
            
            // Limpiar el formulario después de 1 segundo
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }

    // ============================================
    // ANIMACIONES AL HACER SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Observar tarjetas de proyectos con delay escalonado
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
