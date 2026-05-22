// --- System Clock ---
function updateClock() {
    const clock = document.getElementById('clock');
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('en-US', { hour12: false });
}
setInterval(updateClock, 1000);
updateClock();

// --- Mouse Interaction ---
const mouseGlow = document.getElementById('mouse-glow');
document.addEventListener('mousemove', (e) => {
    if (mouseGlow) {
        mouseGlow.style.left = e.clientX + 'px';
        mouseGlow.style.top = e.clientY + 'px';
    }
});

// --- Intersection Observer for Animations ---
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-item');

const revealOptions = { threshold: 0.15 };
const sectionOptions = { threshold: 0.5 };

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, revealOptions);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, sectionOptions);

revealElements.forEach(el => revealObserver.observe(el));
sections.forEach(sec => sectionObserver.observe(sec));

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- Protect Profile Image ---
document.querySelectorAll('.protect-image').forEach(img => {
    // Prevent Right Click
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Prevent Dragging
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
});
