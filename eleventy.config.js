import tailwindcss from 'tailwindcss';
import postcss from 'postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import markdownIt from 'markdown-it';
import markdownItClass from '@toycode/markdown-it-class';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginSEO from 'eleventy-plugin-seo';
import seo from './src/seo.json' with { type: 'json'};
import { DateTime } from 'luxon';

const postcssFilter = async (cssCode, done) => {
  try {
    const result = await postcss([
      tailwindcss('./tailwind.config.js'),
      autoprefixer(),
      cssnano({ preset: "default" }),
    ]).process(cssCode, { from: "./assets/tailwind.css" });

    done(null, result.css);
  } catch (err) {
    done(err, null);
  }
};

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginSEO, seo);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("assets/js");
  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });
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
    const dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('LLLL yyyy');
  });
  eleventyConfig.addNunjucksFilter("fulldate", (dateString) => {
    const dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('d LLLL yyyy');
  });
  eleventyConfig.addNunjucksFilter("getLatest", function (collection) {
    return collection.sort((a, b) => b.date - a.date)[1];
  });
  const mdOptions = {
    html: true, // Allow HTML in Markdown
    breaks: true, // Turn line breaks into <br>
    linkify: true, // Autoconvert URLs to links
  };
  eleventyConfig.setLibrary("md", markdownIt(mdOptions));
  eleventyConfig.addWatchTarget("./assets/tailwind.css");
  eleventyConfig.addNunjucksAsyncFilter("postcss", postcssFilter);
  eleventyConfig.addCollection("posts", addCollection("posts"));
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