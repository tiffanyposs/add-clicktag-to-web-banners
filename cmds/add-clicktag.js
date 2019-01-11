const fs = require('fs');
const fse = require('fs-extra');
const readdir = require('readdir-enhanced');

const addClicktag = require('../helpers/add-clicktag');


module.exports = folder => {

	// get current folder and new folder paths
	const folderPath = `./${folder}`;
	const newFolderPath = `${folderPath}-clicktag-${Math.floor(Math.random()*1000000)}`; // change to date/time

	// if somehow by chance the existing folder exists, delete it
	if(fs.existsSync(newFolderPath)) {
		fs.unlinkSync(newFolderPath);
	}

	// make the new folder with copied content
	fs.mkdirSync(newFolderPath);
	fse.copySync(folderPath, newFolderPath);

	// get all of the links within new folder and find just the .html ones
	const folders = readdir.sync(newFolderPath, { deep: true });
	const htmlPaths = folders
		.filter(path => path.includes('.html'))
		.map(path => `${newFolderPath}/${path}`);

	// get the updated code and save it
	for (let path of htmlPaths) {
		const htmlWithClicktag = addClicktag(path);
		fs.writeFileSync(path, htmlWithClicktag);
	}
}
