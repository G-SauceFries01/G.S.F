/**
 * PROJECTS PAGE JAVASCRIPT
 * Handles project filtering, modal popups, and carousel functionality
 */

// Sample projects data with categories and images
const projectsData = [
  {
    id: 1,
    name: "Tech Week 2025",
    category: "Other Projects",
    thumbnail: "photos/techweek2025-icon.png",
    images: ["photos/techweek2025-logo.png", "photos/techweek2025-poster.png", "photos/techweek2025-banner.png"],
    descriptions: [
      "Official Event Logo",
      "Facebook Adverstisement Poster",
      "Website Banner AD",
    ],
  },
  {
    id: 2,
    name: "Jumbo Combo Meal Advertisement",
    category: "Main Projects",
    thumbnail: "photos/fastfood-icon.png",
    images: ["photos/fastfood-poster.png", "photos/fastfood-flyer.png", "photos/movie-poster.png"],
    descriptions: [
      "Jumbo Combo Meal Official Poster",
      "Jumbo Combo Meal Official Flyer",
      "Bonus Project - Collectible Addtion of THE PIT Poster when Availing the jumbo Combo Meal",
    ],
  },
  {
    id: 3,
    name: "Japanese Communication Styles & Ethics Presentation",
    category: "Other Projects",
    thumbnail: "photos/presentation-title.png",
    images: ["photos/presentation-title.png", "photos/presentation-introduction.png", "photos/presentation-examples.png"],
    descriptions: [
      "Presentation Title Page",
      "Presentation Introduction Page",
      "Presentation Examples Page",
    ],
  },
  {
    id: 4,
    name: "Official G.S.F Business Logo's",
    category: "Main Projects",
    thumbnail: "photos/business-logo.png",
    images: ["photos/business-logo.png", "photos/business-veticallogo.png", "photos/business-badgelogo.png"],
    descriptions: [
      "Official G.S.F Business Logo",
      "Official G.S.F Business Logo - Vetical Variant",
      "Official G.S.F Business Logo - Employee Badge Variant.",
    ],
  },
  {
    id: 5,
    name: "Office Lifestyle Magazine",
    category: "Other Projects",
    thumbnail: "photos/magazine-icon.png",
    images: ["photos/magazine-cover.png", "photos/magazine-aboutme.png", "photos/magazine-hobbies.png"],
    descriptions: [
      "Office Lifestyle Magazine - Cover",
      "Office Lifestyle Magazine - About Me Description",
      "Office Lifestyle Magazine - Hobbies Description",
    ],
  },
  {
    id: 6,
    name: "Puppy Path - Adoption Center",
    category: "Main Projects",
    thumbnail: "photos/puppypath-icon.png",
    images: ["photos/puppypath-selection.png", "photos/puppypath-dogprofile.png", "photos/puppypath-faqs.png"],
    descriptions: [
      "Parts I Collaborated With: Website Dogs Selection Page",
      "Parts I Collaborated With: Website Dog Profile Page",
      "Parts I Collaborated With: Website Dogs FAQs Page",
    ],
  },
];

// Current modal state variables
let currentProjectId = null
let currentImageIndex = 0

/**
 * Initialize projects page and render project items
 */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects("All")

  // Add active class to current page link
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })

  // Check for selected category from homepage
  const selectedCategory = sessionStorage.getItem("selectedCategory")
  if (selectedCategory) {
    filterProjects(selectedCategory)
    sessionStorage.removeItem("selectedCategory")
  }
})

/**
 * Render projects in the grid based on category
 * Parameters: category - The category to display ('all' for all projects)
 */
function renderProjects(category) {
  const projectsGrid = document.getElementById("projectsGrid")
  projectsGrid.innerHTML = ""

  projectsData.forEach((project, index) => {
    if (category === "All" || project.category === category) {
      const projectElement = createProjectElement(project, index)
      projectsGrid.appendChild(projectElement)
    }
  })
}

/**
 * Create a project item element
 * Parameters: project - Project data object, index - Project index for animation
 * Returns: HTML element for project item
 */
function createProjectElement(project, index) {
  const div = document.createElement("div")
  div.className = "project-item"
  div.style.animationDelay = `${index * 0.1}s`
  div.innerHTML = `
        <img src="${project.thumbnail}" alt="${project.name}" class="project-thumbnail">
        <div class="project-details">
            <p class="project-category">${project.category}</p>
            <h3 class="project-name">${project.name}</h3>
            <p class="project-desc">Click to view all project images and details</p>
        </div>
    `
  div.addEventListener("click", () => openProjectModal(project))
  return div
}

/**
 * Filter and display projects by category
 * Parameters: category - The category to filter by
 */
function filterProjects(category) {
  // Update active button
  const buttons = document.querySelectorAll(".category-btn")
  buttons.forEach((btn) => {
    btn.classList.remove("active")
  })
  event.target.classList.add("active")

  // Render projects
  renderProjects(category)
}

/**
 * Open project modal with carousel
 * Parameters: project - Project data object to display
 */
function openProjectModal(project) {
  currentProjectId = project.id
  currentImageIndex = 0

  // Set modal content
  document.getElementById("modalTitle").textContent = project.name
  document.getElementById("totalImages").textContent = project.images.length

  // Display first image
  displayCarouselImage(project)

  // Show modal with animation
  const modal = document.getElementById("projectModal")
  modal.classList.add("active")
}

/**
 * Close the project modal
 */
function closeProjectModal() {
  const modal = document.getElementById("projectModal")
  modal.classList.remove("active")
  currentProjectId = null
  currentImageIndex = 0
}

/**
 * Display current carousel image and description
 * Parameters: project - Project data object
 */
function displayCarouselImage(project) {
  const image = project.images[currentImageIndex]
  const description = project.descriptions[currentImageIndex]

  document.getElementById("carouselImage").src = image
  document.getElementById("currentImageNumber").textContent = currentImageIndex + 1
  document.getElementById("imageDescription").textContent = description
}

/**
 * Navigate to next image in carousel
 */
function nextImage() {
  const project = projectsData.find((p) => p.id === currentProjectId)
  if (project) {
    currentImageIndex = (currentImageIndex + 1) % project.images.length
    displayCarouselImage(project)
  }
}

/**
 * Navigate to previous image in carousel
 */
function prevImage() {
  const project = projectsData.find((p) => p.id === currentProjectId)
  if (project) {
    currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length
    displayCarouselImage(project)
  }
}

/**
 * Keyboard navigation for carousel
 * Arrow keys: Left/Right to navigate images, Escape to close modal
 */
document.addEventListener("keydown", (event) => {
  if (document.getElementById("projectModal").classList.contains("active")) {
    if (event.key === "ArrowLeft") {
      prevImage()
    } else if (event.key === "ArrowRight") {
      nextImage()
    } else if (event.key === "Escape") {
      closeProjectModal()
    }
  }
})

/**
 * Close modal when clicking outside content
 */
document.getElementById("projectModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeProjectModal()
  }
})
