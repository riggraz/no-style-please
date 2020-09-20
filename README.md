# no style, please!

<img src="https://raw.githubusercontent.com/riggraz/no-style-please/master/logo.png" width="64" align="left" />A (nearly) no-CSS, fast, minimalist [Jekyll](https://jekyllrb.com/) theme.
Inspired by [elly's site](http://tilde.town/~elly/), expressly created for [my personal blog](https://riggraz.dev/).

<h3 align="center"><a href="https://riggraz.dev/no-style-please/">Try the demo out!</a></h3>

<img src="https://raw.githubusercontent.com/riggraz/no-style-please/master/_screenshots/featured-image.png" />

## Features

* Fast (**< 1kb of CSS**, currently 955 bytes. For more information on performance and more, see [Page Speed Insights report](https://raw.githubusercontent.com/riggraz/no-style-please/master/_screenshots/page-speed-insights-report.png) and [Lighthouse report](https://raw.githubusercontent.com/riggraz/no-style-please/master/_screenshots/lighthouse-report.png))
* Light, dark and auto modes
* Responsive
* Content first (typography optimized for maximum readability)
* SEO optimized (uses [Jekyll SEO Tag](https://github.com/jekyll/jekyll-seo-tag))
* RSS feed (uses [Jekyll Feed](https://github.com/jekyll/jekyll-feed))
* Fully compatible with [GitHub Pages](https://pages.github.com/) (see [GitHub Pages installation](#github-pages-installation))

## Installation

If you haven't already created your blog using Jekyll, follow the [instructions](https://jekyllrb.com/docs/) to do so from Jekyll's documentation.

NOTE: if you are using Jekyll with GitHub Pages, see the [GitHub Pages installation section](#github-pages-installation).

Then, to style your blog with this theme, add this line to your Jekyll site's `Gemfile`:

```ruby
gem "no-style-please"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: no-style-please
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install no-style-please

### GitHub Pages installation

If you want to use this theme for your Jekyll's site deployed on [GitHub Pages](https://pages.github.com/), follow the instructions on [this page](https://docs.github.com/en/github/working-with-github-pages/adding-a-theme-to-your-github-pages-site-using-jekyll#adding-a-theme).

## Usage

You can edit `_config.yml` file to customize your blog. You can change things such as the name of the blog, the author, the appearance of the theme (light, dark or auto), how dates are formatted, etc. Customizable fields should be straightforward to understand. Still, `_config.yml` contains some comments to help you understand what each field does.

For further customization (e.g. layout, CSS) see the [official Jekyll's documentation](https://jekyllrb.com/docs/themes/#overriding-theme-defaults) on customizing gem-based themes.

### Customize the menu

In order to add/edit/delete entries from the main menu, you have to edit the `menu.yml` file inside `_data` folder. Through that file you can define the structure of the menu. Take a look at the default configuration to get an idea of how it works and read on for a more comprehensive explanation.

The `menu.yml` file accepts the following fields:

- `entries` define a new unordered list that will contain menu entries
- each entry is marked by a `-` at the beginning of the line
- each entry has the following attributes:
    - `title`, which defines the text to render for that menu entry
    - `url`, which can either be a URL or `false`. If it is `false`, the entry will be rendered as plain text; otherwise the entry will be rendered as a link pointing to the specified URL. Note that the URL can either be relative or absolute.
    - `post_list`, which can be `true` or `false`. If it is true, the entry will have all posts in the site as subentries. This is used to render your post list.
    - `entries`, yes, you can have entries inside entries. In this way you can create nested sublists!

### Pro tips

#### Dark mode for images

This theme provides dark mode by inverting all colors of light mode throught the CSS `invert()` function. This approach would also invert the color of all images, but, since this is not the behaviour one would expect, images are not inverted by default.

However, if you would like to force the color inversion on a specific image you can do so by applying `class="ioda"` to that image ("ioda" stands for "invert on dark appearance"). See the image in the [overview post](https://github.com/riggraz/no-style-please/blob/master/_posts/2020-07-07-overview-post.md) for an example of this approach. Note that color inversion will take place only when the theme has dark appearance!

For example, if you have a black and white image it could make sense to invert it in dark mode. On the other hand, a colorful image will probably look bad if inverted.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/riggraz/no-style-please. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass` and `assets` tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `no-style-please.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

