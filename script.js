document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Smooth Scroll Nav ---------- */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Resume Download Button ---------- */
  const resumeBtn = document.querySelector('.btn-primary[href*="Resume"]');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      window.location.href = "VedantMishra_Resume.pdf";
    });
  }

  /* ---------- Contact Form Validation ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      if (!name || !email || !message) {
        showPopup("⚠️ Please fill all the fields!");
        return;
      }
      if (!emailRegex.test(email)) {
        showPopup("❌ Invalid Email Address!");
        return;
      }

      form.reset();
      showPopup("🎉 Message Sent Successfully!");
    });
  }

  function showPopup(msg) {
    const div = document.createElement("div");
    div.className = "popup-msg";
    div.innerText = msg;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2500);
  }

  /* ---------- Scroll Animation ---------- */
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));

  /* ---------- Canvas Typing Animation ---------- */
  const canvas = document.getElementById('myCanvas');
  if (canvas && canvas.getContext) {

    const ctx = canvas.getContext('2d');
    let w = canvas.width, h = canvas.height;
    let t = 0;

    const text = "Passionate about AI, ML and building tech for real-world use cases.";
    let index = 0;
    let currentText = "";
    let typing = false;

    function resizeCanvas() {
      const rect = canvas.parentNode.getBoundingClientRect();
      canvas.width = Math.max(300, rect.width - 40);
      canvas.height = 130;
      w = canvas.width; h = canvas.height;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function drawCanvas() {
      ctx.clearRect(0, 0, w, h);
      t += 0.02;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#0f1724';
      ctx.font = '700 16px Inter, sans-serif';
      ctx.textAlign = 'center';

      const cursor = (typing && Math.floor(t * 10) % 2) ? '|' : '';
      ctx.fillText(currentText + cursor, w / 2, h / 2);

      requestAnimationFrame(drawCanvas);
    }

    async function typeText() {
      typing = true;
      for (let i = 0; i <= text.length; i++) {
        currentText = text.substring(0, i);
        await new Promise(res => setTimeout(res, 45));
      }
      typing = false;
    }

    const canvasObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && index === 0) {
          drawCanvas();
          typeText();
          index = 1;
        }
      });
    }, { threshold: 0.5 });

    canvasObserver.observe(canvas);
  }

});
