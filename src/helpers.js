import { createInterface } from 'readline';

function changeColor(string, color) {
  // Change text color using ANSI escape sequences
  // https://talyian.github.io/ansicolors/
  const codes = {
    gray: '90',
    yellow: '33',
  };

  const colorCode = `\x1b[${codes[color]}m`;
  const resetCode = '\x1b[0m';

  return `${colorCode}${string}${resetCode}`;
}

function createStream() {
  const stream = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  stream.on('close', () => {
    stream.output.write('\n');
    process.exit(0);
  });

  return stream;
}

function startLoading(stream, animation, delay) {
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

export { changeColor, createStream, startLoading };
