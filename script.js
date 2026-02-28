// ===================================
// NAVIGATION MOBILE
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fermer le menu lors du clic sur un lien
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Fermer le menu lors du clic à l'extérieur
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});

// ===================================
// FILTRES DE FORMATIONS
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const formationCards = document.querySelectorAll('.formation-card');

    if (filterButtons.length > 0 && formationCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                // Obtenir la catégorie sélectionnée
                const category = this.getAttribute('data-category');
                // Filtrer les formations
                formationCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (category === 'all' || cardCategory === category) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});

// ===================================
// FORMULAIRE DE CONTACT
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validation du formulaire
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const consent = document.getElementById('consent').checked;

            // Vérifications de base
            if (!name || !email || !subject || !message) {
                showMessage('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            if (!consent) {
                showMessage('Veuillez accepter la politique de confidentialité.', 'error');
                return;
            }

            // Simulation d'envoi (en production, utiliser AJAX pour envoyer au serveur)
            simulateFormSubmission();
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
            
            // Faire défiler jusqu'au message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Masquer le message après 5 secondes pour les messages de succès
            if (type === 'success') {
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        }
    }

    function simulateFormSubmission() {
        // Afficher un indicateur de chargement
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        // Simuler un délai d'envoi
        setTimeout(() => {
            // Réinitialiser le bouton
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;

            // Afficher le message de succès
            showMessage(
                'Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.',
                'success'
            );

            // Réinitialiser le formulaire
            contactForm.reset();
        }, 1500);
    }
});

// ===================================
// ANIMATIONS AU SCROLL
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Observer pour les animations au scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes de formations
    const formationCards = document.querySelectorAll('.formation-card');
    formationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observer les cartes de fonctionnalités
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observer les valeurs
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
});

// ===================================
// NAVIGATION SMOOTH SCROLL
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Gérer le scroll smooth pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorer les liens qui sont juste "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
    }
});

// ===================================
// BOUTON RETOUR EN HAUT (Optionnel)
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Créer le bouton de retour en haut
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('id', 'scrollToTop');
    scrollToTopBtn.setAttribute('aria-label', 'Retour en haut');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Afficher/masquer le bouton en fonction du scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Fonctionnalité de retour en haut
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Effet hover
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });
});

// ===================================
// PROTECTION CONTRE LES ERREURS
// ===================================
window.addEventListener('error', function(e) {
    console.error('Une erreur s\'est produite:', e.message);
}, true);

// ===================================
// MESSAGE DE CONSOLE
// ===================================
console.log('%c🎓 Site SLA Formation', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cSite web développé pour l\'association SLA', 'color: #7c3aed; font-size: 14px;');
