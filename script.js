// Project data
const projects = [
    {
        id: 1,
        title: "Residential Solar Installation",
        description: "Complete 5kW solar panel system installed for a 3-bedroom home in Sunnyville, including battery backup.",
        image: "item4.jpg",
        category: "solar",
        location: "Sunnyville, CA",
        equipment: "SunPower Panels, Tesla Powerwall",
        type: "Residential"
    },
    {
        id: 2,
        title: "Commercial Electrical Upgrade",
        description: "Full electrical system upgrade for downtown office building, including new panel and wiring throughout.",
        image: "item12.jpg",
        category: "electrical",
        location: "Downtown Business District",
        equipment: "Square D Panel, 200A Service",
        type: "Commercial"
    },
    {
        id: 3,
        title: "Industrial Backup Power",
        description: "150kW diesel generator installation with automatic transfer switch for manufacturing facility.",
        image: "item2.jpg",
        category: "backup",
        location: "Industrial Park",
        equipment: "Cummins Generator",
        type: "Industrial"
    },
    {
        id: 4,
        title: "Solar Panel Cleaning",
        description: "Deep cleaning and performance check for 10kW solar array on commercial property.",
        image: "item11.jpg",
        category: "maintenance",
        location: "Corporate Campus",
        equipment: "Specialized cleaning tools",
        type: "Commercial"
    },
    {
        id: 5,
        title: "Solar Carport Installation",
        description: "Dual-purpose solar carport system providing shade and 8kW of clean energy for apartment complex.",
        image: "item13.jpg",
        category: "solar",
        location: "Maplewood Apartments",
        equipment: "LG Panels, SolarEdge Inverters",
        type: "Residential"
    },
    {
        id: 6,
        title: "Whole House Rewire",
        description: "Complete rewiring of 1960s home including new outlets, lighting circuits, and panel upgrade.",
        image: "item6.jpg",
        category: "electrical",
        location: "Historic District",
        equipment: "Copper Wiring, AFCI Breakers",
        type: "Residential"
    }
];

// DOM elements
const galleryGrid = document.getElementById('gallery-grid');
const categoryBtns = document.querySelectorAll('.category-btn');
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.getElementById('close-lightbox');

// Initialize gallery
function initGallery() {
    renderProjects(projects);
    setupEventListeners();
}

// Render projects to the grid
function renderProjects(projectsToRender) {
    galleryGrid.innerHTML = '';
    
    projectsToRender.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'gallery-item relative group';
        projectElement.dataset.category = project.category;
        
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all">
                <h3 class="text-white opacity-0 group-hover:opacity-100 text-xl font-bold text-center px-4 transition-all">
                    ${project.title}
                </h3>
            </div>
        `;
        
        projectElement.addEventListener('click', () => openLightbox(project));
        galleryGrid.appendChild(projectElement);
    });
}

// Filter projects by category
function filterProjects(category) {
    if (category === 'all') {
        renderProjects(projects);
    } else {
        const filteredProjects = projects.filter(project => project.category === category);
        renderProjects(filteredProjects);
    }
}

// Open lightbox with project details
function openLightbox(project) {
    document.getElementById('lightbox-image').src = project.image;
    document.getElementById('lightbox-title').textContent = project.title;
    document.getElementById('lightbox-desc').textContent = project.description;
    document.getElementById('lightbox-location').textContent = project.location;
    document.getElementById('lightbox-equipment').textContent = project.equipment;
    document.getElementById('lightbox-type').textContent = project.type;
    
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightboxHandler() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Set up event listeners
function setupEventListeners() {
    // Category filter buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active', 'bg-solar-500', 'text-white'));
            btn.classList.add('active', 'bg-solar-500', 'text-white');
            filterProjects(btn.dataset.category);
        });
    });
    
    // Lightbox close
    closeLightbox.addEventListener('click', closeLightboxHandler);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightboxHandler();
    });
    
    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightboxHandler();
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);