export default async function decorate(block) {
  const rows = [...block.children];
  // First row is the header (overline + h2)
  // Last row is the CTA
  // Middle rows are device cards

  const headerRow = rows[0];
  const ctaRow = rows[rows.length - 1];
  const cardRows = rows.slice(1, rows.length - 1);

  // Create a grid container for the cards
  const grid = document.createElement('div');
  grid.className = 'devices-grid';

  cardRows.forEach((row, index) => {
    const cells = [...row.children];
    const imageCell = cells[0];
    const textCell = cells[1];

    // Create card element
    const card = document.createElement('div');
    card.className = 'device-card';

    // Mark the last card as featured (large)
    if (index === cardRows.length - 1) {
      card.classList.add('featured');
    }

    // Get picture
    const picture = imageCell.querySelector('picture');
    if (picture) {
      card.appendChild(picture);
    }

    // Parse text cell - contains product name (link), spec, price, old price
    if (textCell) {
      const paragraphs = [...textCell.querySelectorAll('p')];

      paragraphs.forEach((p) => {
        const link = p.querySelector('a');
        const strong = p.querySelector('strong');
        const em = p.querySelector('em');

        if (link && !strong && !em) {
          // Product name with link
          const nameDiv = document.createElement('div');
          nameDiv.className = 'device-name';
          nameDiv.appendChild(link);
          card.appendChild(nameDiv);
        } else if (strong) {
          // Price line - contains strong for price and possibly em for old price
          const priceDiv = document.createElement('div');
          priceDiv.className = 'device-price';
          priceDiv.textContent = strong.textContent;
          card.appendChild(priceDiv);

          if (em) {
            const oldPriceDiv = document.createElement('div');
            oldPriceDiv.className = 'device-old-price';
            oldPriceDiv.textContent = em.textContent;
            card.appendChild(oldPriceDiv);
          }
        } else if (!link && !strong && !em) {
          // Spec line
          const specDiv = document.createElement('div');
          specDiv.className = 'device-spec';
          specDiv.textContent = p.textContent;
          card.appendChild(specDiv);
        }
      });

      // Make entire card clickable
      const firstLink = textCell.querySelector('a');
      if (firstLink) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          window.location.href = firstLink.href;
        });
      }
    }

    grid.appendChild(card);
    row.remove();
  });

  // Insert grid after header
  headerRow.after(grid);
}
