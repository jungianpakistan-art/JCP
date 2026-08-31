const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const gate = document.getElementById('analyst-gate-form');
  if (gate) {
    gate.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!gate.reportValidity()) return;
      const data = {
        name: document.getElementById('gate-name').value.trim(),
        email: document.getElementById('gate-email').value.trim(),
        country: document.getElementById('gate-country').value.trim(),
        affiliation: document.getElementById('gate-affiliation-type').value,
        institute: document.getElementById('gate-institute').value.trim(),
        credential: document.getElementById('gate-credential').value.trim()
      };
      sessionStorage.setItem('jcpAnalystGate', JSON.stringify(data));
      window.location.href = 'analyst-proposals.html';
    });
  }

  const proposal = document.getElementById('analyst-proposal-form');
  if (proposal) {
    const raw = sessionStorage.getItem('jcpAnalystGate');
    if (!raw) {
      window.location.replace('for-analysts.html');
      return;
    }
    try {
      const data = JSON.parse(raw);
      document.getElementById('proposal-name').value = data.name || '';
      document.getElementById('proposal-email').value = data.email || '';
      document.getElementById('proposal-country').value = data.country || '';
      document.getElementById('proposal-affiliation').value = data.affiliation || '';
      document.getElementById('proposal-institute').value = data.institute || '';
      document.getElementById('proposal-credential').value = data.credential || '';
    } catch (e) {
      window.location.replace('for-analysts.html');
      return;
    }
    const prices = document.getElementById('digital-price-fields');
    const radios = [...proposal.querySelectorAll('input[name="I would like to"]')];
    const sync = () => {
      const selected = radios.find(r => r.checked);
      prices.hidden = !selected || selected.value !== 'Make existing digital work available through JCP';
    };
    radios.forEach(r => r.addEventListener('change', sync));
    sync();
  }
});
