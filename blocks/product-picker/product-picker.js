export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    // If there are image + text cells, merge them into single card flow
    if (cells.length === 2) {
      const [imgCell, textCell] = cells;
      const pic = imgCell.querySelector('picture');
      if (pic) {
        imgCell.classList.add('card-image');
        textCell.classList.add('card-content');
      }
    }

    // Single cell card (card 1 with links)
    if (cells.length === 1) {
      cells[0].classList.add('card-content');
    }
  });
}
