// Scroll animations
function animateOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => observer.observe(el));
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Load projects via AJAX
document.addEventListener("DOMContentLoaded", function () {
  // Initialize animations
  animateOnScroll();
  initBackToTop();

  // Load projects
  const container = document.getElementById("projects-container");
  fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      container.innerHTML = ""; // Remove spinner
      data.forEach((project, index) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
          <div class="card project-card h-100">
            <img src="${project.image}" class="card-img-top" alt="${project.title}">
            <div class="card-body">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">${project.description}</p>
              <a href="${project.link}" class="btn btn-primary">View Project</a>
            </div>
          </div>
        `;
        container.appendChild(card);
        // Animate cards with delay
        setTimeout(() => {
          card.querySelector(".project-card").classList.add("animate");
        }, index * 200);
      });
    })
    .catch((error) => {
      console.error("Error loading projects:", error);
      container.innerHTML =
        '<p class="text-center">Error loading projects.</p>';
    });

  // Handle contact form submission
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simulate AJAX submission
    fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("response-message").innerHTML =
          '<div class="alert alert-success animate__animated animate__fadeIn">Message sent successfully!</div>';
        form.reset();
      })
      .catch((error) => {
        document.getElementById("response-message").innerHTML =
          '<div class="alert alert-danger animate__animated animate__shake">Error sending message. Please try again.</div>';
      });
  });
});
