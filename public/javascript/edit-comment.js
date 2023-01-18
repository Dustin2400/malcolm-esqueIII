async function editComment(event) {
  event.preventDefault();

  const post_text =document.querySelector('#text').value.trim();
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  if(post_text) {
    const url = '../api/posts/' + id;
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        post_text
      }),
      headers: { 'Content-type': 'application/json' }
    });

    if(response.ok) {
      document.location.replace('/dashboard');
    }
  }
}

document.querySelector('.edit-comment').addEventListener('submit', editComment);