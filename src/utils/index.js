function loading(stream, animation, delay) {
  const frames = {
    line: ['-', '\\', '|', '/'],
    monkey: ['🙈 ', '🙉 ', '🙊 '],
  };

  let i = 0;
  
  return setInterval(() => {
    stream.output.write(`${frames[animation][i]}\r`);
    i = (i + 1) % frames[animation].length;
  }, delay);
}

export { loading };
