document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      section.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    showPopup("✔ Message Sent Successfully!");
    form.reset();
  });

  function showPopup(text){
    const div=document.createElement("div");
    div.className="popup-msg";
    div.textContent=text;
    document.body.appendChild(div);
    setTimeout(()=>div.remove(),2500);
  }

  const reveal=document.querySelectorAll('.animate-on-scroll');
  const obs=new IntersectionObserver((e,o)=>{
    e.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('is-visible');
        o.unobserve(en.target);
      }
    });
  },{threshold:.15});
  reveal.forEach(el=>obs.observe(el));

  const canvas=document.getElementById('myCanvas');
  if(canvas){
    const ctx=canvas.getContext('2d');
    function resize(){
      canvas.width=canvas.parentNode.offsetWidth-40;
      canvas.height=130;
    }
    resize();
    window.addEventListener("resize",resize);
    let text="Passionate about AI and real-world tech solutions.";
    let i=0;
    function type(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.font='17px Inter';
      ctx.textAlign='center';
      ctx.fillStyle='#0f1724';
      ctx.fillText(text.substring(0,i)+"|",canvas.width/2,canvas.height/2);
      if(i<text.length){i++;setTimeout(type,55);}
    }
    type();
  }
});
