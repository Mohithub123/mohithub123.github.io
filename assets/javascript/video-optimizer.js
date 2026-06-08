export class VideoOptimizer {
    static init() {
        const videos = document.querySelectorAll('.project-demo video');

        const observerOptions = {
            root: null, // Use the viewport as the root
            threshold: 0.5 // Trigger when 50% of the video is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    // Video is visible, try to play
                    video.play().catch(error => {
                        console.log("Autoplay blocked or failed:", error);
                    });
                } else {
                    // Video is not visible, pause to save resources
                    video.pause();
                }
            });
        }, observerOptions);

        videos.forEach(video => {
            // Ensure videos are muted for autoplay compatibility
            video.muted = true;
            // Start observing
            observer.observe(video);
        });
    }
}
