(function() {
  var commentsContainer = document.getElementById('github-comments-container');
  if (!commentsContainer) return;

  var commentsId = commentsContainer.getAttribute('data-comments-id');
  if (!commentsId) return;

  var GH_API_URL = 'https://api.github.com/repos/nyechiel/nyechiel.github.io/issues/' + commentsId + '/comments';

  function isValidGitHubURL( url ) {
    try {
      var parsed = new URL( url );
      return parsed.protocol === 'https:' &&
             (parsed.hostname === 'github.com' ||
              parsed.hostname === 'api.github.com' ||
              parsed.hostname === 'avatars.githubusercontent.com');
    } catch (e) {
      return false;
    }
  }

  var request = new XMLHttpRequest();
  request.open( 'GET', GH_API_URL, true );
  request.onload = function() {
    if ( this.status >= 200 && this.status < 400 ) {
      var response = JSON.parse( this.response );

      for ( var i = 0; i < response.length; i++ ) {
        document.getElementById( 'gh-comments-list' ).appendChild( createCommentEl( response[ i ] ) );
      }

      if ( 0 === response.length ) {
        document.getElementById( 'no-comments-found' ).style.display = 'block';
      }
    } else {
      console.error( this );
    }
  };

  function createCommentEl( response ) {
    var user = document.createElement( 'a' );
    if ( response.user && response.user.login ) {
      user.setAttribute( 'href', 'https://github.com/' + encodeURIComponent( response.user.login ) );
    } else {
      user.setAttribute( 'href', '#' );
    }
    user.classList.add( 'user' );

    var userAvatar = document.createElement( 'img' );
    userAvatar.classList.add( 'avatar' );
    if ( response.user && response.user.avatar_url && isValidGitHubURL( response.user.avatar_url ) ) {
      userAvatar.setAttribute( 'src', response.user.avatar_url );
    } else {
      userAvatar.setAttribute( 'src', '' );
      userAvatar.setAttribute( 'alt', 'Avatar' );
    }

    user.appendChild( userAvatar );

    var commentLink = document.createElement( 'a' );
    if ( response.html_url && isValidGitHubURL( response.html_url ) ) {
      commentLink.setAttribute( 'href', response.html_url );
    } else {
      commentLink.setAttribute( 'href', '#' );
    }
    commentLink.classList.add( 'comment-url' );
    commentLink.textContent = '#' + response.id + ' - ' + response.created_at;

    var commentContents = document.createElement( 'div' );
    commentContents.classList.add( 'comment-content' );

    if ( response.body ) {
      var sanitizedContent = response.body;

      if ( window.showdown && window.DOMPurify ) {
        var converter = new showdown.Converter({
          simplifiedAutoLink: true,
          openLinksInNewWindow: true,
          strikethrough: true,
          tables: true
        });
        var html = converter.makeHtml( response.body );
        sanitizedContent = DOMPurify.sanitize( html, {
          ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'code', 'pre', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'table', 'thead', 'tbody', 'tr', 'td', 'th'],
          ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
          ALLOW_DATA_ATTR: false
        });
        commentContents.innerHTML = sanitizedContent;
      } else {
        commentContents.textContent = sanitizedContent;
      }
    }

    var comment = document.createElement( 'li' );
    comment.setAttribute( 'data-created', response.created_at );
    if ( response.user && response.user.avatar_url ) {
      comment.setAttribute( 'data-author-avatar', response.user.avatar_url );
    }
    if ( response.user && response.user.url ) {
      comment.setAttribute( 'data-user-url', response.user.url );
    }

    comment.appendChild( user );
    comment.appendChild( commentContents );
    comment.appendChild( commentLink );

    return comment;
  }
  request.send();
})();
