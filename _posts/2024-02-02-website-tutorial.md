---
layout: post
title: "How I made this website"
category: blog
---
___
# Table of Contents
- [Tooling](#tooling)
   * [Jekyll](#jekyll)
      + [Theme](#theme)
   * [GitHub Pages](#github-pages)
- [Creation](#creation)
   * [Step 1: Fork theme](#step-1-fork-theme)
   * [Step 2: Customize Theme](#step-2-customize-theme)
      + [Change _config.yml](#change-_configyml)
      + [Change menu](#change-menu)
      + [Add pages and posts](#add-pages-and-posts)

___

# Tooling
The tools and frameworks used are an important part of developing any site. This is what I did.

## Jekyll
Since I wanted to easily build a coherent static site that I could edit without much hassle, I chose to use Jekyll. Jekyll, a static site generator, allows anyone to "transform [their] plain text into static websites and blogs."[^1] Jekyll works the best with blogs and personal websites, so this is a good use case for it.
### Theme
After browsing options, I decided to pick "no-style-please," a fast and minimal theme. This theme includes light, dark, and auto modes, an RSS feed, SEO optimization, very little CSS, and excellent performance. It was developed by [Riccardo Graziosi](https://riggraz.dev) and is used on his own personal website. 

## GitHub Pages
GitHub offers their own hosting solution, named GitHub Pages. This allows easy and free hosting using a popular platform. Since I'm a student, I also get other free benefits from GitHub using using their [GitHub Student Developer Pack,](https://education.github.com/pack) including more features on their platform in addition free JetBrains products. 
___
# Creation
After picking the theme and tools to create the website, I used them in development. There are different ways, to do this, but the method I chose allowed me to do it all on the web without touching any local files. I mostly used github.dev for this (to use it, edit a file in your repository and press the period (.) key. 
## Step 1: Fork theme

Fork the theme to your own account. Note that if you call this new repository your username, its `README` will show up on your GitHub profile. 

## Step 2: Customize Theme
There are a multitude of customizations available to you once you fork your theme. 
### Change _config.yml
The first step is to change the `_config.yml` file in the root directory to your ideal settings. You should change the `title`, `author`, `url`, `baseurl`, `favicon`, and `description`. You can also change other options, but there aren't many. 
### Change menu
The next step I did was change the menu (home page). This can be done by navigating to `_data` and opening `menu.yml`. The layout is fairly obvious, so just change the examples. More details can be found in the `README` of your theme. 
### Add pages and posts
You can easily add posts (to the `_posts` folder in Markdown.) Once you add your posts, the website is complete. 

___
{: data-content="footnotes"}

[^1]: [Jekyll](https://jekyllrb.com)
