async function editStory(event) {
  event.preventDefault();

  const formEl = document.querySelector('.edit-story');
  const id = formEl.getAttribute('value'); 
  const title = document.querySelector('#title').value.trim();
  const subtitle = document.querySelector('#subtitle').value.trim();
  const name = document.querySelector('#name').value.trim();
  const image_url = document.querySelector('#image-url').value.trim();

  if( title && subtitle && name ) {
    const response = await fetch('/api/stories', {
      method: 'put',
      body: JSON.stringify({
        id,
        title,
        subtitle,
        name,
        image_url
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const url = '/edit-story/' + name;
      document.location.replace(url);
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.edit-story').addEventListener('submit', editStory);