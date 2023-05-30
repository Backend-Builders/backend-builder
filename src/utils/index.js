function loading(stream, animation, delay) {
  const frames = {
    line: ['-', '\\', '|', '/'],
    monkey: ['🙈 ', '🙉 ', '🙊 '],
  };

  stream.pause(); // Prevents user input
  stream.output.write('\x1B[?25l'); // Removes the cursor
  let i = 0;

  return setInterval(() => {
    stream.output.write(`\r${frames[animation][i]}`);
    i = (i + 1) % frames[animation].length;
  }, delay);
}

export { loading };
