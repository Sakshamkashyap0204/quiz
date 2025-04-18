import { useEffect } from 'react';
import './SpaceBackground.css';

export default function SpaceBackground() {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Random size (0.5px to 2px)
      const size = Math.random() * 1.5 + 0.5;
      
      // Random animation duration (3s to 10s)
      const duration = Math.random() * 7 + 3;
      
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDuration = `${duration}s`;
      
      document.querySelector('.space-background').appendChild(star);
    };
    
    // Create 100 stars
    for (let i = 0; i < 100; i++) {
      createStar();
    }
    
    // Add some shooting stars occasionally
    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight / 2;
        const angle = Math.random() * 30 + 15;
        
        shootingStar.style.left = `${x}px`;
        shootingStar.style.top = `${y}px`;
        shootingStar.style.transform = `rotate(${angle}deg)`;
        
        document.querySelector('.space-background').appendChild(shootingStar);
        
        // Remove after animation completes
        setTimeout(() => {
          shootingStar.remove();
        }, 2000);
      }
    }, 3000);
    
    return () => clearInterval(shootingStarInterval);
  }, []);
  
  return <div className="space-background"></div>;
}