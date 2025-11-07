document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const resumeBtn = document.getElementById('downloadResume');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      alert('Resume download placeholder — attach your resume file and update the link (index.html).');
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      alert('Thank you! Your message has been sent (demo).');
      form.reset();
    });
  }

  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
          }
      });
  };

  const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

  animateElements.forEach(element => {
      scrollObserver.observe(element);
  });

  const canvas = document.getElementById('myCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w = canvas.width, h = canvas.height;
    let t = 0;

    const textToType = "I'm a B.Tech CSE student focused on problem-solving and full-stack development. Let's build something great!";
    let charIndex = 0;
    let typingSpeed = 50;
    let currentText = '';
    let isTyping = false;
    let animationFrame;

    function resize() {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = Math.max(320, rect.width - 40);
      canvas.height = 120;
      w = canvas.width; h = canvas.height;
    }
    resize();
    window.addEventListener('resize', resize);


    function typeWriter() {
      if (charIndex <= textToType.length) {
        currentText = textToType.substring(0, charIndex);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        isTyping = false;
      }
    }

    function draw() {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);

      const g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      g.addColorStop(1, 'rgba(240, 251, 255, 0.7)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const barW = Math.max(120, w * 0.3);
      const x = (Math.sin(t) + 1) / 2 * (w - barW);
      ctx.fillStyle = 'rgba(0, 119, 181, 0.1)';
      ctx.fillRect(x, h / 2 - 8, barW, 16);

      ctx.fillStyle = '#0f1724';
      ctx.font = '700 16px Inter, Arial';
      ctx.textAlign = 'center';

      const cursor = (isTyping && Math.floor(t * 10) % 2) ? '|' : '';

      let displayLine1 = currentText;
      let displayLine2 = '';
      const breakPoint = Math.floor(currentText.length / 2.5);
      const spaceIndex = currentText.lastIndexOf(' ', breakPoint);

      if (spaceIndex > 0) {
        displayLine1 = currentText.substring(0, spaceIndex);
        displayLine2 = currentText.substring(spaceIndex + 1);
      }

      ctx.fillText(displayLine1 + (displayLine2 ? '' : cursor), w / 2, h / 2 - 12);

      if (displayLine2) {
        ctx.fillText(displayLine2 + cursor, w / 2, h / 2 + 18);
      }

      for (let i = 0; i < 6; i++) {
        const rx = (Math.sin(t * (0.3 + i * 0.07) + i) + 1) / 2 * w;
        const ry = h / 2 + Math.cos(t * (0.4 + i * 0.05)) * 26;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,188,212,0.12)';
        ctx.arc(rx, ry, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    }

    const canvasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping && charIndex === 0) {
                isTyping = true;
                draw();
                typeWriter();
                canvasObserver.unobserve(canvas);
            }
        });
    }, { threshold: 0.5 });

    canvasObserver.observe(canvas);

    if (window.scrollY === 0 && canvas.getBoundingClientRect().top < window.innerHeight) {
        isTyping = true;
        draw();
        typeWriter();
        canvasObserver.unobserve(canvas);
    }
  }
});

