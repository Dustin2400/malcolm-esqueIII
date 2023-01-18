async function addComment(event) {
  event.preventDefault();

  const storyName = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  const postText = document.querySelector('#newComment').value.trim();

  if (postText) {
    const response = await fetch('../api/posts', {
      method: 'POST',
      body: JSON.stringify({
        storyName,
        postText
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.reload();
    }
  }
}

document.querySelector('.addComment').addEventListener('submit', addComment);