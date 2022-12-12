async function editContent(event) {
  event.preventDefault();

  const formEl = document.querySelector('.edit-content');
  const story_id = formEl.getAttribute('value');
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  const type = document.querySelector('#type').value.trim();
  const text = document.querySelector('#text').value.trim();
  const url = document.querySelector('#url').value.trim();

  if ( type && text ) {
    console.log('here');
    const storyUrl = '../api/stories/byId/' + story_id;
    const storyResponse = await fetch(storyUrl, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    });

    const storyObj = await storyResponse.json();
    const story_name = storyObj.name;
    console.log(story_name);

    const url2 = '../api/content/' + id;
    const response = await fetch(url2, {
      method: 'put',
      body: JSON.stringify({
        type,
        text,
        url
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const url3 = '/edit-story/' + story_name
      document.location.replace(url3)
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.edit-content').addEventListener('submit', editContent);