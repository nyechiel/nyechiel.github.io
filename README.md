# nyechiel.github.io

Source code for my personal static site: https://nyechiel.com


## Usage

To add a new post, follow these steps:

1. Create a new .md file under the `_posts` directory. Make sure to follow the name convention.
2. For the comments system to work, report a new GitHub issue and insert the issue number in the `comments_id` field within the new .md file.
3. New posts will be published at `/blog/YYYY/MM/DD/post-slug/`.
4. To test changes locally, run the `bundle exec jekyll serve` command. This should build the site under the `_site` directory and run it on a local server at http://localhost:4000.
5. Commit the changes.
6. The new changes should be reflected in the site as soon as the triggered [GitHub Pages workflow](https://github.com/nyechiel/nyechiel.github.io/actions) finishes.


## Acknowledgments

* Developed with Jekyll: https://github.com/jekyll/jekyll
* Comments system: https://aristath.github.io/blog/static-site-comments-using-github-issues-api
* Reading time: https://carlosbecker.com/posts/jekyll-reading-time-without-plugins

## License

Code is available under the MIT license. See the [LICENSE](LICENSE) file for details.
