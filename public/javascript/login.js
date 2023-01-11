async function login(event) {
  event.preventDefault();


  const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(response.ok) {
            // document.location.replace('/account');
            console.log(response.json());
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login').addEventListener('submit', login);