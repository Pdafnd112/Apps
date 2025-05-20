const clock = document.getElementById("clock");
const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");
const secondHand = document.querySelector(".second-hand");
const digitalClock = document.querySelector(".digital-clock");
const amPmElement = document.querySelector(".AM-PM");

const center = 125;
const labelRadius = 110;

// تبدیل عدد به فارسی
const toPersianDigits = (num) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// رسم اعداد ساعت
function renderClockNumbers() {
  for (let i = 1; i <= 12; i++) {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);

    const number = document.createElement("div");
    number.className = "number";
    number.style.left = `${x}px`;
    number.style.top = `${y}px`;
    number.textContent = toPersianDigits(i);

    clock.appendChild(number);
  }
}

// رسم تیک‌های دقیقه و ساعت
function renderTicks() {
  for (let i = 0; i < 60; i++) {
    const tick = document.createElement("div");
    tick.className = "tick";
    if (i % 5 !== 0) tick.classList.add("minute");
    tick.style.transform = `rotate(${i * 6}deg)`;
    clock.appendChild(tick);
  }
}

// به‌روزرسانی عقربه‌ها
function updateAnalogClock() {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourDeg = hours * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

// به‌روزرسانی ساعت دیجیتال
function updateDigitalClock() {
  const now = new Date();
  const rawHours = now.getHours();
  const hours = String(rawHours).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  digitalClock.textContent = `${toPersianDigits(hours)} : ${toPersianDigits(
    minutes
  )} : ${toPersianDigits(seconds)}`;
  amPmElement.textContent = rawHours >= 12 ? "PM" : "AM";
}

// مقداردهی اولیه
function initClock() {
  renderClockNumbers();
  renderTicks();
  updateAnalogClock();
  updateDigitalClock();
  setInterval(() => {
    updateAnalogClock();
    updateDigitalClock();
  }, 1000);
}

initClock();
