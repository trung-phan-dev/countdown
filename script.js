const timeline = document.getElementById('timeline');
const fill = document.querySelector('.timeline-fill');
const progressDot = document.getElementById('progress-dot');
const dayCounter = document.getElementById('day-counter');
const particleContainer = document.getElementById('particle-container');

function updateTimeline() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
    const totalDays = (endOfYear - startOfYear) / (1000 * 60 * 60 * 24);
    const daysPassed = (now - startOfYear) / (1000 * 60 * 60 * 24);
    const percentage = (daysPassed / totalDays) * 100;

    gsap.to(fill, {
        width: `${percentage}%`,
        duration: 1,
        ease: 'power2.inOut'
    });

    gsap.to(progressDot, {
        left: `${percentage}%`,
        duration: 1,
        ease: 'power2.inOut'
    });

    dayCounter.textContent = `Day ${Math.floor(daysPassed)} of ${Math.floor(totalDays)}`;
}

function createParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.background = 'radial-gradient(circle, #fff, transparent)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particleContainer.appendChild(particle);

        gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        });

        gsap.to(particle, {
            x: `+=${Math.random() * 100 - 50}`,
            y: `+=${Math.random() * 100 - 50}`,
            duration: Math.random() * 10 + 5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 5
        });
    }
}

timeline.addEventListener('mousemove', (e) => {
    const rect = timeline.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const day = Math.floor((percentage / 100) * 365);

    gsap.to(progressDot, {
        left: `${percentage}%`,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
        overwrite: true
    });

    dayCounter.textContent = `Day ${day} of 365`;
});

timeline.addEventListener('mouseleave', () => {
    updateTimeline();
});

updateTimeline();
createParticles();
setInterval(updateTimeline, 86400000);