/**
 * Developer Portfolio Script
 * Student: SULUGURI SAHASRA REDDY
 */

// ==========================================
// 1. Global Configurations & State Variables
// ==========================================
const GITHUB_USERNAME = "YOUR_GITHUB_USERNAME"; // Replace with your actual username

// Example Projects Data Store
const projectsData = [
    {
        id: 1,
        title: "Personal Productivity Workspace",
        description: "A responsive productivity dashboard that allows users to organize tasks, projects, schedules, goals, and notes in one centralized workspace.",
        category: "web",
        tags: ["HTML", "CSS", "JavaScript"],
        image: "https://via.placeholder.com/400x250/E6E6FA/2D3748?text=Productivity+Workspace",
        github: "https://github.com/YOUR_USERNAME/productivity-workspace",
        demo: "https://example.com/demo1"
    },
    {
        id: 2,
        title: "E-Commerce Shopping System",
        description: "A Java-based shopping system demonstrating practical implementation of data structures such as arrays, linked lists, stacks, and queues.",
        category: "java",
        tags: ["Java", "Data Structures", "OOP"],
        image: "https://via.placeholder.com/400x250/FFD1DC/2D3748?text=E-Commerce+System",
        github: "https://github.com/YOUR_USERNAME/java-ecommerce",
        demo: "https://example.com/demo2"
    },
    {
        id: 3,
        title: "Algorithm Comparison Visualizer",
        description: "An interactive interface for understanding and comparing sorting algorithms through visual representations and performance information.",
        category: "dsa",
        tags: ["HTML", "CSS", "JavaScript", "Algorithms"],
        image: "https://via.placeholder.com/400x250/AEC6CF/2D3748?text=Algorithm+Visualizer",
        github: "https://github.com/YOUR_USERNAME/algo-visualizer",
        demo: "https://example.com/demo3"
    }
];

// ==========================================
// 2. DOM Elements Selection
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectsGrid = document.getElementById('projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');
const backToTopBtn = document.getElementById('back-to-top');
const scrollProgressBar = document.getElementById('scroll-progress');

// ==========================================
// 3. Theme Initialization & Management
// ==========================================
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fa-solid fa-sun';
    } else {
        icon.className = 'fa-solid fa-moon';
    }
}

themeToggleBtn.addEventListener('click', toggleTheme);

// ==========================================
// 4. Mobile Navigation Toggle
// ==========================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close Mobile Menu on Link Click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==========================================
// 5. Scroll Progress & Active Nav Link Observer
// ==========================================
window.addEventListener('scroll', () => {
    // Scroll Progress Calculation
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgressBar.style.width = scrolled + "%";

    // Back to Top Button Toggle
    if (winScroll > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // Active Navigation Highlight
    let currentSection = "";
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// 6. Projects Rendering & Filtering
// ==========================================
function renderProjects(items) {
    projectsGrid.innerHTML = "";
    items.forEach(project => {
        const card = document.createElement('div');
        card.className = 'glass-card project-card scroll-reveal revealed';
        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${project.image}" alt="${project.title}" class="project-img">
            </div>
            <div class="project-body">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tech">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" rel="noopener" class="btn btn-sm btn-outline"><i class="fa-brands fa-github"></i> Code</a>
                    <a href="${project.demo}" target="_blank" rel="noopener" class="btn btn-sm btn-primary"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        if (filterValue === 'all') {
            renderProjects(projectsData);
        } else {
            const filteredProjects = projectsData.filter(p => p.category === filterValue);
            renderProjects(filteredProjects);
        }
    });
});

// ==========================================
// 7. Dynamic GitHub API Integration
// ==========================================
async function fetchGitHubRepos() {
    const reposContainer = document.getElementById('github-repos');
    
    if (GITHUB_USERNAME === "YOUR_GITHUB_USERNAME") {
        reposContainer.innerHTML = `
            <div class="glass-card" style="grid-column: 1/-1; text-align: center;">
                <p style="color: var(--text-muted);">Please replace <code>GITHUB_USERNAME</code> in <code>script.js</code> to dynamically display your GitHub repositories.</p>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error("Could not fetch repositories");
        
        const repos = await response.json();
        reposContainer.innerHTML = "";

        if (repos.length === 0) {
            reposContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No public repositories found.</p>`;
            return;
        }

        repos.forEach(repo => {
            const repoCard = document.createElement('div');
            repoCard.className = 'glass-card repo-card';
            repoCard.innerHTML = `
                <div>
                    <div class="repo-header">
                        <i class="fa-solid fa-book-bookmark"></i>
                        <a href="${repo.html_url}" target="_blank" rel="noopener"><strong>${repo.name}</strong></a>
                    </div>
                    <p class="repo-desc">${repo.description || "No description provided."}</p>
                </div>
                <div class="repo-stats">
                    <span><i class="fa-solid fa-circle" style="color: var(--primary-accent); font-size: 0.6rem;"></i> ${repo.language || "Plain Text"}</span>
                    <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fa-solid fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            `;
            reposContainer.appendChild(repoCard);
        });
    } catch (error) {
        reposContainer.innerHTML = `
            <div class="glass-card" style="grid-column: 1/-1; text-align: center;">
                <p style="color: var(--text-muted);"><i class="fa-solid fa-circle-exclamation"></i> Unable to load GitHub repositories at this time.</p>
            </div>
        `;
    }
}

// ==========================================
// 8. Contact Form Client Validation & Handling
// ==========================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> ${message}`;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Simple Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Name
    if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('invalid');
        isValid = false;
    } else {
        nameInput.parentElement.classList.remove('invalid');
    }

    // Validate Email
    if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('invalid');
        isValid = false;
    } else {
        emailInput.parentElement.classList.remove('invalid');
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
        subjectInput.parentElement.classList.add('invalid');
        isValid = false;
    } else {
        subjectInput.parentElement.classList.remove('invalid');
    }

    // Validate Message
    if (messageInput.value.trim().length < 10) {
        messageInput.parentElement.classList.add('invalid');
        isValid = false;
    } else {
        messageInput.parentElement.classList.remove('invalid');
    }

    if (isValid) {
        showToast("Message sent successfully!", "success");
        contactForm.reset();
    } else {
        showToast("Please fill out all fields correctly.", "error");
    }
});

// ==========================================
// 9. Intersection Observer (Scroll Reveal)
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// 10. Initialization Sequence
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderProjects(projectsData);
    fetchGitHubRepos();
    initScrollReveal();
});