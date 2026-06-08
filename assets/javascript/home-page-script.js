import { DateTime } from "./date_time_logic.js";
import { BatteryHelper } from "./battery_helper.js";
import { NetworkHelper } from "./network_helper.js";
import { WindowManager } from "./window_manager.js";
import { ResumeManager } from "./resume-page-script.js";
import { ParticleJs } from "./particle-js.js";
import { VideoOptimizer } from "./video-optimizer.js";
import { FormHandler } from "../ajax/submit-form-ajax.js";

window.addEventListener("load", () => {
    document.documentElement.classList.add("theme-ready");
});


const window_manager = new WindowManager();
const resume_manager = new ResumeManager();
const particle_js = new ParticleJs();
const form_handler = new FormHandler();

document.addEventListener("DOMContentLoaded", () => {
    getUpdatedDateTime();
    themeTooggler();
    updateBatteryStatus();
    updateNetworkStatus();
    initNavIconListener();
    initTerminalInfoDisplay();
    resume_manager.initResumeManager();
    particle_js.initParticleJs();
});

// function to update date and time every minute
const getUpdatedDateTime = () => {
    const currentDateTime = new DateTime().getCurrentDateTime();
    document.querySelector(".dateTimeField").textContent = currentDateTime;
    setTimeout(getUpdatedDateTime, 60000);
};

// function for theme toggler
const themeTooggler = () => {
    const iconBtn = document.querySelector("#theme-toggler");
    const iconImg = iconBtn.querySelector("img");
    const htmlElement = document.documentElement;

    // update icon based on theme
    const updateThemeIcon = (theme) => {
        if (theme === "dark") {
            iconImg.src = "./assets/icons/light-icon.png";
            iconImg.alt = "Switch to light mode";
        } else {
            iconImg.src = "./assets/icons/dark-icon.png";
            iconImg.alt = "Switch to dark mode";
        }
    };

    // apply theme
    const applyTheme = (theme) => {
        htmlElement.setAttribute("data-theme", theme);
        updateThemeIcon(theme);
    };

    // initialize theme on load
    const initTheme = () => {
        const savedTheme = htmlElement.getAttribute("data-theme");

        if (savedTheme) {
            applyTheme(savedTheme);
            return;
        }

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = prefersDark ? "dark" : "light";

        applyTheme(theme);
    };


    // toggle handler
    iconBtn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        applyTheme(newTheme);
    });

    initTheme();
};


// function to update battery status
const updateBatteryStatus = async () => {
    const batteryHelper = new BatteryHelper();
    await batteryHelper.init();

    const batteryIcon = document.querySelector(".battery img");
    const batteryText = document.querySelector(".battery p");

    const render = () => {
        const level = Math.floor(batteryHelper.battery.level * 100);
        const charging = batteryHelper.battery.charging;

        batteryText.textContent = `${level}%`;

        if (charging) {
            batteryIcon.src = "./assets/icons/battery-charging.png";
            return;
        }

        if (level <= 15) {
            batteryIcon.src = "./assets/icons/battery-critical.png";
        } else if (level <= 60) {
            batteryIcon.src = "./assets/icons/battery-half.png";
        } else {
            batteryIcon.src = "./assets/icons/battery-full.png";
        }
    };

    // INITIAL RENDER (THIS WAS MISSING)
    render();

    // LIVE UPDATES
    batteryHelper.battery.addEventListener("levelchange", render);
    batteryHelper.battery.addEventListener("chargingchange", render);
};


//  for network status updates (optional)
const updateNetworkStatus = () => {

    const networkIcon = document.querySelector(".network img");

    const renderNetwork = (isOnline) => {
        networkIcon.src = isOnline
            ? "./assets/icons/network-online.png"
            : "./assets/icons/network-offline.png";
    };

    // INITIAL STATE
    renderNetwork(NetworkHelper.isOnline());

    // LIVE UPDATES
    NetworkHelper.onStatusChange(renderNetwork);

}


