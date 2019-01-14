const minimist = require('minimist');

module.exports = () => {
	const args = minimist(process.argv.slice(2));
	const folder = args._[0] || 'empty';

	console.log('Welcome to add-clicktag');

	try {
		switch(folder) {
			case 'empty':
				throw new Error('Folder path needs to be provided')
				break;
			default:
				require('./cmds/add-clicktag')(folder);
		}
	} catch(err) {
		console.log(err);
	}

}
