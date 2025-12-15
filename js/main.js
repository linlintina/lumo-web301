/* main.js
  Reference
  - w3schools (querySelector / DOM): https://www.w3schools.com/jsref/met_document_queryselector.asp
*/

/* Set footer year
   Reference (w3schools - Date getFullYear):
   https://www.w3schools.com/jsref/jsref_getfullyear.asp
*/
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* Mobile nav toggle (classList.toggle + aria-expanded)
   Reference (w3schools - Toggle a Class):
   https://www.w3schools.com/howto/howto_js_toggle_class.asp
*/
const navButton = document.querySelector('.navPill');
const navMenu = document.getElementById('site-nav');

if (navButton && navMenu) {
  navButton.addEventListener('click', () => {
    const expanded = navButton.getAttribute('aria-expanded') === 'true';
    navButton.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('isOpen');
  });
}

/* FAQ accordion
   Reference (w3schools - forEach on arrays / lists):
   https://www.w3schools.com/jsref/jsref_foreach.asp
*/
const faqButtons = document.querySelectorAll('[data-faq-button]');
faqButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faqItem');
    if (!item) return;
    item.classList.toggle('open');
  });
});

/* Carousel */
(() => {
  const track = document.querySelector('.carouselTrack');
  const prevBtn = document.querySelector('.carouselBtnPrev');
  const nextBtn = document.querySelector('.carouselBtnNext');

  if (!track || !prevBtn || !nextBtn) return;

  let index = 0;

  /* Collect slides and Update transform based on slide width
     Reference (w3schools - Array.from and getBoundingClientRect):
     https://www.w3schools.com/jsref/jsref_from.asp
     https://www.w3schools.com/jsref/met_element_getboundingclientrect.asp
  */
  const slides = () => Array.from(track.querySelectorAll('.carouselSlide'));

  const update = () => {
    const all = slides();
    if (all.length === 0) return;

    // clamp
    if (index < 0) index = 0;
    if (index > all.length - 1) index = all.length - 1;

    // slide width + gap (approx)
    const slideW = all[0].getBoundingClientRect().width;
    const gap = 10;
    track.style.transform = `translateX(${-index * (slideW + gap)}px)`;
  };

  window.addEventListener('resize', update);

  prevBtn.addEventListener('click', () => { index -= 1; update(); });
  nextBtn.addEventListener('click', () => { index += 1; update(); });

  update();
})();

/* Contact form */
const form = document.querySelector('[data-contact-form]');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = form.querySelector('#email');
    const msg = form.querySelector('#message');
    const error = form.querySelector('[data-form-error]');
    if (!email || !msg || !error) return;

    error.textContent = '';

    // very basic checks
    if (email.value.trim().length < 5 || !email.value.includes('@')) {
      error.textContent = 'Please enter a valid email address.';
      email.focus();
      return;
    }
    if (msg.value.trim().length < 10) {
      error.textContent = 'Please write a longer message (10+ characters).';
      msg.focus();
      return;
    }

    // Fake success state
    error.textContent = 'Submitted (demo). Thank you — I will respond soon.';
  });
}
