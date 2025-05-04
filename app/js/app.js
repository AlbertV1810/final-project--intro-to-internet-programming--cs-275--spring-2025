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
    console.log(`createDiamond is running with size: ${size}`); //delete after

    const container = document.getElementById(`diamond-container`);
    container.innerHTML = ``;
    const isEven = size % 2 === 0;

    const diamondWrapper = document.createElement(`div`);
    diamondWrapper.classList.add(`diamond-wrapper`);

    if (isEven) {
        for (let i = 0; i < size; i++) {
            const row = document.createElement(`div`);
            row.classList.add(`diamond-row`);

            let spaces = Math.abs(size / 2 - i);
            let stars = 2 * Math.abs(size / 2 - i) + 1;

            if (i === 0 || i === size - 1) {
                stars = 1;
            }

            row.textContent = `${" ".repeat(spaces)}${"*".repeat(stars)}`;
            diamondWrapper.appendChild(row);
        }

    }

    if (!isEven) {
        for(let i = 0; i < size; i++) {
            const row = document.createElement(`div`);
            row.classList.add(`diamond-row`);

            let spaces = Math.abs(Math.floor(size / 2) - i);
            let stars = size - spaces * 2;
            row.textContent = `${` `.repeat(spaces + 1)}${`*`.repeat(stars)}`;
            diamondWrapper.appendChild(row);
        }
    }

    container.appendChild(diamondWrapper);
    console.log(`Wrapper apended well`); //delete after
  }
