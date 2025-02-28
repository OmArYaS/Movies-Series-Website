import { BoostSection } from "./boost_section.js";
import { show_movie } from "./movie_page.js";
import { show_tv } from "./tv_pade.js";
document.querySelectorAll(".bar").forEach((element) => {
  element.addEventListener("click", function () {
    document.querySelectorAll(".bar").forEach((element) => {
      element.style.borderBottom = " none";
    });
    element.style.borderBottom = " 3px #b23636 solid";
    console.log(element);
  });
});

const apiKey = "6e5375abed4712485e0d625644275a1b";
const apiUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const results = data.results; // جلب أول 5 أفلام فقط
    const carouselInner = document.querySelector("#slide .carousel-inner");
    const indicators = document.querySelector("#slide .carousel-indicators");

    // تحقق أن العناصر موجودة في الـ HTML
    if (!carouselInner || !indicators) {
      console.error("Error: Carousel elements not found in the DOM.");
      return;
    }

    results.forEach((movie, index) => {
      const imgSrc = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
      const title = movie.title || movie.name || "No Title Available";
      const overview = movie.overview
        ? movie.overview.slice(0, 150) + "..."
        : "No description available.";
      const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
      const media_type = movie.media_type || "No votes";
      const releaseDate =
        movie.release_date || movie.first_air_date || "Unknown";

      // إنشاء عنصر السلايد
      const carouselItem = document.createElement("div");
      carouselItem.classList.add("carousel-item");
      if (index === 0) carouselItem.classList.add("active");

      carouselItem.innerHTML = `
                    <img src="${imgSrc}" class="d-block w-100 rounded-3 border border-dark" alt="${title}">
                    <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-25 p-3 ms-10 rounded text-start position-absolute bottom-10 start-0 translate-middle-y w-50">
                    <p class="fs-5"><strong>⭐</strong> ${rating} . ${releaseDate} . ${media_type}</p>

                        <h2>${title}</h2>
                        <p class="mt-5">${overview}</p>
                    </div>

                `;

      carouselInner.appendChild(carouselItem);

      // إنشاء الزر الخاص بالمؤشرات
      const indicator = document.createElement("button");
      indicator.type = "button";
      indicator.setAttribute("data-bs-target", "#slide");
      indicator.setAttribute("data-bs-slide-to", index);
      if (index === 0) indicator.classList.add("active");

      indicators.appendChild(indicator);
    });
  })
  .catch((error) => console.error("Error fetching trending movies:", error));

// قائمة التصنيفات (Genres) للأفلام مع الـ ID لكل نوع
const movieGenres = {
  "Trending Movies": `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
  "Action Movies": `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`,
  "Comedy Movies": `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`,
  "Horror Movies": `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`,
  "Sci-Fi Movies": `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878`,
  "Drama Movies": `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18`,
  "Romance Movies": `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749`,
};

// إنشاء الأقسام تلقائيًا بناءً على التصنيفات
for (const [title, apiUrl] of Object.entries(movieGenres)) {
  let section = new BoostSection(apiUrl, title);
  section.getShow();
}

const tvGenres = {
  "Trending TV Shows": `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`,
  "Action TV Shows": `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10759`,
  "Comedy TV Shows": `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=35`,
  "Horror TV Shows": `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=27`,
  "Sci-Fi TV Shows": `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10765`,
  "Drama TV Shows": `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=18`,
  "Romance TV Shows": `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=10749`,
};

// إنشاء الأقسام تلقائيًا بناءً على التصنيفات
for (const [title, apiUrl] of Object.entries(tvGenres)) {
  let section = new BoostSection(apiUrl, title);
  section.getShow();
}

const home = document.getElementById("home_page");
home.addEventListener("click", function () {
  const homePage = document.querySelector(".home-page");
  const moviePage = document.querySelector(".movies-page");
  const tvPage = document.querySelector(".tv-page");

  if (homePage) homePage.style.display = "block";
  if (moviePage) moviePage.style.display = "none";
  if (tvPage) tvPage.style.display = "none";
});

const movie = document.getElementById("movie_page");
movie.addEventListener("click", function () {
  const homePage = document.querySelector(".home-page");
  const moviePage = document.querySelector(".movies-page");
  const tvPage = document.querySelector(".tv-page");

  if (homePage) homePage.style.display = "none";
  if (tvPage) tvPage.style.display = "none";

  if (!moviePage) {
    show_movie(); // استدعاء دالة عرض الأفلام إذا لم تكن موجودة
  } else {
    moviePage.style.display = "block";
  }
});

const tv = document.getElementById("tv_page");
tv.addEventListener("click", function () {
  const homePage = document.querySelector(".home-page");
  const moviePage = document.querySelector(".movies-page");
  const tvPage = document.querySelector(".tv-page");

  if (homePage) homePage.style.display = "none";
  if (moviePage) moviePage.style.display = "none";

  if (!tvPage) {
    show_tv(); // استدعاء دالة عرض المسلسلات إذا لم تكن موجودة
  } else {
    tvPage.style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    // ✅ إذا كان المستخدم مسجل دخوله، انقله للصفحة الرئيسية
    window.location.href = "../index.html"; // استبدلها بالصفحة المناسبة
  }
});

document.querySelector(".logout").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  alert("👋 تم تسجيل الخروج بنجاح.");
  window.location.href = "../index.html"; // إعادة المستخدم لصفحة تسجيل الدخول
});

document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".group").classList.toggle("show");
});

/**************************************************/
// search
/**************************************************/
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("#searchInput");
  const searchResults = document.querySelector("#searchResults");

  // وظيفة البحث عند الكتابة
  searchInput.addEventListener("input", async function () {
    let query = this.value.trim();

    if (query.length < 2) {
      searchResults.innerHTML = ""; // مسح النتائج لو النص قصير
      searchResults.style.display = "none"; // إخفاء القائمة
      return;
    }

    // جلب البيانات من API
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();

    displayResults(data.results);
  });

  function displayResults(movies) {
    searchResults.innerHTML = "";
    searchResults.style.display = "block"; // إظهار النتائج

    if (movies.length === 0) {
      searchResults.innerHTML = "<p class='no-results'>لا توجد نتائج</p>";
      return;
    }

    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("search-result-item");
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w92${movie.poster_path}" alt="${
        movie.title
      }">
        <div class="movie-info">
          <h4>${movie.title}</h4>
          <p>⭐ ${movie.vote_average.toFixed(1)} / 10</p>
        </div>
      `;

      // ✅ عند الضغط على الفيلم، يتم الانتقال لصفحة التفاصيل
      movieElement.addEventListener("click", () => {
        localStorage.setItem("selectedMovieId", movie.id);
        window.location.href = "../pages/movie-details.html"; // فتح صفحة التفاصيل
      });

      searchResults.appendChild(movieElement);
    });
  }

  document.body.addEventListener("click", function () {
    searchResults.style.display = "none";
  });
  searchInput.addEventListener("focus", function () {
    searchResults.style.display = "block";
  });
});
