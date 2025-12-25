document.addEventListener('DOMContentLoaded', () => {

  // 1. Инициализация иконок Lucide
  lucide.createIcons();

  // 2. Плавный скролл Lenis
  const lenis = new Lenis();
  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 3. Мобильное меню
  const burger = document.getElementById('burger-menu');
  const nav = document.getElementById('nav-menu');

  if (burger) {
      burger.addEventListener('click', () => {
          nav.classList.toggle('active');
          burger.classList.toggle('active');
      });
  }

  // 4. GSAP & Анимации
  gsap.registerPlugin(ScrollTrigger);

  // HERO: Анимация слов (без разрывов)
  const heroTitle = new SplitType('#hero-title', { types: 'words' });
  gsap.from(heroTitle.words, {
      opacity: 0,
      y: 40,
      rotate: 2,
      duration: 1,
      stagger: 0.1,
      ease: "expo.out",
      delay: 0.3
  });

  // ПРЕИМУЩЕСТВА: Исправленная загрузка всех элементов
  const serviceCards = gsap.utils.toArray('.service-card');

  gsap.from(serviceCards, {
      scrollTrigger: {
          trigger: ".services",
          start: "top 80%",
      },
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      clearProps: "all" // Важно: убирает стили GSAP после завершения, чтобы работал Hover
  });

  // Hover-эффект через forEach (интерактивность)
  serviceCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
          serviceCards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
      });
  });

  // 5. Валидация формы и Капча
  const form = document.getElementById('contact-form');
  if (form) {
      let n1 = Math.floor(Math.random() * 10);
      let n2 = Math.floor(Math.random() * 10);
      const captchaQ = document.getElementById('captcha-question');
      if (captchaQ) captchaQ.textContent = `${n1} + ${n2} = `;

      form.addEventListener('submit', (e) => {
          e.preventDefault();
          const answer = document.getElementById('captcha-answer').value;
          const msg = document.getElementById('form-message');

          if (parseInt(answer) === (n1 + n2)) {
              msg.textContent = "Успешно! Мы свяжемся с вами.";
              msg.style.color = "#cfff04";
              form.reset();
          } else {
              msg.textContent = "Ошибка капчи!";
              msg.style.color = "#ff4d4d";
          }
      });
  }

  // 6. COOKIE POPUP Логика
  const cookieBox = document.getElementById('cookie-popup');
  const cookieBtn = document.getElementById('cookie-accept');

  if (cookieBox && !localStorage.getItem('cookies_accepted_yttrix')) {
      setTimeout(() => {
          cookieBox.classList.add('active');
      }, 2500);
  }

  if (cookieBtn) {
      cookieBtn.addEventListener('click', () => {
          localStorage.setItem('cookies_accepted_yttrix', 'true');
          cookieBox.classList.remove('active');
      });
  }
});