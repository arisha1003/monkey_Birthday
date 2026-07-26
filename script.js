/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', () => {
    initializePageSequence();
    createFloatingDecorations();
    createWishesTree();
    setupParticleEffects();
});

/* ==================== BIRTHDAY WISHES ==================== */
const birthdayWishes = [
    "May every day bring you a smile! 😊",
    "You are stronger than you believe! 💪",
    "Chase your dreams fearlessly! 🌟",
    "Kindness is your superpower! ✨",
    "You make the world brighter! ☀️",
    "Believe in yourself always! 💖",
    "Adventure awaits you! 🗺️",
    "You are loved more than you know! 💕",
    "Success is yours to claim! 👑",
    "Keep shining like the star you are! ⭐",
    "Your potential is limitless! 🚀",
    "Spread joy wherever you go! 🎉",
    "You are one of a kind! 🦋",
    "Follow your passion! 🔥",
    "The best is yet to come! 🌈"
];

/* ==================== OPENING ANIMATION SEQUENCE ==================== */
function initializePageSequence() {
    // Create stars
    createStarfield();

    // Timing sequence
    setTimeout(() => {
        animateShootingStar();
    }, 1000);

    setTimeout(() => {
        animateBirthdayText();
    }, 2000);

    // Auto-advance after delay
    setTimeout(() => {
        // Optional auto-advance (commented for manual control)
        // advanceToMainScreen();
    }, 8000);
}

/* Create starfield for opening screen */
function createStarfield() {
    const starfield = document.getElementById('starfield');
    const starCount = window.innerWidth < 768 ? 50 : 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star twinkle';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starfield.appendChild(star);
    }

    // Animate stars appearing
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.style.animation = `twinkle 3s ease-in-out ${index * 0.05}s infinite`;
    });
}

/* Animate shooting star */
function animateShootingStar() {
    const shootingStar = document.getElementById('shootingStar');
    shootingStar.classList.add('animate');

    // Reset for potential replay
    setTimeout(() => {
        shootingStar.classList.remove('animate');
    }, 2000);
}

