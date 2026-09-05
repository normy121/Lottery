const controls = {
  pet: document.querySelector('#pet-status'),
  figurine: document.querySelector('#figurine'),
  hacks: document.querySelector('#hacks'),
  virgo: document.querySelector('#virgo')
};

const grid = document.querySelector('#odds-grid');
const oneTicket = document.querySelector('#single-chance');
const summary = document.querySelector('#bonus-summary');

function updateToggleLabels() {
  document.querySelectorAll('.toggle').forEach((toggle) => {
    toggle.querySelector('b').textContent = toggle.querySelector('input').checked ? 'ON' : 'OFF';
  });
}

function getOdds() {
  const bonuses = [];
  const petBonus = Number(controls.pet.value);
  const hacks = Number(controls.hacks.value);
  if (petBonus) bonuses.push(`Pet Cat +${petBonus.toFixed(1)}%`);
  if (controls.figurine.checked) bonuses.push('Figurine +3.0%');
  if (hacks) bonuses.push(`${hacks} Mart hack${hacks > 1 ? 's' : ''} +${hacks.toFixed(1)}%`);
  if (controls.virgo.checked) bonuses.push('Virgo +9.0%');
  const chance = 3 + petBonus + (controls.figurine.checked ? 3 : 0) + hacks + (controls.virgo.checked ? 9 : 0);
  return { chance, bonuses };
}

function render() {
  updateToggleLabels();
  const { chance, bonuses } = getOdds();
  oneTicket.textContent = `${chance.toFixed(2)}%`;
  summary.textContent = bonuses.length ? `Applied: ${bonuses.join(' · ')}` : 'Base chance only';
  const decimalChance = chance / 100;
  grid.innerHTML = Array.from({ length: 35 }, (_, index) => {
    const tickets = index + 1;
    const total = (1 - Math.pow(1 - decimalChance, tickets)) * 100;
    return `<div class="odds-cell" style="--chance:${total}%"><span class="ticket-count"><b>${tickets}</b> ticket${tickets === 1 ? '' : 's'}</span><span class="chance">${total.toFixed(2)}%</span></div>`;
  }).join('');
}

Object.values(controls).forEach((input) => input.addEventListener('change', render));
document.querySelector('#calculate').addEventListener('click', () => {
  render();
  document.querySelector('.results-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
render();
