export class ParticleJs {

    initParticleJs = () => {
        tsParticles.load("particles-js", {
            particles: {
                number: {
                    value: 150,
                    density: { enable: true, value_area: 900 }
                },
                color: { value: ["#4f46e5", "#22d3ee", "#a855f7", "#f472b6"] },
                shape: { type: ["circle", "edge", "polygon"] },
                opacity: {
                    value: 0.8,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: "none",
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab",
                        random: true
                    },
                    onclick: {
                        enable: false
                    },
                    resize: true
                },
                modes: {
                    attract: {
                        distance: 200,
                        duration: 0.4,
                        easing: "ease-out-quad",
                        factor: 1,
                        maxSpeed: 50,
                        speed: 1
                    },
                    repulse: {
                        distance: 70,
                        maxSpeed: 20,
                        duration: 0.5,
                    },
                    grab: {
                        distance: 150,
                        line_linked: {
                            opacity: 1,
                            color: "#4f8f8b"
                        }
                    }
                }
            },
            retina_detect: true
        });
    }
}
