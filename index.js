const minimist = require('minimist');

module.exports = () => {
	const args = minimist(process.argv.slice(2));
	const folder = args._[0] || 'empty';

	console.log('Welcome to add-clicktag');

	switch(folder) {
		case 'empty':
		  console.log('Folder path needs to be provided');
			break;
		default:
			require('./cmds/add-clicktag')(folder);
	}
}
