export default async function decorate(block) {
  // Each row is a card with image + text cells
  // Structure is already correct from .plain.html
  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('cta-banner-card');
  });
}
