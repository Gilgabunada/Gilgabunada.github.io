
const videos = document.querySelectorAll('video');

videos.forEach((video) => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; 
    });
});

// Navbar section highlighting
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar a');

    sections.forEach(section => {
        let rect = section.getBoundingClientRect();
        
        // Adjust this threshold if needed
        const threshold = 50; // Change this value to tweak sensitivity

        if (rect.top <= window.innerHeight / 2 + threshold && rect.bottom >= window.innerHeight / 2 - threshold) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === section.id) {
                    link.classList.add('active');
                }
            });
        }
    });
});



document.getElementById('readMoreBtn').addEventListener('click', function(event) {
    event.preventDefault(); 
    const moreContent = document.querySelector('.more-content');
    
    if (moreContent.style.display === 'none' || moreContent.style.display === '') {
        moreContent.style.display = 'block'; // Show more content
        this.textContent = 'Read Less'; // Change link text
    } else {
        moreContent.style.display = 'none'; // Hide more content
        this.textContent = 'Read More'; // Change link text back
    }
});

const projectItems = document.querySelectorAll('.grid-item');

// Define the heights for different items (1 = 150px, 2 = 300px)
const heights = [1, 1, 2, 1, 2, 1]; 

projectItems.forEach((item, index) => {
    item.style.gridRowEnd = `span ${heights[index]}`; // Adjust row span based on defined heights
});



