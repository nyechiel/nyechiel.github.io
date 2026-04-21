# CLAUDE.md

Personal blog built with Jekyll and hosted on GitHub Pages at https://nyechiel.com.

## Build and serve locally

```sh
bundle install
bundle exec jekyll serve
```

Site builds to `_site/` and serves at http://localhost:4000.

## Adding a new post

1. Create `_posts/YYYY-MM-DD-slug-title.md`
2. Open a new GitHub issue for comments and note the issue number
3. Use this frontmatter:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
categories:
- Blog
tags:
- TagName
comments_id: <github-issue-number>
permalink: "/blog/YYYY/MM/DD/slug-title/"
redirect_from: "/YYYY/MM/DD/slug-title/"
---
```

The `redirect_from` field maps old WordPress-style URLs to the current permalink structure. Include it for consistency.

## Project structure

- `_posts/` — blog posts (Markdown)
- `_includes/` — partial templates (comments system, custom head, read time)
- `_layouts/` — page layouts (only `post.html` is custom; others come from the minima theme)
- `assets/` — images and fonts
- `_config.yml` — Jekyll site configuration
- Pages: `index.md`, `about.md`, `podcasts.md`, `blog/index.md`

## Comments system

Comments are powered by GitHub Issues. Each post has a `comments_id` frontmatter field that links to a GitHub issue. Comments on that issue are fetched client-side via the GitHub API and rendered with DOMPurify sanitization.

## CI

PR and push to `master` trigger: Jekyll build, internal link checking (html-proofer), markdown lint, bundler-audit security scan, and CodeQL analysis. GitHub Actions are pinned to commit SHAs.

## Style notes

- Markdown lint is configured in `.markdownlint.json`
