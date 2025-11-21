/**
 * ABOUT PAGE JAVASCRIPT
 * Handles animations and interactions on the about page
 */

document.addEventListener("DOMContentLoaded", () => {
  // Add active class to current page link in navigation
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation to achievement items when visible
        if (entry.target.classList.contains("achievement-item")) {
          entry.target.style.animation = "slideInLeft 0.6s ease forwards"
        }
        // Add animation to certificate cards when visible
        if (entry.target.classList.contains("certificate-card")) {
          entry.target.style.animation = "zoomIn 0.6s ease forwards"
        }
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all achievement items and certificate cards
  document.querySelectorAll(".achievement-item").forEach((item) => {
    observer.observe(item)
  })

  document.querySelectorAll(".certificate-card").forEach((card) => {
    observer.observe(card)
  })

  // Add click event listeners to certificate cards for expansion effect
  document.querySelectorAll(".certificate-card").forEach((card) => {
    card.addEventListener("click", function () {
      this.style.animation = "pulse 0.6s ease"
      setTimeout(() => {
        this.style.animation = ""
      }, 600)
    })
  })
})

// Pulse animation for certificate cards on click
const style = document.createElement("style")
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`
document.head.appendChild(style)
