export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const cells = [...row.children];
  // cells[0] = image cell, cells[1] = content cell

  const imageCell = cells[0];
  const contentCell = cells[1];

  // Mark image cell
  imageCell.className = 'vp-image';

  // Mark content cell
  contentCell.className = 'vp-content';

  // Restructure content cell: h2 stays, then group icon+h3+p into items
  const children = [...contentCell.children];
  const h2 = contentCell.querySelector('h2');
  const items = [];
  let currentIcon = null;
  let currentTitle = null;
  let currentText = null;

  children.forEach((child) => {
    if (child === h2) return;

    // Check if it's an icon (p containing an img)
    const img = child.querySelector('img');
    if (child.tagName === 'P' && img && img.src.includes('icon')) {
      // Save previous item if exists
      if (currentTitle) {
        items.push({ icon: currentIcon, title: currentTitle, text: currentText });
      }
      currentIcon = img;
      currentTitle = null;
      currentText = null;
    } else if (child.tagName === 'H3') {
      currentTitle = child;
    } else if (child.tagName === 'P' && !child.querySelector('img')) {
      currentText = child;
    }
  });

  // Push last item
  if (currentTitle) {
    items.push({ icon: currentIcon, title: currentTitle, text: currentText });
  }

  // Clear content cell and rebuild
  contentCell.innerHTML = '';
  contentCell.appendChild(h2);

  items.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'vp-item';

    const iconDiv = document.createElement('div');
    iconDiv.className = 'vp-item-icon';
    if (item.icon) {
      iconDiv.appendChild(item.icon);
    }

    const textDiv = document.createElement('div');
    textDiv.className = 'vp-item-text';
    if (item.title) textDiv.appendChild(item.title);
    if (item.text) textDiv.appendChild(item.text);

    itemDiv.appendChild(iconDiv);
    itemDiv.appendChild(textDiv);
    contentCell.appendChild(itemDiv);
  });
}
