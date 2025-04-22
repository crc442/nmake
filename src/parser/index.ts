type Line = string[];

const bufferComment = (line: Line): string => `${line.slice(1).join('').trim()}\n`;

const getTarget = (line: Line): string | null => {
  const pruneIndex = line.findIndex((v) => v === ':');
  return pruneIndex > -1 ? line.slice(0, pruneIndex).join('') : null;
};

function* Parser(
  inputString: string
): IterableIterator<{ comment: string; target: string | null }> {
  const lines = inputString.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][0] === '#') {
      let comment = '';
      while (lines[i][0] === '#') {
        comment += bufferComment(lines[i].split(''));
        i++;
      }
      comment = comment.trim();
      const target = getTarget(lines[i].split(''));
      yield {
        comment,
        target,
      };
    }
  }
}

export default Parser;
