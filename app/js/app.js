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
        let topRow = document.createElement(`div`);
        topRow.classList.add(`diamond-row`);
        topRow.textContent = `${` `.repeat(size - 1)}*`;
        diamondWrapper.appendChild(topRow);

        for (let spaceChars = 1; spaceChars < size; spaceChars += 2) {
            let row = document.createElement(`div`);
            row.classList.add(`diamond-row`);

            let spaces = size - 1 - spaceChars;
            let stars = spaceChars + 1;

            row.textContent = `${` `.repeat(spaces)}${`* `.repeat(stars).trim()}`;
            diamondWrapper.appendChild(row);
        }

        for (let spaceChars = size - 2; spaceChars > 0; spaceChars -= 2) {
            let row = document.createElement(`div`);
            row.classList.add(`diamond-row`);

            let spaces = size - spaceChars;
            let stars = spaceChars;

            row.textContent = `${` `.repeat(spaces)}${`* `.repeat(stars).trim()}`;
            diamondWrapper.appendChild(row);
        }

        let bottomRow = document.createElement(`div`);
        bottomRow.classList.add(`diamond-row`);
        bottomRow.textContent = `${` `.repeat(size - 1)}*`;
        diamondWrapper.appendChild(bottomRow);
    }


    if (!isEven) {
        for(let i = 0; i < size; i++) {
            const row = document.createElement(`div`);
            row.classList.add(`diamond-row`);

            let spaces = Math.abs(Math.floor(size / 2) - i);
            let stars = size - spaces * 2;
            row.textContent = `${` `.repeat(spaces)}${`*`.repeat(stars)}`;
            diamondWrapper.appendChild(row);
        }
    }

    container.appendChild(diamondWrapper);
    console.log(`Wrapper apended well`); //delete after
  }

  const diamond = document.querySelector(`.diamond-wrapper`);
  let direction = 1;
  let position = 0;
  const speed = 2;

  const moveDiamond = () => {
    const maxWidth = window.innerWidth - diamond.offsetWidth;

    position += speed * direction;

    if (position >= maxWidth || position <= 0) {
        direction *= -1;
    }

    diamond.style.transform = `translateX(${position}px)`;
  };

  setInterval(moveDiamond, 10);
