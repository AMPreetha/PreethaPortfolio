let lastScrollTop = 0;
function animateVisibleSections() {
  const sections = document.querySelectorAll("section");
  const scrollTop = document.documentElement.scrollTop;
  const isScrollingDown = scrollTop > lastScrollTop;
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  const isMobile = window.innerWidth <= 768;
  if (isScrollingDown) {
    sections.forEach((section) => {
      const bounding = section.getBoundingClientRect();
      if (
        (bounding.top >= 0 && bounding.top <= window.innerHeight) ||
        (bounding.bottom >= 0 &&
          bounding.bottom <= window.innerHeight &&
          !isMobile)
      ) {
        section.classList.add("animate");
      } else {
        section.classList.remove("animate");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", animateVisibleSections);
});

document.addEventListener("DOMContentLoaded", animateVisibleSections);

document.addEventListener("DOMContentLoaded", function () {
  const readMoreBtn = document.querySelector(".read-more-btn");
  const shortContent = document.querySelector(".content-short");
  const fullContent = document.querySelector(".content-full");

  readMoreBtn.addEventListener("click", function () {
    if (readMoreBtn.textContent === "Read More") {
      shortContent.style.display = "none";
      fullContent.style.display = "block";
      readMoreBtn.textContent = "Read Less";
    } else {
      shortContent.style.display = "block";
      fullContent.style.display = "none";
      readMoreBtn.textContent = "Read More";
    }
  });
});

function togglebutton() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle.checked) {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
  } else {
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");
  }
}
function toggleScrollTopButton() {
  var scrollTopButton = document.getElementById("myBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
}

window.addEventListener("scroll", toggleScrollTopButton);

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "Message Sent Successfully✔️";
        form.style.display = "none";
      } else {
        console.log(response);
        result.innerHTML = "Message Sent Successfully✔️";
        form.style.display = "none";
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
        form.style.display = "block";
      }, 3000);
    });
});
