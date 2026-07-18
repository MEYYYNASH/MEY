/**
 * PROFESSIONAL PORTFOLIO INTERACTION ENGINE
 * Portfolio of BORMEY
 */

document.addEventListener('DOMContentLoaded', () => {
    initSubtleParticles();
    initMobileNav();
    initScrollReveal();
    initProjectFilter();
    initActiveNavHighlight();
    initContactForm();
    initMenuDrawer();
    initMockupFiles();
    initLanguageTranslation();
});

/* --------------------------------------------------------------------------
   1. SUBTLE DEEPMIND PARTICLES BACKGROUND (HTML5 CANVAS)
   -------------------------------------------------------------------------- */
function initSubtleParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        radius: 100
    };

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseSize = size;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }

            this.x += this.directionX;
            this.y += this.directionY;

            // Proximity mouse scaling
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    if (this.size < this.baseSize * 1.8) {
                        this.size += 0.2;
                    }
                } else if (this.size > this.baseSize) {
                    this.size -= 0.2;
                }
            } else if (this.size > this.baseSize) {
                this.size -= 0.2;
            }

            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 22000), 50);
        const color = 'rgba(59, 130, 246, 0.16)'; // Faint cobalt blue

        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 1.5) + 0.8;
            let x = Math.random() * (canvas.width - size * 2) + size;
            let y = Math.random() * (canvas.height - size * 2) + size;
            let directionX = (Math.random() * 0.2) - 0.1; // Slow drift
            let directionY = (Math.random() * 0.2) - 0.1;

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    opacityValue = 1 - (distance / 120);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${opacityValue * 0.05})`; // Very faint lines
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        init();
    });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAV BAR INTERACTION
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            if (navMenu.classList.contains('open')) {
                mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            } else {
                mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* --------------------------------------------------------------------------
   3. SCROLL REVEAL & SKILLS PERCENTAGES TRIGGER
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const sections = document.querySelectorAll('.section, .hero-content, .hero-visual, .about-text-card, .stat-card, .skills-card, .project-card, .timeline-item, .contact-info, .contact-form-container');
    
    sections.forEach(elem => {
        elem.classList.add('reveal-item');
    });

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                if (entry.target.classList.contains('skills-section')) {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(elem => {
        revealObserver.observe(elem);
    });

    const skillsSec = document.querySelector('.skills-section');
    if (skillsSec) {
        revealObserver.observe(skillsSec);
    }
}

/* --------------------------------------------------------------------------
   4. DYNAMIC PROJECTS GRID FILTER
   -------------------------------------------------------------------------- */
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, 40);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. NAVIGATION LINK ACTIVE STATE HIGHLIGHTS
   -------------------------------------------------------------------------- */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item[data-section]');

    const options = {
        root: null,
        threshold: 0.25,
        rootMargin: '-10% 0px -45% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // Header active states
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}` || link.getAttribute('href') === `index.html#${currentId}`) {
                        link.classList.add('active');
                    }
                });

                // Bottom bar active states
                bottomNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-section') === currentId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* --------------------------------------------------------------------------
   6. CONTACT FORM SUBMIT HANDLER
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalBtnHTML = submitBtn.innerHTML;
        const currentLang = localStorage.getItem('bormey-lang') || 'en';

        submitBtn.disabled = true;
        submitBtn.innerHTML = currentLang === 'en' 
            ? `<span>Sending Message...</span>`
            : `<span>កំពុងផ្ញើសារ...</span>`;
        
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.innerHTML = `
            @keyframes spin { 100% { transform: rotate(360deg); } }
            .spinner { animation: spin 1s linear infinite; }
        `;
        document.head.appendChild(style);

        setTimeout(() => {
            submitBtn.innerHTML = currentLang === 'en' ? `<span>Message Sent</span>` : `<span>ផ្ញើសាររួចរាល់</span>`;
            submitBtn.style.background = '#10b981';
            submitBtn.style.borderColor = '#10b981';
            submitBtn.style.color = '#ffffff';
            
            const notification = document.createElement('div');
            notification.className = 'glass-card contact-success-alert';
            notification.innerHTML = `
                <div class="alert-content">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <div>
                        <h4>${currentLang === 'en' ? 'Message Sent Successfully' : 'សារត្រូវបានផ្ញើជោគជ័យ'}</h4>
                        <p>${currentLang === 'en' ? 'Your message has been delivered. Bormey will get back to you shortly.' : 'សាររបស់អ្នកត្រូវបានបញ្ជូន។ ខ្ញុំបាទនឹងទាក់ទងទៅវិញក្នុងពេលឆាប់ៗ។'}</p>
                    </div>
                </div>
            `;
            
            const alertStyle = document.createElement('style');
            alertStyle.innerHTML = `
                .contact-success-alert {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    padding: 16px 20px;
                    z-index: 1000;
                    border: 1px solid rgba(59, 130, 246, 0.2);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), var(--glow-panel);
                    background: rgba(15, 23, 42, 0.96);
                    opacity: 0;
                    transform: translateY(15px);
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .contact-success-alert.show { opacity: 1; transform: translateY(0); }
                .alert-content { display: flex; align-items: center; gap: 12px; }
                .alert-content h4 { margin-bottom: 2px; color: var(--color-text-bright); font-size: 0.92rem; }
                .alert-content p { font-size: 0.8rem; color: var(--color-text-muted); }
                @media (max-width: 500px) {
                    .contact-success-alert { left: 16px; right: 16px; bottom: 16px; }
                }
            `;
            document.head.appendChild(alertStyle);
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 50);

            form.reset();

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                    const dynSpinner = document.getElementById('spinner-style');
                    if (dynSpinner) dynSpinner.remove();
                }, 400);
            }, 4500);

        }, 1800);
    });
}

