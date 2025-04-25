function fetchProfile() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Enter a GitHub username');
        return;
    }

    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            displayProfile(data);
        })
        .catch(err => {
            console.error('Fetch error:', err);
            document.getElementById('profile').innerHTML = `<p style="color:red;">${err.message}</p>`;
        });
}

function displayProfile(profileData) {
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `
        <h2>${profileData.login}</h2>
        <img src="${profileData.avatar_url}" width="150" />
        <p><strong>Name:</strong> ${profileData.name || "Not available"}</p>
        <p><strong>Bio:</strong> ${profileData.bio || "No bio available"}</p>
        <p><strong>Followers:</strong> ${profileData.followers}</p>
        <p><strong>Public Repos:</strong> ${profileData.public_repos}</p>
        <a href="${profileData.html_url}" target="_blank">Visit GitHub Profile</a>
    `;
}
