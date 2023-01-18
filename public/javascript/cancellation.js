async function unsubscribe() {
  const response = await fetch('/api/users', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  console.log(response);
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText)
  }
}

document.querySelector('#cancel').addEventListener('click', unsubscribe);