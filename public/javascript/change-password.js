async function changePassword(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
  const currentPassword = document.querySelector('#currentPassword').value.trim();
  const newPassword = document.querySelector('#newPassword').value.trim();
  const confirmPassword = document.querySelector('#confirmPassword').value.trim();

  const url = '/api/users/checkPassword/' + id;
  const validation = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      password: currentPassword
    }),
    headers: { 'Content-Type': 'application/json '}
  })
  .then(dbUserData => dbUserData.json())
  .then(data => {
    return data
  })

  if (!validation.valid){
    const url2 = '/change-password-error/invalid/' + id;
    document.location.replace(url2);
  }

  if (!newPassword.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[●!#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}/)) {
    const url3 = '/change-password-error/password/' + id;
    document.location.replace(url3);
  }

  if(newPassword != confirmPassword){
    const url4 = '/change-password-error/mismatch/' + id;
    document.location.replace(url4);
  }

  const response = await fetch ('/api/users/change-password', {
    method: 'PUT',
    body: JSON.stringify({
      id,
      password: newPassword
    }),
    headers: { 'Content-Type': 'application/json '}
  })

  if (response.ok) {
    document.location.replace('/dashboard');
  }
}

document.querySelector('.login').addEventListener('submit', changePassword);