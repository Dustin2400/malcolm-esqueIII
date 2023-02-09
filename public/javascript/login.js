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
            document.location.replace('/dashboard');
        } else {
            document.location.replace('/login/error')
        }
    }
}

document.querySelector('.login').addEventListener('submit', login);