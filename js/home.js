/**
 * HOME PAGE JAVASCRIPT
 * Handles interactions on the homepage including navigation
 */

// Navigate to projects page with specific category
// Parameters: category - The project category to filter/highlight
function navigateToProjects(category) {
  // Store the selected category in session storage for the projects page
  sessionStorage.setItem("selectedCategory", category)

  // Navigate to the projects page
  window.location.href = "projects.html"
}

// Smooth scroll effect for navigation links
// This function adds smooth scrolling to any internal navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Add active class to current page link in navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    }
  })

  // Add scroll animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease forwards"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe work cards for lazy animation
  document.querySelectorAll(".work-card").forEach((card) => {
    observer.observe(card)
  })
})
