const ApiKey = "69f646d7ada33bb8f0e2c8f6345e7f6d";
const form = document.getElementById("weatherForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const InputElement = document.getElementById("cityInput");
  const resultBox = document.getElementById("weatherResult");
  const errorBox = document.getElementById("error-message");
  const city = InputElement.value.trim();

  errorBox.style.display = "none";
  errorBox.innerHTML = "";
  resultBox.innerHTML = "";

  function showError() {
    errorBox.style.display = "flex";
    setTimeout(() => {
      errorBox.style.display = "none";
      errorBox.innerHTML = "";
    }, 3000);
  }

  if (!city) {
    errorBox.innerHTML = `
              <p>لطفاً نام شهر را وارد کنید.</p>
              <span class="error-icon">!</span>
            `;
    showError();
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric&lang=fa`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      errorBox.innerHTML = `
                <p>شهر یافت نشد.</p>
                <span class="error-icon">!</span>
              `;
      showError();
      return;
    }

    resultBox.innerHTML = `
              <h3> نام شهر: ${data.name}</h3>
              <h4> نام کشور: ${data.sys.country}</h4>
              <p class="handel-size"> 
                <img src="./icons-svg/location.svg" width="18" height="18" alt="location" />
                عرض جغرافیایی: ${data.coord.lat}
              </p>
              <p class="handel-size">
                <img src="./icons-svg/location.svg" width="18" height="18" alt="location" />
                 طول جغرافیایی: ${data.coord.lon}
              </p>
              <p class="handel-size">
                <img src="./icons-svg/weather.svg" width="18" height="18" alt="weather" />
                وضعیت: ${data.weather[0].description}
              </p>
              <p class="handel-size">
                <img
                src="./icons-svg/temperature.svg"
                width="18"
                height="18"
                alt="temperature"
                />
                دما: ${data.main.temp}° سانتی‌گراد 
              </p>
              <p class="handel-size">
                <img
                src="./icons-svg/humidity.svg"
                width="18"
                height="18"
                alt="humidity"
                />
                رطوبت: ${data.main.humidity}%
              </p>
              <p class="handel-size">
                <img
                src="./icons-svg/wind-speed.svg"
                width="18"
                height="18"
                alt="wind-speed"
                />
                سرعت باد: ${data.wind.speed} متر بر ثانیه
              </p>
            `;
  } catch (error) {
    errorBox.innerHTML = `
              <span class="error-icon">!</span>
              <span>مشکلی در دریافت اطلاعات پیش آمد.</span>
            `;
    showError();
  }
});
