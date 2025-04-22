export const outputAllShort = (nodes: any[]) => {
  const comments = filterComments(nodes);
  if (!comments) return;
  process.stdout.write("\n");
  comments.forEach(({ target, comment }) => {
    const shortComment = firstLine(comment);
    process.stdout.write(`${target}		${shortComment} \n`);
  });
};

export const outputTargetLong = (nodes: any[], target: string) => {
  const targetNode = nodes.find((node) => node.target === target);
  if (!targetNode) return;
  process.stdout.write("\n");
  process.stdout.write(`${targetNode.comment} \n`);
};

const filterComments = (nodes: any[]) =>
  nodes.filter((node) => node.target !== null);

const firstLine = (line: string) => line.split("\n")[0];
