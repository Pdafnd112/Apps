// ApiKey
const ApiKey = "6db83d4e8e40771aa1128d8cf24d9fab";
// InputElement
const ButtonElement = document.getElementById("getWeatherBtn");

ButtonElement.addEventListener("click", async () => {
  const InputElement = document.getElementById("cityInput").value.trim();
  const ShowResult = document.getElementById("weatherResult");
  // InputElement
  const errorMessage = document.getElementById("error-message");
  errorMessage.style.display = "none"; // پاک کردن خطای قبلی
  errorMessage.textContent = "";
  // InputElement
  if (!InputElement) {
    ShowResult.innerHTML = "";
    errorMessage.innerHTML = `
    <span class="error-icon">!</span>
    <p class="title">لطفا نام شهر خود را وارد کنید</p>`;
    errorMessage.style.display = "flex";
    setTimeout(() => {
      errorMessage.style.display = "none";
      errorMessage.innerHTML = "";
    }, 3000);
    return;
  }
  // try catch
  try {
    const response = await fetch(
      `https://api.weatherstack.com/current?access_key=${ApiKey}&query=${InputElement}`
    );

    const data = await response.json();

    if (data.error) {
      ShowResult.innerHTML = `
      <div class="error-icon">!</div>
      <span class="title">خطا: ${data.error.info}</span>`;
      return;
    }
    // ShowResult
    ShowResult.innerHTML = `
    <h3>${data.location.name}</h3>
    <h2>${data.location.country}</h2>
    <p>📍 عرض جغرافیایی: ${data.location.lat}</p>
    <p>📍 طول جغرافیایی: ${data.location.lon}</p>
    <p>🌤 وضعیت: ${data.current.weather_descriptions[0]}</p>
    <p>🌡 دما: ${data.current.temperature} درجه سانتی‌گراد</p>
    <p>💧 رطوبت: ${data.current.humidity}%</p>
    <p>💨 سرعت باد: ${data.current.wind_speed} کیلومتر بر ساعت</p>`;
  } catch (err) {
    ShowResult.innerHTML = ` 
    <div class="error-icon">!</div>
    <span class="title">مشکلی در دریافت اطلاعات پیش آمد.</span>`;
  }
});
