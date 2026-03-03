const { DateTime } = require("luxon");
const pluginSEO = require("eleventy-plugin-seo");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItClass = require('@toycode/markdown-it-class');
const tailwind = require("tailwindcss");
const postCss = require("postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");


const postcssFilter = (cssCode, done) => {
  postCss([
    tailwind(require("./tailwind.config")),
    autoprefixer(),
    cssnano({ preset: "default" }),
  ])
    .process(cssCode, {
      from: "./assets/tailwind.css",
    })
    .then(
      (r) => done(null, r.css),
      (e) => done(e, null)
    );
};



module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "html",
    "njk",
    "md",
    "css",
    "jpeg",
    "jpg",
    "JPG",
    "png",
  ]);

  eleventyConfig.addNunjucksFilter("date", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLLL yyyy');
  });

  eleventyConfig.addNunjucksFilter("fulldate", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('d LLLL yyyy');
  });

  eleventyConfig.addNunjucksFilter("getLatest", function(collection) {
    return collection.sort((a, b) => b.date - a.date)[1];
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPassthroughCopy("assets/js");

  const seo = require("./src/seo.json");

  eleventyConfig.addPlugin(pluginSEO, seo);

  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });

  eleventyConfig.addCollection("posts", addCollection("posts"));

  // Configure Markdown-it
  const mdOptions = {
    html: true, // Allow HTML in Markdown
    breaks: true, // Turn line breaks into <br>
    linkify: true, // Autoconvert URLs to links
  };


  const md = markdownIt(mdOptions);

  // Set Markdown-it as Eleventy's Markdown processor
  eleventyConfig.setLibrary("md", md);

  // Tailwind & postcss config:
  eleventyConfig.addWatchTarget("./assets/tailwind.css");
  eleventyConfig.addNunjucksAsyncFilter("postcss", postcssFilter);

  function addCollection(collectionName) {
    return function (collection) {
      const coll = collection
        .getFilteredByTag(collectionName)
        .sort((a, b) => b.data.date - a.data.date);

      // From: https://github.com/11ty/eleventy/issues/529#issuecomment-568257426
      // Adds {{ prevPost.url }} {{ prevPost.data.title }}, etc, to our njks templates
      for (let i = 0; i < coll.length; i++) {
        const prevPost = coll[i - 1];
        const nextPost = coll[i + 1];

        coll[i].data["prevPost"] = prevPost;
        coll[i].data["nextPost"] = nextPost;
      }

      return coll;
    };
  };


  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      output: "build",
    },
  };
};