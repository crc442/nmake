function bufferComment(comment) {
	[ hash, ...rest ] = comment
	return rest.join('').trim() + '\n'
}

function getTarget([ ...line ]) {
	const pruneIndex = line.findIndex(v => v === ':')
	return pruneIndex > -1 ? line.slice(0, pruneIndex).join('') : null
}

function *Parser(inputString) {
	const lines = inputString.split('\n')
	for(let i = 0; i < lines.length; i++) {
		if (lines[i][0] === "#") {
			let comment = ''
			while(lines[i][0] === "#") {
				comment = comment + bufferComment(lines[i])
				i++
			}
			comment = comment.trim()
			let target = getTarget(lines[i])
			yield {
				comment,
				target
			}
		}
	}
}

module.exports = Parser