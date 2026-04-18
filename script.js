document.addEventListener('DOMContentLoaded', () => {
    // Start the ETL (Extract, Transform, Load) process
    loadPortfolio();
});

/**
 * EXTRACT PHASE
 * Fetches the raw data from your JSON "database"
 */
async function loadPortfolio() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // TRANSFORM & LOAD PHASES
        renderProfile(data.profile);
        renderProjects(data.projects);
        renderEducation(data.education);

        // POST-LOAD: Initialize dynamic interactions
        initVideoLogic();
        initReadMoreLogic();

    } catch (error) {
        console.error("ETL Process Failed:", error);
    }
}

/**
 * TRANSFORM & LOAD: Profile Section
 * Injects name, role, and bio text into the Home and About sections
 */
function renderProfile(profile) {
    if (!profile) return;

    // Existing injections
    document.querySelector('.home-content h1').innerHTML = `Hi, Im ${profile.firstName} <span>${profile.lastName}</span>`;
    document.querySelector('.home-content h3').textContent = profile.role;
    document.querySelector('.home-content p').textContent = profile.homeDescription;
    document.querySelector('.about-content p').textContent = profile.aboutText;

    // New injections for Section Intros
    const projectsIntro = document.querySelector('.projects-content p');
    const educationIntro = document.querySelector('.education-content p');

    if (projectsIntro) projectsIntro.textContent = profile.projectsIntro;
    if (educationIntro) educationIntro.textContent = profile.educationIntro;
}
/**
 * TRANSFORM & LOAD: Projects Section
 * Dynamically creates either <img> or <video> tags based on the data type
 */
function renderProjects(projects) {
    const container = document.querySelector('.project-grid');
    if (!container) return;

    container.innerHTML = projects.map(project => `
        <div class="grid-item">
            <div class="media-wrapper">
                ${project.type === 'video' 
                    ? `<video src="${project.src}" class="video" muted loop></video>` 
                    : `<img src="${project.src}" alt="Project Image">`
                }
                <div class="overlay">${project.description}</div>
            </div>
        </div>
    `).join('');
}

/**
 * TRANSFORM & LOAD: Education Section
 * Maps course arrays into a timeline structure
 */
function renderEducation(education) {
    const container = document.querySelector('.timeline');
    if (!container) return;

    container.innerHTML = education.map(item => `
        <div class="timeline-item ${item.alignment}">
            <div class="timeline-date">
                <span>${item.year}</span>
                <span>${item.semester}</span>
            </div>
            <div class="timeline-content">
                ${item.courses.map(course => `<h3>${course}</h3>`).join('')}
            </div>
        </div>
    `).join('');
}

/**
 * BEHAVIOR: Video Hover Logic
 * Attaches listeners to play/pause videos on mouse interaction
 */
function initVideoLogic() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('mouseenter', () => video.play());
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });
}

/**
 * BEHAVIOR: Read More Logic
 * Preserves your original toggle functionality if the button exists
 */
function initReadMoreLogic() {
    const readMoreBtn = document.getElementById('readMoreBtn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const moreContent = document.querySelector('.more-content');
            if (moreContent) {
                const isHidden = moreContent.style.display === 'none' || !moreContent.style.display;
                moreContent.style.display = isHidden ? 'block' : 'none';
                this.textContent = isHidden ? 'Read Less' : 'Read More';
            }
        });
    }
}