/* --------------------------------------------------------------------------
   7. MOBILE SLIDE-OUT MENU DRAWER (Facebook Menu Style)
   -------------------------------------------------------------------------- */
function initMenuDrawer() {
    const trigger = document.getElementById('mobile-menu-trigger');
    const drawer = document.getElementById('menu-drawer');
    const closeBtn = document.getElementById('drawer-close');
    const overlay = document.getElementById('drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-grid-item');

    if (!trigger || !drawer) return;

    function openDrawer() {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }

    function closeDrawer() {
        drawer.classList.remove('open');
        document.body.style.overflow = ''; // Restore scrolling
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        openDrawer();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE WORKSPACE FILE TABS
   -------------------------------------------------------------------------- */
function initMockupFiles() {
    const files = document.querySelectorAll('.sidebar-subitem[data-file]');
    const codeArea = document.querySelector('.mockup-code');
    const titleArea = document.querySelector('.mockup-title');
    
    if (!files || !codeArea) return;

    const fileContent = {
        prompt: `
            <div class="code-line"><span class="code-comment"># AI Prompt Engineer & Creative Dev</span></div>
            <div class="code-line"><span class="code-keyword">import</span> openai, anthropic, gemini</div>
            <div class="code-line"></div>
            <div class="code-line"><span class="code-keyword">class</span> <span class="code-class">BormeyPortfolio</span>:</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">def</span> <span class="code-func">__init__</span>(self):</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = <span class="code-string">"PICHPENHBORMEY"</span></div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.completed_projects = 22</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.focus = [<span class="code-string">"AI"</span>, <span class="code-string">"Code"</span>, <span class="code-string">"Design"</span>]</div>
            <div class="code-line"></div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">def</span> <span class="code-func">get_prompt</span>(self, model):</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> f<span class="code-string">"Optimizing pipeline for {model}..."</span></div>
        `,
        web: `
            <div class="code-line"><span class="code-comment">// Responsive Web Architecture Engine</span></div>
            <div class="code-line"><span class="code-keyword">const</span> <span class="code-class">bormeyDev</span> = {</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;skills: [<span class="code-string">"HTML5"</span>, <span class="code-string">"CSS3"</span>, <span class="code-string">"JavaScript"</span>],</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;designSystem: <span class="code-string">"Glassmorphism"</span>,</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;responsive: <span class="code-keyword">true</span>,</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-func">deploy</span>() {</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.<span class="code-func">log</span>(<span class="code-string">"Compiling visual core..."</span>);</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> <span class="code-string">"Build successful!"</span>;</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;}</div>
            <div class="code-line">};</div>
        `,
        creative: `
            <div class="code-line"><span class="code-comment">/* Premium Corporate Work Styling */</span></div>
            <div class="code-line"><span class="code-class">:root</span> {</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">--color-primary</span>: #3b82f6; <span class="code-comment">/* Cobalt */</span></div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">--color-background</span>: #080c14;</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">--border-radius</span>: 16px;</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">--transition</span>: cubic-bezier(0.16, 1, 0.3, 1);</div>
            <div class="code-line">}</div>
            <div class="code-line"></div>
            <div class="code-line"><span class="code-class">.glass-card:hover</span> {</div>
            <div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">transform</span>: translateY(-4px);</div>
            <div class="code-line">}</div>
        `
    };

    files.forEach(file => {
        file.addEventListener('click', () => {
            files.forEach(f => f.classList.remove('active'));
            file.classList.add('active');

            const key = file.getAttribute('data-file');
            const fileName = file.getAttribute('title');

            if (fileContent[key]) {
                codeArea.innerHTML = fileContent[key];
            }
            if (titleArea && fileName) {
                titleArea.textContent = `bormey-workspace // ${fileName}`;
            }
        });
    });
}

/* --------------------------------------------------------------------------
   9. ENGLISH / KHMER DYNAMIC TRANSLATION SYSTEM
   -------------------------------------------------------------------------- */
function initLanguageTranslation() {
    const btnEn = document.getElementById('lang-btn-en');
    const btnKh = document.getElementById('lang-btn-kh');

    const translations = {
        en: {
            navHome: "Home",
            navAbout: "About",
            navSkills: "Skills",
            navProjects: "Projects",
            navExperience: "Experience",
            navContact: "Contact",
            heroBadge: "Open to Projects & Collaborations",
            heroTitle: 'Building the Future with <span class="gradient-text">AI & Creativity</span>',
            heroSubtitle: "Third-Year Computer Science Student specializing in AI Prompt Engineering, Coding, UI/UX Design, Graphic Design, Photography, and Digital Content Creation.",
            heroExplore: "Explore Projects",
            heroContact: "Contact Me",
            aboutTag: "// ABOUT ME",
            aboutTitle: 'Bridging Code and <span class="gradient-text">Digital Artistry</span>',
            aboutLead: "I am a passionate third-year Computer Science student who enjoys creating innovative digital experiences.",
            aboutP1: "I specialize in AI prompt engineering, web development, UI/UX design, graphic design, photography, and professional photo/video editing. I have successfully completed more than 22 creative and technical projects while continuously learning new technologies and improving my skills.",
            aboutP2: "My vision is to engineer seamless bridges between human intelligence and AI capabilities, crafting sleek visual architectures and prompt workflows that maximize technical systems and human creativity alike.",
            stat1Label: "Completed Projects",
            stat2Label: "Years of Learning",
            stat3Label: "Year Computer Science Student",
            stat4Label: "Continuous Learner",
            skillsTag: "// EXPERTISE",
            skillsTitle: "My Tech Stack & Skills",
            skillsGroup1: "AI & Prompting",
            skillsGroup2: "Frontend Engineering",
            skillsGroup3: "Creative Suite",
            skillsGroup4: "Backend & APIs",
            skillName1: "AI Prompt Engineering",
            skillName2: "ChatGPT / LLM Optimization",
            skillName3: "Claude & Gemini Ecosystems",
            skillName4: "React & Next.js",
            skillName5: "HTML5 / CSS3 / JavaScript",
            skillName6: "UI/UX & Responsive Web",
            skillName7: "Node.js & Express",
            skillName8: "Python / Django / FastAPI",
            skillName9: "Databases (SQL / NoSQL)",
            skillName10: "Adobe Photoshop & Illustrator",
            skillName11: "Adobe Premiere Pro & CapCut",
            skillName12: "Photography & Video Production",
            soft1: "Branding", soft2: "Git & GitHub", soft3: "Problem Solving", soft4: "Team Collaboration", soft5: "Photo Editing", soft6: "Video Editing", soft7: "Graphic Design",
            projectBtnLock: "In Development // Code Private",
            projectBtnView: "View Project // Live Site",
            projectsTag: "// PORTFOLIO",
            projectsTitle: "Featured Projects",
            projectsAll: "All",
            projectsAiDev: "AI & Dev",
            projectsDesign: "Design & UI/UX",
            projectsMedia: "Media & Photo",
            p0Meta: "Web Application",
            p0Title: "QR Code Generator Pro",
            p0Desc: "A premium glassmorphic QR code generator supporting gradients, custom shapes, center branding stamps, and active cloud history syncing.",
            p1Meta: "AI Engineering",
            p1Title: "AI Prompt Collection",
            p1Desc: "A curated library of structured, hyper-optimized system and developer prompts for LLMs like GPT-4, Claude, and Gemini.",
            p2Meta: "Web Development",
            p2Title: "Portfolio Website",
            p2Desc: "A premium glassmorphic portfolio displaying a professional cyberpunk aesthetic, with particles, transitions, and SEO markup.",
            p3Meta: "Application",
            p3Title: "Student Management System",
            p3Desc: "A full-featured management terminal to manage student enrollments, courses, schedules, and academic reports.",
            p4Meta: "Photography",
            p4Title: "Photography Portfolio",
            p4Desc: "A curated exhibit of urban street photography, architectural design, and dramatic contrast portraits.",
            p5Meta: "Graphic Design",
            p5Title: "Graphic Design Collection",
            p5Desc: "A professional compilation of brand identities, modern marketing vectors, high-tech logos, and layout assets.",
            p6Meta: "Photo Editing",
            p6Title: "Photo Editing Showcase",
            p6Desc: "High-end retouching, complex composites, color matching, and digital matte painting showcases.",
            p7Meta: "Video Editing",
            p7Title: "Video Editing Projects",
            p7Desc: "Montages and short films built with advanced color grading, seamless audio syncing, and complex visual effects transitions.",
            p8Meta: "UI/UX Design",
            p8Title: "UI/UX Design Concepts",
            p8Desc: "Interactive mobile and web design wireframes prioritizing user engagement, accessible spacing, and sleek modern aesthetics.",
            journeyTag: "// JOURNEY",
            journeyTitle: "Roles & Creative Disciplines",
            exp1Track: "Core Track", exp1Role: "AI Prompt Engineer", exp1Desc: "Designing system structures, crafting logic gates, and refining temperature/parameter-based prompt blocks for enterprise-grade LLMs. Enhancing LLM accuracy and preventing hallucination loops.",
            exp2Track: "Core Track", exp2Role: "Web Developer", exp2Desc: "Creating semantic markup, structuring advanced UI modules, and managing HTML5/CSS3/JavaScript web environments.",
            exp3Track: "Creative Track", exp3Role: "Graphic Designer", exp3Desc: "Synthesizing vector layouts, creating responsive icons, and designing digital brand identities utilizing Adobe Photoshop and Illustrator.",
            exp4Track: "Creative Track", exp4Role: "Photographer", exp4Desc: "Capturing subjects under professional lighting setups and processing RAW images via modern Lightroom/Photoshop curves, grading matrices, and complex color theory adjustments.",
            exp5Track: "Creative Track", exp5Role: "Photo & Video Editor", exp5Desc: "Editing narrative reels, compiling multi-cam sequences, applying dynamic color-grade luts, and crafting visual assets across Adobe Premiere Pro and CapCut.",
            exp6Track: "Creative Track", exp6Role: "Creative Content Creator", exp6Desc: "Conceptualizing and building dynamic content arrays for social channels, combining photography, copywriting, graphic design, and audio design into cohesive media experiences.",
            contactTag: "// CONNECT",
            contactTitle: "Start a Project Together",
            contactText: "Have an interesting project, an automated pipeline to build, or a creative design concept to collaborate on? Drop a message and let's construct the future.",
            contactNameLabel: "Name",
            contactEmailLabel: "Email",
            contactSubjectLabel: "Subject",
            contactSubmit: "Send Message",
            emailChannelLabel: "Email Channels",
            emailWork: "Work Email",
            emailPersonal: "Personal Email",
            footerMotto: "Building the future of artificial intelligence & web platforms.",
            drawerBio: "Bio Details",
            drawerSkills: "Expertise",
            drawerProjects: "My Works",
            drawerExperience: "Journey",
            drawerContact: "Contact Info",
            drawerMail: "Direct Mail"
        },
        kh: {
            navHome: "ទំព័រដើម",
            navAbout: "អំពីខ្ញុំ",
            navSkills: "ជំនាញ",
            navProjects: "គម្រោង",
            navExperience: "បទពិសោធន៍",
            navContact: "ទាក់ទង",
            heroBadge: "បើកទទួលគម្រោង និងការសហការ",
            heroTitle: 'កសាងអនាគតជាមួយ <span class="gradient-text">AI និងគំនិតច្នៃប្រឌិត</span>',
            heroSubtitle: "និស្សិតឆ្នាំទី៣ ផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ ដែលមានឯកទេសលើវិស្វកម្ម AI Prompt ការសរសេរកូដ ការរចនា UI/UX ការរចនាក្រាហ្វិក ថតរូប និងការបង្កើតមាតិកាឌីជីថល។",
            heroExplore: "ស្វែងរកគម្រោង",
            heroContact: "ទាក់ទងខ្ញុំ",
            aboutTag: "// អំពីខ្ញុំ",
            aboutTitle: 'ការភ្ជាប់គ្នារវាងកូដ និង <span class="gradient-text">សិល្បៈឌីជីថល</span>',
            aboutLead: "ខ្ញុំបាទជានិស្សិតឆ្នាំទី៣ ផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ ដែលចូលចិត្តបង្កើតបទពិសោធន៍ឌីជីថលថ្មីៗ។",
            aboutP1: "ខ្ញុំមានជំនាញលើវិស្វកម្ម AI Prompt ការអភិវឌ្ឍគេហទំព័រ ការរចនា UI/UX ការរចនាក្រាហ្វិក ថតរូប និងការកែសម្រួលរូបភាព/វីដេអូកម្រិតអាជីព។ ខ្ញុំបានបញ្ចប់គម្រោងច្នៃប្រឌិត និងបច្គេកទេសជាង ២២ គម្រោងដោយជោគជ័យ ព្រមទាំងបន្តរៀនសូត្របច្ចេកវិទ្យាថ្មីៗជាប្រចាំ។",
            aboutP2: "ចក្ខុវិស័យរបស់ខ្ញុំគឺបង្កើតស្ពានតភ្ជាប់រវាងបញ្ញាមនុស្ស និងសមត្ថភាព AI ដោយរៀបចំរចនាសម្ព័ន្ធរូបភាព និងលំហូរការងារ Prompt ដើម្បីបង្កើនប្រសិទ្ធភាពប្រព័ន្ធបច្ចេកវិទ្យា និងគំនិតច្នៃប្រឌិតរបស់មនុស្ស។",
            stat1Label: "គម្រោងដែលបានបញ្ចប់",
            stat2Label: "ឆ្នាំនៃការសិក្សា",
            stat3Label: "និស្សិតវិទ្យាសាស្ត្រកុំព្យូទ័រឆ្នាំទី៣",
            stat4Label: "អ្នករៀនសូត្រជាប់ជានិច្ច",
            skillsTag: "// ជំនាញវិជ្ជាជីវៈ",
            skillsTitle: "ជំនាញ និងបច្ចេកវិទ្យារបស់ខ្ញុំ",
            skillsGroup1: "AI & វិស្វកម្ម Prompt",
            skillsGroup2: "ការអភិវឌ្ឍន៍ Frontend",
            skillsGroup3: "កម្មវិធីច្នៃប្រឌិត",
            skillsGroup4: "ការអភិវឌ្ឍន៍ Backend & API",
            skillName1: "វិស្វកម្ម AI Prompt",
            skillName2: "ការបង្កើនប្រសិទ្ធភាព ChatGPT / LLM",
            skillName3: "ប្រព័ន្ធអេកូឡូស៊ី Claude & Gemini",
            skillName4: "React & Next.js",
            skillName5: "HTML5 / CSS3 / JavaScript",
            skillName6: "ការរចនា UI/UX & Web Responsive",
            skillName7: "Node.js & Express",
            skillName8: "Python / Django / FastAPI",
            skillName9: "ប្រព័ន្ធទិន្នន័យ (SQL / NoSQL)",
            skillName10: "Adobe Photoshop & Illustrator",
            skillName11: "Adobe Premiere Pro & CapCut",
            skillName12: "ការថតរូប & ការផលិតវីដេអូ",
            soft1: "ម៉ាកយីហោ", soft2: "Git & GitHub", soft3: "ដោះស្រាយបញ្ហា", soft4: "សហការក្រុម", soft5: "កែរូបភាព", soft6: "កែវីដេអូ", soft7: "ក្រាហ្វិកឌីហ្សាញ",
            projectBtnLock: "កំពុងអភិវឌ្ឍន៍ // កូដឯកជន",
            projectBtnView: "មើលគម្រោង // គេហទំព័រផ្ទាល់",
            projectsTag: "// ស្នាដៃគម្រោង",
            projectsTitle: "គម្រោងលេចធ្លោ",
            projectsAll: "ទាំងអស់",
            projectsAiDev: "AI & កូដ",
            projectsDesign: "ការរចនា & UI/UX",
            projectsMedia: "មេឌៀ & រូបភាព",
            p0Meta: "កម្មវិធីគេហទំព័រ",
            p0Title: "QR Code Generator Pro",
            p0Desc: "ប្រព័ន្ធបង្កើត QR code បែប Glassmorphism ដ៏ប្រណីតដែលមានមុខងារប្តូរពណ៌ Gradient រាងរចនា ឡូហ្គោ និងការរក្សាទុកប្រវត្តិបង្កើត។",
            p1Meta: "វិស្វកម្ម AI",
            p1Title: "បណ្តុំ AI Prompt",
            p1Desc: "បណ្ណាល័យនៃ System Prompts និង Developer Prompts សម្រាប់ LLMs។",
            p2Meta: "ការអភិវឌ្ឍគេហទំព័រ",
            p2Title: "គេហទំព័រប្រវត្តិរូបផ្ទាល់ខ្លួន",
            p2Desc: "គេហទំព័រប្រវត្តិរូបផ្ទាល់ខ្លួនបែប Glassmorphism ដ៏ប្រណីត។",
            p3Meta: "កម្មវិធី",
            p3Title: "ប្រព័ន្ធគ្រប់គ្រងសិស្ស",
            p3Desc: "ប្រព័ន្ធគ្រប់គ្រងការចុះឈ្មោះចូលរៀន វគ្គសិក្សា និងរបាយការណ៍សិស្ស។",
            p4Meta: "ការថតរូប",
            p4Title: "បណ្តុំរូបថតអាជីព",
            p4Desc: "ការតាំងពិព័រណ៍រូបថតបែបផ្លូវថ្នល់ ស្ថាបត្យកម្ម និងរូបថតមនុស្ស។",
            p5Meta: "ក្រាហ្វិកឌីហ្សាញ",
            p5Title: "ការរចនាក្រាហ្វិកលេចធ្លោ",
            p5Desc: "ការចងក្រងការរចនាម៉ាកយីហោ ឡូហ្គោបច្ចេកវិទ្យា និងផ្ទាំងផ្សព្វផ្សាយ។",
            p6Meta: "កែសម្រួលរូបភាព",
            p6Title: "ការកាត់តនិងកែរូបថត",
            p6Desc: "ការកែសម្រួលពន្លឺ ការកាត់តរូបភាពកម្រិតខ្ពស់ និងការផាត់ពណ៌ឌីជីថល។",
            p7Meta: "កែសម្រួលវីដេអូ",
            p7Title: "ការកាត់តវីដេអូអាជីព",
            p7Desc: "វីដេអូខ្លីៗ និងភាពយន្តដែលកាត់តតម្រូវតាមចង្វាក់ភ្លេង និងការផាត់ពណ៌។",
            p8Meta: "ការរចនា UI/UX",
            p8Title: "ប្លង់គំរូរចនា UI/UX",
            p8Desc: "ការគូសប្លង់រចនា (Wireframes) ទូរស័ព្ទ និងគេហទំព័រ។",
            journeyTag: "// បទពិសោធន៍",
            journeyTitle: "តួនាទី និងផ្នែកច្នៃប្រឌិត",
            exp1Track: "ការងារស្នូល", exp1Role: "AI Prompt Engineer", exp1Desc: "ការរចនាទម្រង់ប្រព័ន្ធ ការកំណត់លក្ខខណ្ឌ logic និងការកែសម្រួល Prompt សម្រាប់ LLMs។",
            exp2Track: "ការងារស្នូល", exp2Role: "អ្នកអភិវឌ្ឍន៍គេហទំព័រ", exp2Desc: "ការបង្កើតគេហទំព័របែប Semantic ការសរសេរ UI និងការគ្រប់គ្រងកូដ HTML5/CSS3/JavaScript។",
            exp3Track: "ផ្នែកច្នៃប្រឌិត", exp3Role: "អ្នករចនាក្រាហ្វិក", exp3Desc: "ការបង្កើតប្លង់ Vector រចនាឡូហ្គោ និងអត្តសញ្ញាណម៉ាកយីហោដោយប្រើប្រាស់ Photoshop & Illustrator។",
            exp4Track: "ផ្នែកច្នៃប្រឌិត", exp4Role: "អ្នកថតរូប", exp4Desc: "ការថតរូបភាពមនុស្ស និងទេសភាពកម្រិតអាជីព ព្រមទាំងការផាត់ពណ៌ RAW តាមទ្រឹស្តីពណ៌ក្នុង Lightroom។",
            exp5Track: "ផ្នែកច្នៃប្រឌិត", exp5Role: "អ្នកកែសម្រួលវីដេអូ", exp5Desc: "ការកាត់តវីដេអូខ្លីៗ វីដេអូពាណិជ្ជកម្ម និងការកែពន្លឺពណ៌ជាមួយ Premiere Pro & CapCut។",
            exp6Track: "ផ្នែកច្នៃប្រឌិត", exp6Role: "អ្នកផលិតមាតិកា", exp6Desc: "ការបង្កើតគំនិតច្នៃប្រឌិត និងការផលិតមាតិកាផ្សព្វផ្សាយគ្រប់ទម្រង់សម្រាប់បណ្តាញសង្គម។",
            contactTag: "// ទាក់ទង",
            contactTitle: "ចាប់ផ្តើមគម្រោងជាមួយគ្នា",
            contactText: "តើអ្នកមានគម្រោងគួរឱ្យចាប់អារម្មណ៍ ការសរសេរប្រព័ន្ធស្វ័យប្រវត្ត ឬចង់សហការលើការរចនាច្នៃប្រឌិតដែរឬទេ? ផ្ញើសារមកខ្ញុំឥឡូវនេះដើម្បីចាប់ផ្តើមបង្កើតវាឡើង។",
            contactNameLabel: "ឈ្មោះ",
            contactEmailLabel: "អ៊ីមែល",
            contactSubjectLabel: "ប្រធានបទ",
            contactSubmit: "ផ្ញើសារ",
            emailChannelLabel: "ប្រព័ន្ធអ៊ីមែល",
            emailWork: "អ៊ីមែលការងារ",
            emailPersonal: "អ៊ីមែលផ្ទាល់ខ្លួន",
            footerMotto: "កសាងអនាគតនៃបញ្ញាសិប្បនិម្មិត និងប្រព័ន្ធគេហទំព័រ។",
            drawerBio: "ជីវប្រវត្តិ",
            drawerSkills: "ជំនាញវិជ្ជាជីវៈ",
            drawerProjects: "ស្នាដៃគម្រោង",
            drawerExperience: "បទពិសោធន៍សិក្សា",
            drawerContact: "ព័ត៌មានទាក់ទង",
            drawerMail: "ផ្ញើអ៊ីមែល"
        }
    };

    let currentLang = localStorage.getItem('bormey-lang') || 'en';

    function applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                const hasHTML = ['heroTitle', 'aboutTitle'].includes(key);
                if (hasHTML) {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });

        // Set inputs placeholders
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        if (nameInput) nameInput.setAttribute('placeholder', lang === 'en' ? 'Your Name' : 'ឈ្មោះរបស់អ្នក');
        if (emailInput) emailInput.setAttribute('placeholder', lang === 'en' ? 'your@email.com' : 'your@email.com');
        if (subjectInput) subjectInput.setAttribute('placeholder', lang === 'en' ? 'Project Inquiry' : 'ប្រធានបទសាកសួរ');
        if (messageInput) messageInput.setAttribute('placeholder', lang === 'en' ? 'Describe your project vision...' : 'ពណ៌នាអំពីគម្រោងរបស់អ្នក...');

        // Update active class on buttons
        const allBtnEn = document.querySelectorAll('#lang-btn-en');
        const allBtnKh = document.querySelectorAll('#lang-btn-kh');

        if (lang === 'en') {
            allBtnEn.forEach(b => b.classList.add('active'));
            allBtnKh.forEach(b => b.classList.remove('active'));
        } else {
            allBtnKh.forEach(b => b.classList.add('active'));
            allBtnEn.forEach(b => b.classList.remove('active'));
        }
    }

    // Set initial language
    applyLanguage(currentLang);

    function switchLanguage(lang) {
        if (currentLang === lang) return;
        currentLang = lang;
        localStorage.setItem('bormey-lang', currentLang);
        applyLanguage(currentLang);
    }

    const enToggles = document.querySelectorAll('#lang-btn-en');
    const khToggles = document.querySelectorAll('#lang-btn-kh');

    enToggles.forEach(btn => {
        btn.addEventListener('click', () => switchLanguage('en'));
    });

    khToggles.forEach(btn => {
        btn.addEventListener('click', () => switchLanguage('kh'));
    });
}
