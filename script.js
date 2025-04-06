// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
    
    // Header scroll effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('py-2');
        header.classList.remove('py-4');
      } else {
        header.classList.add('py-4');
        header.classList.remove('py-2');
      }
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // Custom cursor
    const cursor = document.querySelector('.cursor-follow');
    
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', function() {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', function() {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // P5.js sketch for the hero background
    new p5(function(p) {
      let particles = [];
      const particleCount = 50;
      
      p.setup = function() {
        let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('canvas-container');
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(3, 8),
            speedX: p.random(-0.5, 0.5),
            speedY: p.random(-0.5, 0.5),
            opacity: p.random(50, 150)
          });
        }
      };
      
      p.draw = function() {
        p.clear();
        
        particles.forEach(particle => {
          p.noStroke();
          p.fill(255, 255, 255, particle.opacity);
          p.ellipse(particle.x, particle.y, particle.size);
          
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;
        });
      };
      
      p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    });
    
    // About section animation
    new p5(function(p) {
      let points = [];
      const pointCount = 20;
      
      p.setup = function() {
        let canvas = p.createCanvas(400, 400);
        canvas.parent('about-canvas');
        
        for (let i = 0; i < pointCount; i++) {
          points.push({
            x: p.random(p.width),
            y: p.random(p.height),
            size: p.random(2, 6),
            angle: p.random(p.TWO_PI),
            speed: p.random(0.01, 0.03)
          });
        }
      };
      
      p.draw = function() {
        p.clear();
        
        points.forEach((point, i) => {
          p.noStroke();
          p.fill(255, 255, 255, 150);
          p.ellipse(point.x, point.y, point.size);
          
          for (let j = i + 1; j < points.length; j++) {
            let other = points[j];
            let d = p.dist(point.x, point.y, other.x, other.y);
            
            if (d < 100) {
              p.stroke(255, 255, 255, p.map(d, 0, 100, 100, 0));
              p.line(point.x, point.y, other.x, other.y);
            }
          }
          
          point.x += Math.cos(point.angle) * point.speed;
          point.y += Math.sin(point.angle) * point.speed;
          
          if (point.x < 0 || point.x > p.width) point.angle = Math.PI - point.angle;
          if (point.y < 0 || point.y > p.height) point.angle = -point.angle;
        });
      };
      
      p.windowResized = function() {
        p.resizeCanvas(400, 400);
      };
    });
  });