// Auto-play videos on hover
const videos = document.querySelectorAll('video');

videos.forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});

// Toggle 'Read More' content
document.getElementById('readMoreBtn').addEventListener('click', function(event) {
    event.preventDefault();
    const moreContent = document.querySelector('.more-content');
    moreContent.style.display = moreContent.style.display === 'none' || !moreContent.style.display ? 'block' : 'none';
    this.textContent = moreContent.style.display === 'block' ? 'Read Less' : 'Read More';
});

// Adjust grid items row span
const projectItems = document.querySelectorAll('.grid-item');
projectItems.forEach((item, index) => {
    const heights = [1, 1, 2, 1, 2, 1]; // Row spans for each item
    if (index < heights.length) {
        item.style.gridRowEnd = `span ${heights[index]}`;
    }
});
