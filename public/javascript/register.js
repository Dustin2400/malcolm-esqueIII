async function newUser(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  const users = await fetch('/api/users', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(dbUserData => dbUserData.json())
  .then(data => {
    return data
  })
  .catch(err => console.log(err));
  console.log(users);

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username) {
      document.location.replace('/register-error/username')
    }
  }

  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    document.location.replace('/register-error/email');
  }

  if (!password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[●!#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}/)) {
    document.location.replace('/register-error/password');
  }


  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    }),
    headers: { 'Content-Type': 'application/json '}
  });

  if (response.ok) {
    document.location.replace('/');
  }
}

document.querySelector('.login').addEventListener('submit', newUser);