// for button click event listener 
const initNavIconListener = () => {
    const btn_portfolio = document.querySelector('#icon_home');
    const btn_resume = document.querySelector('#icon_resume');
    const btn_projects = document.querySelector('#icon_projects');
    const btn_skills = document.querySelector('#icon_skills');
    const btn_achievements = document.querySelector('#icon_achievements');
    const btn_contact = document.querySelector('#icon_contact');

    // event listeners 
    btn_portfolio.addEventListener('click', () => {
        window_manager.open({
            id: "portfolio",
            title: "Portfolio",
            contentUrl: "./assets/html/pages/portfolio.html"
        });
    });

    btn_resume.addEventListener('click', () => {
        window_manager.open({
            id: "resume",
            title: "Resume",
            contentUrl: "./assets/html/pages/resume.html"
        }).then(() => {
            resume_manager.initResumeManager();
        });
    });

    btn_projects.addEventListener('click', () => {
        window_manager.open({
            id: "projects",
            title: "Projects",
            contentUrl: "./assets/html/pages/projects.html"
        }).then(() => {
            VideoOptimizer.init();
        });
    });

    btn_skills.addEventListener('click', () => {
        window_manager.open({
            id: "skills",
            title: "Fields of Expertise",
            contentUrl: "./assets/html/pages/skills.html"
        });
    });


    btn_achievements.addEventListener('click', () => {

    window_manager.open({

        id: "achievements",

        title: "Achievements & Certifications",

        contentUrl: "./assets/html/pages/achievements.html"

    });

});

    btn_contact.addEventListener('click', () => {
        window_manager.open({
            id: "contact",
            title: "Contact Details",
            contentUrl: "./assets/html/pages/contact.html"
        }).then(() => {
            form_handler.initFormHandler(this);
        });
    });
}

//  function for displaying the terminal text 
const initTerminalInfoDisplay = () => {
    const terminalData = [
        "data class DeveloperProfile (",
        "val name = \"Mohit Chandravanshi\",",
        "val qualification = \"B.Tech (Hons) CSE Data Science\",",
        "val role = \"Python Developer | AI/ML Developer\",",
        "val skills = listOf (",
        "      \"Machine Learning\",",
        "      \"Deep Learning\",",
        "      \"Computer Vision\",",
        "      \"Natural Language Processing\",",
        "      \"LLM Integration\",",
        "),",
        "val techStack = listOf (",
        "      \"Python\",",
        "      \"FastAPI\",",
        "      \"TensorFlow\",",
        "      \"PyTorch\",",
        "      \"OpenCV\",",
        "      \"Scikit-learn\",",
        "      \"Transformers\",",
        "      \"NumPy\",",
        "      \"Pandas\",",
        "      \"React.js\",",
        "      \"Next.js\",",
        "      \"JavaScript\",",
        "),",
        "val projects = listOf (",
        "      \"Sign Language Recognition\",",
        "      \"AI Chatbot System\",",
        "      \"Virtual Mouse Gesture\",",
        "),",
        "val email = \"mohitkumarchandravanshi205@gmail.com\"",
        "val phone = \"+91 9399747671\"",
        ")",
    ];


    let lineIdx = 0;
    let charIdx = 0;
    const displayElement = document.getElementById('typed-text');

    const startTypeEffect = () => {
        if (lineIdx < terminalData.length) {
            let currentLine = terminalData[lineIdx];
            if (charIdx < currentLine.length) {
                displayElement.innerHTML += currentLine.charAt(charIdx);
                charIdx++;
                setTimeout(startTypeEffect, 80);
            } else {
                displayElement.innerHTML += "<br/>";
                lineIdx++;
                charIdx = 0;
                setTimeout(startTypeEffect, 500);
            }
        } else {
            setTimeout(() => {
                displayElement.innerHTML = "";
                lineIdx = 0;
                charIdx = 0;
                startTypeEffect();
            }, 1000);
        }
    }
    startTypeEffect();
}