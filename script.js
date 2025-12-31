document.addEventListener('DOMContentLoaded', function () {

  /* 🌐 Smooth Scroll Navigation */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior:'smooth' });
    });
  });

  /* 📄 Resume Download Button */
  const resumeBtn = document.querySelector('.btn-primary[href$=".pdf"]');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      window.open("VedantMishra_Resume.pdf", "_blank");
    });
  }

  /* 📬 Contact Form */
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!name || !email || !message)
      return showPopup("⚠️ Please fill all fields!");

    if (!emailRegex.test(email))
      return showPopup("❌ Invalid Email!");

    form.reset();
    showPopup("🎉 Message Sent Successfully!");
  });

  /* 🔔 Popup Alerts */
  function showPopup(text) {
    const pop = document.createElement("div");
    pop.className = "popup-msg";
    pop.innerText = text;
    document.body.appendChild(pop);
    setTimeout(() => pop.classList.add("fade"), 1000);
    setTimeout(() => pop.remove(), 2000);
  }

  /* 👀 Section Reveal Animation */
  const reveals = document.querySelectorAll('.animate-on-scroll');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  },{threshold:.18});
  reveals.forEach(el=>io.observe(el));

  /* 📝 Canvas Typing Animation */
  const canvas = document.getElementById('myCanvas');
  if(canvas?.getContext){
    const ctx=canvas.getContext("2d");
    let w,h,t=0;
    const text="Passionate about AI, ML and solving real-world problems with technology.";
    let i=0,sub="";

    const resize=()=>{
      w=canvas.width=canvas.parentNode.offsetWidth-30;
      h=canvas.height=130;
    };
    resize(); window.addEventListener("resize",resize);

    const draw = ()=>{
      ctx.clearRect(0,0,w,h);
      ctx.fillStyle="#ffffff";
      ctx.fillRect(0,0,w,h);
      ctx.fillStyle="#0f1724";
      ctx.textAlign="center";
      ctx.font="600 17px Inter";
      const cursor=(Math.floor(t*6)%2)?"|":"";
      ctx.fillText(sub+cursor,w/2,h/2+5);
      t+=0.03;
      requestAnimationFrame(draw);
    };

    const type=async()=>{
      for(i=0;i<=text.length;i++){
        sub=text.substring(0,i);
        await new Promise(r=>setTimeout(r,45));
      }
    };

    new IntersectionObserver(e=>{
      if(e[0].isIntersecting){draw();type();}
    },{threshold:.5}).observe(canvas);
  }

});
