document.addEventListener(`DOMContentLoaded`, () => {
    let size;

    while (true) {
      const input = prompt(`Enter size of the diamond:`);

      if (input === null) break;
      size = parseInt(input, 10);

      if (!isNaN(size) && size > 0) break;
    }

    if (size) createDiamond(size);
  });

  const createDiamond = (size) => {
    const container = document.getElementById(`diamond-container`);
    container.innerHTML = ``;
    const diamondWrapper = document.createElement(`div`);
    diamondWrapper.classList.add(`diamond-wrapper`);

    for (let i = 0; i < size; i++) {
        const row = document.createElement(`div`);
        row.classList.add(`diamond-row`);

        const spaces = Math.abs(Math.floor(size / 2) - i);
        const stars = size - 2 * spaces;

        row.textContent = `${" ".repeat(spaces)}${"*".repeat(stars)}`;
        diamondWrapper.appendChild(row);
    }

    container.appendChild(diamondWrapper);
};
