---
title: "Github Pages - josh-vs.github.io"
date: 2025-03-25
author: "Josh"
---

## Table of contents:

	- [Introduction](#intro)
	- [File structure](#file-structure)
	- [Eleventy](#eleventy)
	- [Nunjucks](#nunjucks)
	- [Tailwind & Postcss](#tailwind-post-css)
	- [Gallery](#gallery)
	- [Remark42?](#remark)
	- [GitHub Pages](#gh-pages)

<br id="intro"></br>
## Introduction

<br> The site you're currently viewing is made using [Elventy](https://www.11ty.dev/), a simple, open source static site generator available through node.js.

<br> It's published using Github Pages. You can view the repository with the site's source code [here](https://github.com/josh-vs/josh-vs.github.io).

<br> After installing Eleventy into my site folder, I set up the .eleventy.js file:

<br> - [ ] tailwind and postcss

<br> ![](/assets/img/dvssite/eleventyjs.png)

<br id="file-structure"></br>

## File structure

<br> And this is what the directories look like:

<br> ![](/assets/img/dvssite/directories.png)

<br id="eleventy"><br>

## Eleventy

<br> The first in the chain for the site are the templates in the _includes folder. Base.liquid is the base template for all other templates and for the index.html file.

<br> ![](/assets/img/dvssite/baseliquid.png)

<br> We then have more templates that are used. The art.liquid file is the template for individual .md files in the art folder.

<br> ![](/assets/img/dvssite/artliquid.png)

<br> Then within the art folder we reference this template with art.json.

<br> ![](/assets/img/dvssite/artjson.png)

<br> Now any .md file placed into the art folder will be under the "art" tag and have the art.liquid layout.

<br> We also have a a layout for the library:

<br> ![](/assets/img/dvssite/libliquid.png)



## Nunjucks

- [ ] add nunjucks config

<br> Using liquid we can format the document to automatically input the title, date and author which is at the top of the .md file.

<br> ![](/assets/img/dvssite/artmd.png)

<br> Then comes the homepage, index.html. This also uses liquid formatting to automatically display the art from the art folder, articles from the library folder...

<br> ![](/assets/img/dvssite/indexhtml.png)

<br> Now any new .md files added to the folders are automatically added to the homepage, as well as a seperate page for them with the template described in their folder. This makes updating the site intuitive and simple.

<br> This is then built into the build folder when running npm start.

<br id="tailwind-post-css"></br>

## TailwindCSS & PostCSS


<br id="gallery"></br>

## Gallery

<br id="remark"></br>

## Remark42 comment system?



<br id="gh-pages"></br>

## GitHub Pages

<br> Lastly I upload this to Github Pages, which uses Github Actions to build. This is configured in /.github/workflows/build.yml.

<br> ![](/assets/img/dvssite/buildyml.png)

<br> This pushes the origin to main, then it uses node to build the site to the gh-pages branch, with ./build as the published directory which is seen when viewing danielvonstolzenberg.github.io. It uses a secret deploy token provided by github.

<br> Then after authenticating github via an SSH key, I can push using Github Desktop or the VSCode Github extension.

<br> This is then built and deployed on Github Actions.

<br> ![](/assets/img/dvssite/buildeleventy.png)

<br> ![](/assets/img/dvssite/deploy.png)
