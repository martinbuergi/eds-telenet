export default async function decorate(block) {
  const rows = [...block.children];
  const variants = ['promo-yellow', 'promo-dark', 'promo-image'];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    // Cell 0 = badge text, Cell 1 = image, Cell 2 = text/CTA

    // Apply variant class
    if (variants[i]) {
      row.classList.add(variants[i]);
    }

    // Style the badge cell
    const badgeCell = cells[0];
    if (badgeCell) {
      const badgeText = badgeCell.textContent.trim();
      if (badgeText) {
        const span = document.createElement('span');
        span.className = 'badge';
        span.textContent = badgeText;
        badgeCell.textContent = '';
        badgeCell.appendChild(span);
      }
    }
  });
}
