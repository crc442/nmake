exports.outputAllShort = function (nodes) {
  const comments = filterComments(nodes);
  if (!comments) {
    return;
  }
  process.stdout.write("\n");
  comments.forEach((c) => {
    let shortComment = firstLine(c.comment);
    process.stdout.write(`${c.target}		`);
    process.stdout.write(`${shortComment} \n`);
  });
};

exports.outputTargetLong = function (nodes, target) {
  const targetNode = nodes.filter((node) => node.target === target);
  if (!targetNode.length) {
    return;
  }
  process.stdout.write("\n");
  process.stdout.write(`${targetNode[0].comment} \n`);
};

const filterComments = (nodes) => nodes.filter((node) => node.target !== null);

const firstLine = (line) => line.split("\n")[0];
