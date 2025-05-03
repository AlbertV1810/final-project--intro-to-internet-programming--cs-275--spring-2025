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