/* Animate birthday text with glow effect */
function animateBirthdayText() {
    const text = document.getElementById('birthdayText');
    text.style.opacity = '1';
    
    // Create character-by-character animation
    const chars = text.textContent.split('');
    text.textContent = '';
    
    chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`;
        text.appendChild(span);
    });
}

/* ==================== SCREEN TRANSITIONS ==================== */
document.getElementById('skipOpening').addEventListener('click', advanceToMainScreen);

function advanceToMainScreen() {
    const opening = document.getElementById('openingScreen');
    const main = document.getElementById('mainScreen');

    opening.classList.remove('active');
    setTimeout(() => {
        main.classList.add('active');
        // Trigger cake animation
        setTimeout(() => {
            triggerCakeAnimation();
        }, 500);
    }, 400);
}

/* ==================== CAKE SECTION ANIMATION ==================== */
function triggerCakeAnimation() {
    const flames = document.querySelectorAll('.flame');
    
    // Light candles
    flames.forEach(flame => {
        flame.style.display = 'block';
    });

    // Blow out candles after 3 seconds
    setTimeout(() => {
        blowOutCandles();
        triggerConfetti();
    }, 3000);
}

function blowOutCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('blown');
        }, index * 100);
    });
}

/* ==================== MESSAGE CARD FLIP ==================== */
document.getElementById('flipCard').addEventListener('click', function() {
    this.classList.toggle('flipped');
    if (this.classList.contains('flipped')) {
        animateMessageText();
    }
});

function animateMessageText() {
    const messageContent = document.getElementById('messageContent');
    const paragraphs = messageContent.querySelectorAll('p');
    
    // Stagger animation for each paragraph
    paragraphs.forEach((p, index) => {
        p.style.opacity = '0';
        p.style.animation = `fadeInUp 0.6s ease-out ${index * 0.15}s forwards`;
    });
}

/* ==================== FLOATING DECORATIONS ==================== */
function createFloatingDecorations() {
    const decorations = document.getElementById('decorations');
    const decorTypes = [
        { type: 'heart-deco', emoji: '❤️' },
        { type: 'butterfly-deco', emoji: '🦋' },
        { type: 'sparkle-deco', emoji: '✨' },
        { type: 'balloon-deco', emoji: '🎈' },
        { type: 'flower-deco', emoji: '🌸' },
        { type: 'star-deco', emoji: '⭐' }
    ];

    const decorCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < decorCount; i++) {
        const deco = decorTypes[Math.floor(Math.random() * decorTypes.length)];
        const element = document.createElement('div');
        element.className = `floating-decoration ${deco.type}`;
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 4 + 's';
        element.style.animationDuration = (Math.random() * 3 + 4) + 's';
        element.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
        decorations.appendChild(element);
    }
}

/* ==================== MOUSE SPARKLE TRAIL ==================== */
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.8) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 30 + 'px');
    sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 30 + 'px');
    
    document.getElementById('sparkleContainer').appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
}

/* ==================== GIFT INTERACTIONS ==================== */
document.querySelectorAll('.gift-box').forEach(gift => {
    gift.addEventListener('click', function() {
        const giftNumber = this.dataset.gift;
        triggerGiftEffect(giftNumber);
    });
});

function triggerGiftEffect(giftNumber) {
    switch(giftNumber) {
        case '1':
            triggerFireworks();
            break;
        case '2':
            triggerBalloons();
            break;
        case '3':
            triggerHeartsAndButterflies();
            break;
    }
}

/* Fireworks effect */
function triggerFireworks() {
    const container = document.getElementById('giftEffects');
    const colors = ['#FFB6D9', '#DDA0DD', '#FFD700', '#FF69B4'];
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = (Math.random() * window.innerWidth) + 'px';
        particle.style.top = (Math.random() * window.innerHeight) + 'px';
        
        const angle = (Math.random() * Math.PI * 2);
        const velocity = Math.random() * 8 + 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        container.appendChild(particle);
        
        // Animate particle
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let frame = 0;
        
        const animate = setInterval(() => {
            frame++;
            x += vx;
            y += vy;
            vy += 0.2; // Gravity
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = 1 - (frame / 100);
            
            if (frame >= 100) {
                clearInterval(animate);
                particle.remove();
            }
        }, 16);
    }
}

/* Balloons effect */
function triggerBalloons() {
    const container = document.getElementById('giftEffects');
    const balloonColors = ['🎈', '🎈', '🎈'];
    
    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon-element';
        balloon.textContent = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.left = Math.random() * window.innerWidth + 'px';
        balloon.style.bottom = '-50px';
        balloon.style.animationDelay = (i * 0.1) + 's';
        
        container.appendChild(balloon);
        
        setTimeout(() => balloon.remove(), 4000 + (i * 100));
    }
}

/* Hearts and butterflies effect */
function triggerHeartsAndButterflies() {
    const container = document.getElementById('giftEffects');
    const elements = ['❤️', '🦋'];
    
    for (let i = 0; i < 30; i++) {
        const element = document.createElement('div');
        element.className = 'heart-shower';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * window.innerWidth + 'px';
        element.style.top = '-50px';
        element.style.setProperty('--drift', (Math.random() - 0.5) * 200 + 'px');
        element.style.animationDelay = (i * 0.1) + 's';
        
        container.appendChild(element);
        
        setTimeout(() => element.remove(), 3000 + (i * 100));
    }
}

/* ==================== CONFETTI EFFECT ==================== */
function triggerConfetti() {
    const container = document.getElementById('giftEffects');
    const colors = ['#FFB6D9', '#DDA0DD', '#FFD700', '#FF69B4', '#E0BBE4'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '40';
        
        container.appendChild(confetti);
        
        // Animate confetti falling
        let y = 0;
        let x = parseFloat(confetti.style.left);
        let vx = (Math.random() - 0.5) * 8;
        const vy = Math.random() * 5 + 3;
        let rotation = 0;
        
        const animate = setInterval(() => {
            y += vy;
            x += vx;
            rotation += Math.random() * 20;
            vx *= 0.98;
            
            confetti.style.transform = `translateY(${y}px) translateX(${x}px) rotate(${rotation}deg)`;
            confetti.style.opacity = Math.max(0, 1 - (y / window.innerHeight));
            
            if (y > window.innerHeight) {
                clearInterval(animate);
                confetti.remove();
            }
        }, 16);
    }
}

/* ==================== MEMORY GALLERY FLOATING ==================== */
function animateGallery() {
    const frames = document.querySelectorAll('.floating-frame');
    frames.forEach((frame, index) => {
        frame.style.setProperty('--delay', (index * 0.5) + 's');
    });
}

/* ==================== WISHES TREE ==================== */
function createWishesTree() {
    const container = document.getElementById('wishesContainer');
    const foliageCircle = document.getElementById('foliageCircle');
    
    // Create wishes leaves positioned in a circular pattern
    birthdayWishes.forEach((wish, index) => {
        const angle = (index / birthdayWishes.length) * Math.PI * 2;
        const radius = 120;
        const x = 200 + Math.cos(angle) * radius;
        const y = 150 + Math.sin(angle) * radius;
        
        const leaf = document.createElement('div');
        leaf.className = 'wish-leaf';
        leaf.textContent = '🍃';
        leaf.style.left = x + 'px';
        leaf.style.top = y + 'px';
        leaf.style.animationDelay = (index * 0.1) + 's';
        leaf.dataset.wish = wish;
        leaf.dataset.index = index;
        
        leaf.addEventListener('click', (e) => {
            e.stopPropagation();
            showWish(wish);
        });
        
        container.appendChild(leaf);
    });
}

function showWish(wish) {
    const wishDisplay = document.getElementById('wishDisplay');
    const wishText = document.getElementById('wishText');
    
    wishText.textContent = wish;
    wishDisplay.style.display = 'block';
    wishDisplay.style.animation = 'wishPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Close wish display on background click
    setTimeout(() => {
        wishDisplay.addEventListener('click', () => {
            wishDisplay.style.display = 'none';
        });
    }, 100);
}

// Close wish when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.wish-card') && !e.target.closest('.wish-leaf')) {
        const wishDisplay = document.getElementById('wishDisplay');
        if (wishDisplay.style.display === 'block') {
            wishDisplay.style.display = 'none';
        }
    }
});

/* ==================== SURPRISE BUTTON ==================== */
document.getElementById('surpriseBtn').addEventListener('click', () => {
    triggerSurprise();
});

function triggerSurprise() {
    const modal = document.getElementById('surpriseModal');
    const fireworks = document.getElementById('fireworksContainer');
    
    modal.style.display = 'flex';
    
    // Create continuous fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFireworksInModal(fireworks);
        }, i * 300);
    }
}

function createFireworksInModal(container) {
    const colors = ['#FFB6D9', '#DDA0DD', '#FFD700', '#FF69B4', '#E0BBE4'];
    
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.pointerEvents = 'none';
        
        container.appendChild(particle);
        
        const angle = (i / 40) * Math.PI * 2;
        const distance = 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.animation = `none`;
        
        let x = 0, y = 0;
        let frame = 0;
        
        const animate = setInterval(() => {
            frame++;
            const progress = frame / 60;
            x = tx * progress * (1 - progress * 0.5);
            y = ty * progress * (1 - progress * 0.5);
            
            particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
            particle.style.opacity = Math.max(0, 1 - progress);
            
            if (frame >= 60) {
                clearInterval(animate);
                particle.remove();
            }
        }, 16);
    }
}

document.getElementById('closeSurprise').addEventListener('click', () => {
    document.getElementById('surpriseModal').style.display = 'none';
});

document.getElementById('surpriseModal').addEventListener('click', (e) => {
    if (e.target.id === 'surpriseModal') {
        document.getElementById('surpriseModal').style.display = 'none';
    }
});

/* ==================== MUSIC TOGGLE ==================== */
document.getElementById('musicToggle').addEventListener('click', function() {
    const audio = document.getElementById('backgroundMusic');
    
    if (audio.paused) {
        audio.play().catch(e => console.log('Audio play failed:', e));
        this.textContent = '🔊';
    } else {
        audio.pause();
        this.textContent = '🔇';
    }
});

/* ==================== SMOOTH SCROLL WITH PARALLAX ==================== */
let currentSection = 0;
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Update scroll indicator visibility
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (window.scrollY > window.innerHeight - 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '0.6';
    }

    // Parallax effect for floating decorations
    const decorations = document.getElementById('decorations');
    if (decorations) {
        decorations.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

/* ==================== PARTICLE EFFECTS ==================== */
function setupParticleEffects() {
    // This function can be expanded for additional particle effects
    // Currently handled through CSS animations
}

/* ==================== RESPONSIVE ADJUSTMENTS ==================== */
window.addEventListener('resize', () => {
    // Recreate decorations on resize for proper responsive behavior
    if (window.innerWidth < 768) {
        // Mobile adjustments if needed
    }
});

/* ==================== ACCESSIBILITY ==================== */
// Add focus styles
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--primary-gold)';
    });
    btn.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

/* ==================== KEYBOARD NAVIGATION ==================== */
document.addEventListener('keydown', (e) => {
    // ESC to close surprise modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('surpriseModal');
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    }

    // SPACE to toggle music
    if (e.key === ' ') {
        const musicBtn = document.getElementById('musicToggle');
        if (document.activeElement === document.body) {
            e.preventDefault();
            musicBtn.click();
        }
    }
});

/* ==================== INTERSECTION OBSERVER FOR LAZY ANIMATIONS ==================== */
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0.8';
    observer.observe(section);
});

/* ==================== UTILITY FUNCTIONS ==================== */
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function animateValue(element, start, end, duration, formatter = (v) => v) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = formatter(start + (end - start) * easeInOutQuad(progress));
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}

/* ==================== INITIALIZATION COMPLETE ==================== */
console.log('🎉 Birthday celebration website loaded! Happy 13th Birthday Laraib! 🎉');

// Trigger gallery animations after page load
window.addEventListener('load', () => {
    animateGallery();
    createFloatingDecorations();
});
