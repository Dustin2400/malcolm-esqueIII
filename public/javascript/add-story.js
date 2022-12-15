async function addStory(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const subtitle = document.querySelector('#subtitle').value.trim();
  const name = document.querySelector('#name').value.trim();
  const image_url = document.querySelector('#image-url').value.trim();
  
  if( title && subtitle && name ) {
    const response = await fetch('./api/stories', {
      method: 'post',
      body: JSON.stringify({
        title,
        subtitle,
        name,
        image_url
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const url = 'edit-story/' + name;
      document.location.replace(url);
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.add-story').addEventListener('submit', addStory);
