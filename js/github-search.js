const form = document.getElementById("search-form");
const usersList = document.getElementById("users-list");
const submitBtn = document.getElementById("submit-btn");
const loader = document.getElementById("loader");

function displayUsers(users) {
  usersList.textContent = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <div class="user-info">
              <img src="${user.avatar_url}" alt="${user.login}" />
              <h3>${user.login}</h3>
            </div>
            <a href="#" class="more" data-username="${user.login}">More</a>
          `;
    usersList.appendChild(li);
  });

  document.querySelectorAll(".more").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const username = e.target.getAttribute("data-username");
      goToDetails(username);
    });
  });
}

function goToDetails(username) {
  localStorage.setItem("selectedUsername", username);
  localStorage.setItem("fromDetailsPage", "true");
  window.location.href = "./github-details.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const fromDetails = localStorage.getItem("fromDetailsPage");

  if (fromDetails === "true") {
    const cached = localStorage.getItem("searchedUsers");
    if (cached) {
      const users = JSON.parse(cached);
      if (Array.isArray(users)) {
        displayUsers(users);
        createClearBtn();
      }
    }
    localStorage.removeItem("fromDetailsPage");
  } else {
    localStorage.removeItem("searchedUsers");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none";
  errorMessage.textContent = "";

  const query = e.target.search.value.trim();
  if (!query) {
    errorMessage.innerHTML = `
          <span class="error-icon">!</span>
          <p>Please enter username for github account.</p>
          `;
    errorMessage.style.display = "flex";
    setTimeout(() => {
      errorMessage.style.display = "none";
      errorMessage.textContent = "";
    }, 3000);
    return;
  }
  loader.style.display = "block";
  usersList.textContent = "";
  removeClearBtn();
  submitBtn.disabled = true;

  try {
    const res = await fetch(`https://api.github.com/search/users?q=${query}`);
    if (!res.ok) throw new Error("Failed to fetch users");
    if (res.status === 403) throw new Error("API rate limit exceeded.");
    const data = await res.json();
    const users = data.items;

    if (users.length === 0) {
      usersList.innerHTML = "<li>No users found.</li>";
      loader.style.display = "none";
      submitBtn.disabled = false;
      return;
    }

    localStorage.setItem("searchedUsers", JSON.stringify(users));
    displayUsers(users);
    createClearBtn();
  } catch (err) {
    usersList.innerHTML = `<li>Error: ${err.message}</li>`;
  } finally {
    loader.style.display = "none";
    submitBtn.disabled = false;
  }
});

function createClearBtn() {
  if (document.getElementById("clear-btn")) return;

  const btn = document.createElement("button");
  btn.textContent = "Clear All";
  btn.className = "clear-btn";
  btn.id = "clear-btn";

  btn.addEventListener("click", () => {
    localStorage.removeItem("searchedUsers");
    usersList.textContent = "";
    btn.remove();
  });

  form.insertAdjacentElement("afterend", btn);
}

function removeClearBtn() {
  const btn = document.getElementById("clear-btn");
  if (btn) btn.remove();
}
