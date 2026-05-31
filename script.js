// Sélectionner les éléments du DOM
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Fonction pour toggle le menu mobile
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animer les spans du hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(10px, 10px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Réinitialiser l'animation du hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Gestion du formulaire de contact
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const inputs = contactForm.querySelectorAll('input, textarea');
    const formData = {};
    
    inputs.forEach(input => {
        formData[input.placeholder] = input.value;
    });
    
    // Validation simple
    if (!formData['Votre Nom'] || !formData['Votre Email'] || !formData['Sujet'] || !formData['Votre Message']) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    // Validation email
    if (!isValidEmail(formData['Votre Email'])) {
        showNotification('Veuillez entrer un email valide', 'error');
        return;
    }
    
    // Afficher un message de succès
    showNotification('Message envoyé avec succès! Merci de nous avoir contacté.', 'success');
    
    // Réinitialiser le formulaire
    contactForm.reset();
});

// Fonction pour valider l'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour afficher les notifications
function showNotification(message, type) {
    // Créer un élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    // Appliquer les couleurs selon le type
    if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
        notification.style.color = 'white';
    }
    
    // Ajouter la notification au body
    document.body.appendChild(notification);
    
    // Supprimer la notification après 4 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Animation Intersection Observer pour les éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer tous les cards et éléments de contenu
document.querySelectorAll('.tip-card, .blog-card, .about-text').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Amélioration de la navigation avec scroll spy
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Ajouter un style pour le lien actif
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
`;
document.head.appendChild(style);

// Fonction pour ajouter un effet parallaxe sur le hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fonction pour lisser le scroll des ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Ajouter une animation au chargement de la page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialiser l'opacité du body à 0 pour l'animation de chargement
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Animation des compteurs (nombre de dépôts, etc.) si nécessaire
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Gestion de la classe active pour les liens de navigation lors du scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Easter egg: Animation spéciale quand on clique sur le logo
document.querySelector('.nav-logo').addEventListener('click', () => {
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        profilePic.style.animation = 'spin 1s linear';
        setTimeout(() => {
            profilePic.style.animation = 'none';
        }, 1000);
    }
});

// Ajouter l'animation spin au CSS dynamiquement
const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(spinStyle);

// Gestion du dark mode (optionnel)
const darkModeToggle = () => {
    document.body.classList.toggle('dark-mode');
};

// Console message de bienvenue
console.log('%c🎯 Bienvenue sur Zam Wesh!', 'font-size: 20px; color: #0066ff; font-weight: bold;');
console.log('%cInspire, motive et progresse chaque jour.', 'font-size: 14px; color: #666;');