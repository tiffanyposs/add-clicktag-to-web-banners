const fs = require('fs');
const cheerio = require('cheerio');
const pretty = require('pretty');

/**
 * Meta tag and script tag html to add for clicktag
 * @name clicktagPartOne
 * @type {Function}
 * @param width width of example banner
 * @param height height of example banner
 * @return {Array}
*/
const clicktagPartOne = (width, height) => {
	const meta = `<meta name="ad.size" content="width=${width},height=${height}">`;
	const script = `<script type="text/javascript">var clickTag = ""</script>`;
	return [meta, script];
}

/**
 * Anchor tag html to add for clicktag
 * @name clicktagPartTwo
 * @type {Function}
 * @return {String}
*/
const clicktagPartTwo = () => {
	return `<a href="javascript:window.open(window.clickTag)"></a>`;
}

module.exports = path => {

	const htmlFileContents = fs.readFileSync(path);

	// read the size of the canvas
	const $ = cheerio.load(htmlFileContents);
	const $canvas = $('canvas');
	if (!$canvas.length) throw new Error(`<canvas> element required.\nFile: ${path}`)
	const width = $canvas.attr('width');
	const height = $canvas.attr('height');

	if (!width || !height) throw new Error(`Canvas element must have a height and a width attribute.\nFile: ${path}`);

	// get the clicktag html and add it to the temp html file
	const clicktagOne = clicktagPartOne(width, height);
	const clicktagTwo = clicktagPartTwo();

	const $title = $('title')
	if(!$title.length) throw new Error(`HTML file must have a <title> tag.\nFile: ${path}`)
	$title.after(clicktagOne[1]);
	$title.after(clicktagOne[0]);
	$canvas.wrap(clicktagTwo);

	return pretty($.html());

}
