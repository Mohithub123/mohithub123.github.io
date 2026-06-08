export class ResumeManager {
  initResumeManager = () => {

    const navButtons = document.querySelectorAll(".nav-card");
    const sections = document.querySelectorAll(".content-section");

    navButtons.forEach(button => {
      button.addEventListener("click", () => {
        console.log("Nav Btn Clicked ");
        navButtons.forEach(b => b.classList.remove("active"));
        sections.forEach(s => s.classList.remove("active"));

        button.classList.add("active");
        document
          .getElementById(button.dataset.target)
          .classList.add("active");
      });
    });
  }
}
