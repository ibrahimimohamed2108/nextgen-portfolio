import anime from 'animejs';
import { TechCategory } from '@/types/techStack';

export const createPlanetAnimations = (techData: TechCategory[]) => {
  techData.forEach((category, index) => {
    const planetSelector = `.planet-${index}`;
    
    // Planet orbital animation
    anime({
      targets: planetSelector,
      rotate: '360deg',
      duration: 15000 + (index * 3000),
      easing: 'linear',
      loop: true,
      delay: index * 500
    });

    // Moon orbital animations
    category.technologies.forEach((_, moonIndex) => {
      const moonSelector = `.moon-${index}-${moonIndex}`;
      
      anime({
        targets: moonSelector,
        rotate: '360deg',
        duration: 8000 + (moonIndex * 200),
        easing: 'linear',
        loop: true,
        delay: (index * 500) + (moonIndex * 100)
      });
    });
  });
};

export const createEntranceAnimations = () => {
  // Entrance animation for the entire system
  anime({
    targets: '.solar-system',
    scale: [0, 1],
    opacity: [0, 1],
    duration: 2000,
    easing: 'easeOutElastic(1, .8)',
    delay: 500
  });

  // Stagger animation for planets
  anime({
    targets: '.planet-container',
    scale: [0, 1],
    opacity: [0, 1],
    duration: 1000,
    delay: anime.stagger(200, {start: 1000}),
    easing: 'easeOutBack(1.7)'
  });
};
