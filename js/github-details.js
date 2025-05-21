const username = localStorage.getItem("selectedUsername");
const userCard = document.getElementById("user-card");
const userActivity = document.getElementById("user-activity");
const repoList = document.getElementById("repo-list");

// بدون استفاده از توکن
const headers = {};

function goBack() {
  localStorage.setItem("fromDetailsPage", "true");
  window.location.href = "./github-search.html";
}

if (!username) {
  userCard.textContent = "هیچ نام کاربری انتخاب نشده است.";
  repoList.style.display = "none";
} else {
  fetch(`https://api.github.com/users/${username}`, { headers })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Not Found") {
        userCard.innerHTML = "User not found.";
      } else {
        userCard.innerHTML = `
          <div class="gallery">
            <img src="${data.avatar_url}" alt="${data.login}" />
            <span class="space-top">${data.name || data.login}</span>
            <span>${data.location || "Location not available"}</span>
          </div>
          <div class="history">
            <h3>Bio:</h3>
            <p class="description">${data.bio || "No bio available"}</p>
            <a class="github-page" href="${
              data.html_url
            }" target="_blank">Visit Github Page</a>
            <div>
              <span>Login: ${data.login}</span>
              <div class="website">Website: ${
                data.blog || "No website available"
              }</div>
            </div>
          </div>
        `;

        userActivity.innerHTML = `
          <div class="items">
            <div class="followers">Followers: ${data.followers}</div>
            <div class="following">Following: ${data.following}</div>
            <div class="public-repos">Public Repos: ${data.public_repos}</div>
            <div class="public-gists">Public Gists: ${data.public_gists}</div>
          </div>
        `;
      }
    })
    .catch(() => {
      userCard.textContent = "خطا در دریافت اطلاعات کاربر.";
    });

  fetch(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
    { headers }
  )
    .then((res) => res.json())
    .then((repos) => {
      repoList.innerHTML = "";
      if (Array.isArray(repos)) {
        repos.forEach((repo) => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
          repoList.appendChild(li);
        });
      } else {
        repoList.innerHTML = "<li>No repositories found.</li>";
      }
    })
    .catch(() => {
      repoList.innerHTML = "<li>خطا در دریافت مخازن.</li>";
    });
}
