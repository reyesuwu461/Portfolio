document.addEventListener('DOMContentLoaded', function() {
    const switchInput = document.getElementById('switch');
    
    // Check for saved user preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        switchInput.checked = true;
        document.body.classList.add('dark-mode');
    }
    
    // Toggle theme when switch is clicked
    switchInput.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Create floating particles
    createParticles();
    
    // Scroll animations
    setupScrollAnimations();
    
    // Scroll to top button
    setupScrollToTop();
    
    // Animate skill bars
    animateSkillBars();
    
    // Add hover effects to cards
    enhanceCardInteractions();
    
    // Add typing effect to title
    typeWriterEffect();
});

// Create floating particles in background
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 3 and 8
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // Random color based on theme
        const hue = document.body.classList.contains('dark-mode') ? 220 : 220;
        particle.style.background = `hsl(${hue}, 70%, 60%)`;
        
        particlesContainer.appendChild(particle);
    }
}

// Setup scroll animations for sections
function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the skills section, animate the bars
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Setup scroll to top button
function setupScrollToTop() {
    const scrollButton = document.createElement('div');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top';
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            bar.style.width = width;
        }
    });
}

// Enhance card interactions with tilt effect
function enhanceCardInteractions() {
    const cards = document.querySelectorAll('.project, .skill-category');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 25;
            const angleX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Typewriter effect for title
function typeWriterEffect() {
    const title = document.querySelector('header h1');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.classList.add('typewriter');
        
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                title.style.borderRight = 'none';
            }
        }, 100);
    }
}

// Setup game button
function setupGameButton() {
    // Create game button
    const gameButton = document.createElement('a');
    gameButton.href = './game-main/index.html'; // Update with your actual game path
    gameButton.className = 'game-button';
    gameButton.innerHTML = '💀';
    gameButton.title = 'Play Game';
    document.body.appendChild(gameButton);
    
    // Show button after a delay
    setTimeout(() => {
        gameButton.classList.add('visible');
    }, 2000);
}

// Initialize the game button when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupGameButton();
    
});

// JavaScript for project example section
document.addEventListener('DOMContentLoaded', function() {
    // Setup scroll animations for the project example section
    const projectExampleSection = document.querySelector('.project-example');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    if (projectExampleSection) {
        observer.observe(projectExampleSection);
    }
    
    // Add interactive effects to the example view
    const exampleView = document.querySelector('.example-view');
    if (exampleView) {
        exampleView.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        exampleView.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.example-actions .btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Simulate progress animation reset on hover
    const progressFill = document.getElementById('progress-time-fill');
    if (progressFill) {
        exampleView.addEventListener('mouseenter', function() {
            progressFill.style.animation = 'none';
            setTimeout(() => {
                progressFill.style.animation = 'progress-fill 5s infinite alternate ease-in-out';
            }, 10);
        });
    }
});

// JavaScript para la sección de ejemplo del proyecto
document.addEventListener('DOMContentLoaded', function() {
    // Configurar animaciones de desplazamiento para la sección de ejemplo del proyecto
    const projectExampleSection = document.querySelector('.project-example');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    if (projectExampleSection) {
        observer.observe(projectExampleSection);
    }
    
    // Agregar efectos interactivos a la vista de ejemplo
    const exampleView = document.querySelector('.example-view');
    if (exampleView) {
        exampleView.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        exampleView.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    }
    
    // Agregar efecto de clic a los botones
    const buttons = document.querySelectorAll('.example-actions .btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Ajustar la altura del iframe según el contenido
    function adjustIframeHeight() {
        const iframe = document.querySelector('.game-iframe');
        if (iframe) {
            iframe.onload = function() {
                try {
                    const height = iframe.contentWindow.document.body.scrollHeight;
                    iframe.style.height = height + 'px';
                } catch (e) {
                    console.log('Error adjusting iframe height:', e);
                }
            };
        }
    }
    
    // Llamar a la función después de un retraso para asegurar que el DOM esté listo
    setTimeout(adjustIframeHeight, 1000);
});