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
    
    // Get all POV buttons
    const povButtons = document.querySelectorAll('.pov-button');
    
    // Add click event listener to each button
    povButtons.forEach(button => {
        button.addEventListener('click', function() {
            const stanzaNum = this.getAttribute('data-stanza');
            const povContent = document.getElementById(`pov-${stanzaNum}`);
            
            // Toggle active state
            this.classList.toggle('active');
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
        });
    });
    
    // Add hover effects to stanzas for better interactivity
    const stanzas = document.querySelectorAll('.stanza');
    
    stanzas.forEach(stanza => {
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
        
        const effect = document.createElement('div');
        effect.className = 'background-effect';
        
        const size = Math.random() * 200 + 100;
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
        
        setTimeout(randomBackgroundEffects, Math.random() * 5000 + 3000);
    }
    
    // Start the background effects after a short delay
    setTimeout(randomBackgroundEffects, 2000);
});  
