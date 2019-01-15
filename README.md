# Add Clicktag

This CLI adds clicktags to html web banners.

In the head:

```
<meta name="ad.size" content="width={CUSTOM_WIDTH},height={CUSTOM_HEIGHT}">
<script type="text/javascript">var clickTag = ""</script>
```

Wrapping the `<canvas>` :

```
<a href="javascript:window.open(window.clickTag)"></a>

```


### Installing the CLI

Run from file root directory fun the below commands to install the CLI

```
$ chmod +x bin/outside

```

```
$ npm links

```

### Using the CLI

Pass the directory name your would like to process, the CLI will clone the directory and attempt to add the clicktag code to *all* files ending in `.html`. If a clicktag already exists, it will remove it and replace it with updated.

```
project
│   README.md   
│
└───banner
    │   index.html
    │   index.js
    │
    └───images
        │   image1.jpg
        │   image2.jpg
        │   ...

```

If you are in the project folder, and you run the below command, it will process the `index.html` file.

```
$ add-clicktag banner
```

If you want to add a custom clicktag url you can pass it as the second argument

```
$ add-clicktag banner http://www.somewebsite.com/
```
