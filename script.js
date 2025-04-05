// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const promptInput = document.getElementById('promptInput');
    const imageResult = document.getElementById('imageResult');
    const generateBtn = document.querySelector('.generate-btn');
    const clearBtn = document.querySelector('.clear-btn');
    const optionBtns = document.querySelectorAll('.option-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Example prompts for random generation
    const examplePrompts = [
        "A serene landscape with mountains and a lake at sunset",
        "A futuristic cityscape with flying vehicles and neon lights",
        "A cozy cafe interior with people enjoying coffee and pastries",
        "A magical forest with glowing plants and mythical creatures",
        "A portrait of a cyberpunk character with technological augmentations",
        "An underwater scene with colorful coral reefs and tropical fish",
        "A medieval castle on a hilltop with knights and dragons",
        "A space scene with planets, stars, and nebulae",
        "A stylized illustration of a cat in a detective outfit",
        "A fantasy library with floating books and magical artifacts"
    ];
    
    // Placeholder images for the "generated" images
    const placeholderImages = [];
    for (let i = 1; i <= 16; i++) {
        placeholderImages.push(`example${i}.jpg`);
    }
    
    // Handle option button clicks
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active state within its category
            const parent = this.closest('.option');
            const siblings = parent.parentElement.querySelectorAll('.option-btn');
            siblings.forEach(sibling => {
                sibling.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Handle generate button click
    generateBtn.addEventListener('click', function() {
        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        loadingText.textContent = '生成中...';
        loadingText.style.color = '#ccc';
        
        // Clear previous content and show loading
        imageResult.innerHTML = '';
        imageResult.appendChild(loadingText);
        
        // If prompt is empty, use a random example prompt
        if (!promptInput.value.trim()) {
            const randomIndex = Math.floor(Math.random() * examplePrompts.length);
            promptInput.value = examplePrompts[randomIndex];
        }
        
        // Simulate image generation with a delay
        setTimeout(function() {
            // Create an image element
            const img = document.createElement('img');
            // Select a random placeholder image
            const randomIndex = Math.floor(Math.random() * 16) + 1;
            img.src = `example${randomIndex}.jpg`;
            img.alt = 'Generated Image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '8px';
            
            // Replace loading text with the image
            imageResult.innerHTML = '';
            imageResult.appendChild(img);
            
            // Add download button
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
            downloadBtn.style.position = 'absolute';
            downloadBtn.style.bottom = '10px';
            downloadBtn.style.right = '10px';
            downloadBtn.style.backgroundColor = '#f0c026';
            downloadBtn.style.color = '#222';
            downloadBtn.style.border = 'none';
            downloadBtn.style.borderRadius = '50%';
            downloadBtn.style.width = '40px';
            downloadBtn.style.height = '40px';
            downloadBtn.style.display = 'flex';
            downloadBtn.style.alignItems = 'center';
            downloadBtn.style.justifyContent = 'center';
            downloadBtn.style.cursor = 'pointer';
            downloadBtn.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
            
            // Make sure the parent has position relative for absolute positioning of the button
            imageResult.style.position = 'relative';
            
            imageResult.appendChild(downloadBtn);
            
            // Handle download button click
            downloadBtn.addEventListener('click', function() {
                // In a real implementation, this would download the image
                alert('图像下载功能将在实际应用中实现');
            });
        }, 1500); // Simulate a 1.5 second generation time
    });
    
    // Handle clear button click
    clearBtn.addEventListener('click', function() {
        promptInput.value = '';
        // Reset the image result to the placeholder
        imageResult.innerHTML = '<div class="placeholder-text">您的图像将在这里显示</div>';
    });
    
    // Example images click handler
    const exampleImages = document.querySelectorAll('.example-image');
    exampleImages.forEach((example, index) => {
        example.addEventListener('click', function() {
            // Set a placeholder prompt based on the image clicked
            promptInput.value = `Similar to example ${index + 1}`;
            
            // Simulate clicking the generate button
            generateBtn.click();
            
            // Scroll to the generator section
            document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // FAQ accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Toggle this FAQ item
            item.classList.toggle('active');
            
            // Optional: close other items when opening a new one
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Activate the first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile menu functionality
    const createMobileMenu = () => {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.className = 'mobile-menu-toggle';
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.style.display = 'none';
            mobileMenuBtn.style.fontSize = '1.5rem';
            mobileMenuBtn.style.color = '#ccc';
            mobileMenuBtn.style.background = 'none';
            mobileMenuBtn.style.border = 'none';
            mobileMenuBtn.style.cursor = 'pointer';
            
            // Add to navbar
            document.querySelector('.navbar').appendChild(mobileMenuBtn);
            
            // Create mobile menu container
            const mobileMenuContainer = document.createElement('div');
            mobileMenuContainer.className = 'mobile-menu-container';
            mobileMenuContainer.style.position = 'fixed';
            mobileMenuContainer.style.top = '0';
            mobileMenuContainer.style.left = '0';
            mobileMenuContainer.style.width = '100%';
            mobileMenuContainer.style.height = '100%';
            mobileMenuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            mobileMenuContainer.style.display = 'none';
            mobileMenuContainer.style.zIndex = '200';
            mobileMenuContainer.style.padding = '2rem';
            
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-menu-close';
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '1rem';
            closeBtn.style.right = '1rem';
            closeBtn.style.color = '#ccc';
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.fontSize = '1.5rem';
            closeBtn.style.cursor = 'pointer';
            
            mobileMenuContainer.appendChild(closeBtn);
            
            // Clone the nav links for mobile
            const mobileNav = document.createElement('div');
            mobileNav.className = 'mobile-nav';
            mobileNav.style.display = 'flex';
            mobileNav.style.flexDirection = 'column';
            mobileNav.style.alignItems = 'center';
            mobileNav.style.justifyContent = 'center';
            mobileNav.style.height = '100%';
            
            const navLinksClone = navLinks.cloneNode(true);
            navLinksClone.style.display = 'flex';
            navLinksClone.style.flexDirection = 'column';
            navLinksClone.style.alignItems = 'center';
            navLinksClone.style.gap = '2rem';
            
            // Style the mobile nav links
            navLinksClone.querySelectorAll('a').forEach(link => {
                link.style.color = '#ccc';
                link.style.fontSize = '1.2rem';
            });
            
            mobileNav.appendChild(navLinksClone);
            mobileMenuContainer.appendChild(mobileNav);
            document.body.appendChild(mobileMenuContainer);
            
            // Toggle mobile menu
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenuContainer.style.display = 'block';
            });
            
            closeBtn.addEventListener('click', function() {
                mobileMenuContainer.style.display = 'none';
            });
            
            // Close mobile menu when a link is clicked
            navLinksClone.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuContainer.style.display = 'none';
                });
            });
            
            // Handle window resize
            const handleResize = () => {
                if (window.innerWidth <= 992) {
                    mobileMenuBtn.style.display = 'block';
                } else {
                    mobileMenuBtn.style.display = 'none';
                    mobileMenuContainer.style.display = 'none';
                }
            };
            
            // Initial check
            handleResize();
            
            // Listen for window resize
            window.addEventListener('resize', handleResize);
        }
    };
    
    // Initialize mobile menu
    createMobileMenu();

    // Update checkbox option functionality to match the screenshot
    const createCheckboxStyle = () => {
        // Find all checkboxes in the options area and style them to match the dark theme
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.style.accentColor = '#f0c026';
        });
    };

    // Call the checkbox styling function
    createCheckboxStyle();

    // Add image upload capability (simulated)
    const addImageUploadButton = () => {
        const uploadBtn = document.createElement('button');
        uploadBtn.className = 'upload-btn';
        uploadBtn.innerHTML = '<i class="fas fa-image"></i>';
        uploadBtn.style.position = 'absolute';
        uploadBtn.style.top = '10px';
        uploadBtn.style.right = '10px';
        uploadBtn.style.backgroundColor = 'rgba(240, 192, 38, 0.2)';
        uploadBtn.style.color = '#f0c026';
        uploadBtn.style.border = 'none';
        uploadBtn.style.borderRadius = '50%';
        uploadBtn.style.width = '40px';
        uploadBtn.style.height = '40px';
        uploadBtn.style.display = 'flex';
        uploadBtn.style.alignItems = 'center';
        uploadBtn.style.justifyContent = 'center';
        uploadBtn.style.cursor = 'pointer';
        uploadBtn.style.zIndex = '10';
        
        // Add the upload button to the image result container
        imageResult.style.position = 'relative';
        imageResult.appendChild(uploadBtn);
        
        // Handle upload button click
        uploadBtn.addEventListener('click', function() {
            alert('上传图像功能将在实际应用中实现');
        });
    };
    
    // Initialize the image upload button
    addImageUploadButton();
}); 