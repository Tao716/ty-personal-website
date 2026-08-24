/* =========================================================
   个人作品集 — 交互脚本
   ========================================================= */

// ----- 导航栏滚动效果 -----
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  updateActiveLink();
});

// ----- 移动端菜单 -----
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    nav.classList.remove("open");
  });
});

// ----- 滚动高亮当前板块 -----
const sections = document.querySelectorAll("section[id], main > section");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
}

// ----- Hero 关键词轮换（编辑风淡入淡出）-----
const words = ["界面设计", "前端开发", "摄影", "品牌创意"];
const rotatingEl = document.getElementById("rotating");
let wordIndex = 0;

function rotateWord() {
  rotatingEl.style.opacity = "0";
  rotatingEl.style.transition = "opacity 0.3s ease";
  setTimeout(() => {
    wordIndex = (wordIndex + 1) % words.length;
    rotatingEl.textContent = words[wordIndex];
    rotatingEl.style.opacity = "1";
  }, 300);
}

rotatingEl.textContent = words[0];
setInterval(rotateWord, 2600);

// ----- 滚动浮现动画 -----
const revealEls = document.querySelectorAll(".reveal-up");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// ----- 联系表单（演示用，可接入后端）-----
const form = document.getElementById("contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert("请填写名字、邮箱和留言内容");
    return;
  }

  // TODO: 在这里接入你的后端接口或第三方表单服务（如 Formspree）
  // fetch("你的接口地址", { method: "POST", body: new FormData(form) });

  alert(`谢谢你的留言，${name}！我会尽快回复你。`);
  form.reset();
});
