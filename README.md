# nyechiel.github.io

[![PR Tests](https://github.com/nyechiel/nyechiel.github.io/actions/workflows/pr-tests.yml/badge.svg)](https://github.com/nyechiel/nyechiel.github.io/actions/workflows/pr-tests.yml)
[![Deploy](https://github.com/nyechiel/nyechiel.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/nyechiel/nyechiel.github.io/actions/workflows/pages/pages-build-deployment)
[![CodeQL](https://github.com/nyechiel/nyechiel.github.io/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/nyechiel/nyechiel.github.io/actions/workflows/codeql-analysis.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Source code for [nyechiel.com](https://nyechiel.com) - a personal blog about AI, product craft, and the human side of shipping software.

Built with [Jekyll](https://jekyllrb.com/) 4.4 and the [minima](https://github.com/jekyll/minima) theme, deployed via GitHub Pages.

## Features

- **Search** - client-side full-text search across all posts
- **Tags** - browse posts by topic
- **Comments** - powered by GitHub Issues API with [DOMPurify](https://github.com/cure53/DOMPurify) sanitization
- **Email subscriptions** - via [follow.it](https://follow.it)
- **Reading time** - estimated reading time on each post
- **Content Security Policy** - strict CSP, SRI on CDN scripts, security headers
- **Accessibility** - skip-to-content link, ARIA labels, lazy-loaded images
- **LLM-friendly** - [`llms.txt`](https://nyechiel.com/llms.txt) for AI agent discoverability
- **CI checks** - link validation, markdown linting, security audit, and site-level assertions on every PR

## Getting Started

**Prerequisites:** Ruby 3.2+

```sh
git clone https://github.com/nyechiel/nyechiel.github.io.git
cd nyechiel.github.io
bundle install
bundle exec jekyll serve
```

The site will be available at http://localhost:4000.

## Adding a Post

1. Create a new `.md` file under `_posts/` following the `YYYY-MM-DD-title.md` naming convention.
2. To enable comments, open a [GitHub issue](https://github.com/nyechiel/nyechiel.github.io/issues) and set `comments_id` in the post's front matter.
3. Posts are published at `/blog/YYYY/MM/DD/post-slug/`.
4. Push to `master` - the site updates once the [GitHub Pages workflow](https://github.com/nyechiel/nyechiel.github.io/actions) completes.

## Acknowledgments

- [Jekyll](https://github.com/jekyll/jekyll) - static site generator
- [Comments via GitHub Issues API](https://aristath.github.io/blog/static-site-comments-using-github-issues-api) - Ari Stathopoulos
- [Reading time without plugins](https://carlosbecker.com/posts/jekyll-reading-time-without-plugins) - Carlos Becker
- [follow.it](https://follow.it) - email subscriptions

## License

Code is available under the MIT license. See the [LICENSE](LICENSE) file for details.
