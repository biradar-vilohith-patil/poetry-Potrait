document.addEventListener('DOMContentLoaded', function() {
    // Birthday popup functionality
    const birthdayPopup = document.getElementById('birthday-popup');
    
    // Close popup when clicked anywhere
    birthdayPopup.addEventListener('click', function() {
        birthdayPopup.style.opacity = '0';
        setTimeout(() => {
            birthdayPopup.style.display = 'none';
        }, 500);
    });
    
    // Add touchstart event for better mobile responsiveness
    birthdayPopup.addEventListener('touchstart', function(e) {
        birthdayPopup.style.opacity = '0';
        setTimeout(() => {
            birthdayPopup.style.display = 'none';
        }, 500);
        e.preventDefault(); // Prevent default touch behavior
    });
    
    // Get all POV buttons
    const povButtons = document.querySelectorAll('.pov-button');
    
    // Function to handle POV button clicks
    function handlePovButtonClick(button, isTouch = false) {
        const stanzaNum = button.getAttribute('data-stanza');
        const povContent = document.getElementById(`pov-${stanzaNum}`);
        
        // Toggle active state
        button.classList.toggle('active');
        povContent.classList.toggle('active');
        
        // If we're opening this POV, close all others
        if (povContent.classList.contains('active')) {
            // Close other active POVs
            document.querySelectorAll('.pov-content.active').forEach(otherPov => {
                if (otherPov.id !== `pov-${stanzaNum}`) {
                    otherPov.classList.remove('active');
                    // Find and deactivate the corresponding button
                    const otherButton = document.querySelector(`.pov-button[data-stanza="${otherPov.id.replace('pov-', '')}"]`);
                    if (otherButton) {
                        otherButton.classList.remove('active');
                    }
                }
            });
            
            // Scroll to the POV content if needed
            setTimeout(() => {
                const rect = povContent.getBoundingClientRect();
                const isVisible = (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                );
                
                if (!isVisible) {
                    povContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }, 300);
        }
        
        // Prevent default for touch events
        if (isTouch) {
            return false;
        }
    }
    
    // Add click event listener to each button
    povButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            handlePovButtonClick(this);
            e.stopPropagation(); // Prevent event bubbling
        });
        
        // Add touch events for better mobile experience
        button.addEventListener('touchstart', function(e) {
            handlePovButtonClick(this, true);
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
    });
    
    // Add hover effects to stanzas for better interactivity
    const stanzas = document.querySelectorAll('.stanza');
    
    stanzas.forEach(stanza => {
        // Use touch events for mobile
        stanza.addEventListener('touchstart', function() {
            this.style.transform = 'translateX(5px)';
            
            // Find button within this stanza if it exists
            const button = this.querySelector('.pov-button');
            if (button && !button.classList.contains('active')) {
                button.style.transform = 'scale(1.1)';
            }
        }, { passive: true });
        
        stanza.addEventListener('touchend', function() {
            this.style.transform = 'translateX(0)';
            
            // Reset button style
            const button = this.querySelector('.pov-button');
            if (button && !button.classList.contains('active')) {
                button.style.transform = '';
            }
        }, { passive: true });
        
        // Keep the mouse events for desktop
        stanza.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            
            // Find button within this stanza if it exists
            const button = this.querySelector('.pov-button');
            if (button && !button.classList.contains('active')) {
                button.style.transform = 'scale(1.1)';
            }
        });
        
        stanza.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            
            // Reset button style
            const button = this.querySelector('.pov-button');
            if (button && !button.classList.contains('active')) {
                button.style.transform = '';
            }
        });
    });
    
    // Add subtle gold background animation
    function createBackgroundEffect() {
        const container = document.querySelector('.container');
        const effect = document.createElement('div');
        effect.className = 'background-effect';
        
        Object.assign(effect.style, {
            position: 'absolute',
            background: 'radial-gradient(circle, rgba(197, 169, 126, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '-1',
            opacity: '0',
            transition: 'opacity 2s ease'
        });
        
        container.appendChild(effect);
        
        setTimeout(() => {
            effect.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            effect.style.opacity = '0';
            setTimeout(() => {
                effect.remove();
            }, 2000);
        }, 3000);
    }
    
    // Create background effects periodically
    function randomBackgroundEffects() {
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();
        
        // Adjust effect size for mobile
        const maxSize = window.innerWidth < 480 ? 150 : 200;
        const minSize = window.innerWidth < 480 ? 50 : 100;
        
        const effect = document.createElement('div');
        effect.className = 'background-effect';
        
        const size = Math.random() * (maxSize - minSize) + minSize;
        const left = Math.random() * (rect.width - size);
        const top = Math.random() * (rect.height - size);
        
        Object.assign(effect.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}px`,
            top: `${top}px`,
            background: 'radial-gradient(circle, rgba(197, 169, 126, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '-1',
            opacity: '0',
            transition: 'opacity 3s ease'
        });
        
        container.appendChild(effect);
        
        setTimeout(() => {
            effect.style.opacity = '0.7';
        }, 100);
        
        setTimeout(() => {
            effect.style.opacity = '0';
            setTimeout(() => {
                effect.remove();
            }, 3000);
        }, 4000);
        
        // Adjust timing for mobile to reduce performance impact
        const nextDelay = window.innerWidth < 480 ? 
            Math.random() * 6000 + 4000 : 
            Math.random() * 5000 + 3000;
            
        setTimeout(randomBackgroundEffects, nextDelay);
    }
    
    // Start the background effects after a short delay
    setTimeout(randomBackgroundEffects, 2000);
    
    // Add a resize handler to adjust layout when screen rotates
    window.addEventListener('resize', function() {
        // Close any open POV sections when resizing
        document.querySelectorAll('.pov-content.active').forEach(pov => {
            pov.classList.remove('active');
            const button = document.querySelector(`.pov-button[data-stanza="${pov.id.replace('pov-', '')}"]`);
            if (button) {
                button.classList.remove('active');
            }
        });
    });
});
