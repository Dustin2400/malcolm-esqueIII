async function addContent(event) {
  event.preventDefault();

  const name = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  const storyEl = document.querySelector('#storyId');
  const story_id = storyEl.getAttribute('value');
  const type = document.querySelector('#type').value.trim();
  const text = document.querySelector('#text').value.trim();
  const url = document.querySelector('#url').value.trim();

  if( type && text ) {
    const response = await fetch('../api/content', {
      method: 'post',
      body: JSON.stringify({
        story_id,
        type,
        text,
        url
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

document.querySelector('.add-content').addEventListener('submit', addContent);