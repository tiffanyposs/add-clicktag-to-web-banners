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
	const width = $('canvas').attr('width');
	const height = $('canvas').attr('height');

	// get the clicktag html and add it to the temp html file
	const clicktagOne = clicktagPartOne(width, height);
	const clicktagTwo = clicktagPartTwo();

	$('title').after(clicktagOne[1]);
	$('title').after(clicktagOne[0]);
	$('canvas').wrap(clicktagTwo);

	return pretty($.html());

}
