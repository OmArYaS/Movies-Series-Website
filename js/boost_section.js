export class BoostSection {
  constructor(apiUrl, title) {
    this.apiUrl = apiUrl;
    this.moviesContainer = document.createElement("div");
    this.moviesContainer.classList.add("movies-container");
    // this.moviesContainer.classList.add("row");
    this.title = title;
  }

  getShow() {
    fetch(this.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // إنشاء كود HTML للقسم
        const sectionHTML = `
            <div class="section  my-5">
                <h2 class="text-white mb-4">${this.title}</h2>
                <div class="movies-wrapper">
                    <button class="scroll-btn prevBtn">❮</button>
                    <div class="movies-container-wrapper"></div>
                    <button class="scroll-btn nextBtn">❯</button>
                </div>
            </div>
        `;

        // إضافة القسم إلى الصفحة
        const multiSection = document.querySelector(".multi-section");
        multiSection.insertAdjacentHTML("beforeend", sectionHTML);

        // تحديد العناصر بعد إضافتها
        const lastSection = multiSection.lastElementChild;
        const moviesWrapper = lastSection.querySelector(".movies-wrapper");
        const containerWrapper = lastSection.querySelector(
          ".movies-container-wrapper"
        );
        const prevBtn = lastSection.querySelector(".prevBtn");
        const nextBtn = lastSection.querySelector(".nextBtn");

        // إضافة الأفلام
        data.results.forEach((movie) => {
          const movieCard = document.createElement("div");
          movieCard.classList.add("movie-card");

          movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}">
            <div class="movie-info p-2">
            <p class="movie-title fs-5"><strong>${
              movie.title || movie.name
            }</strong></p>
              <p class="movie-rating fs-6">⭐ ${movie.vote_average} / 10 <br> ${
            movie.release_date
          }</p>
            </div>
          `;
          // console.log(movie.name ,movie.media_type||(this.apiUrl.slice(this.apiUrl.indexOf("r/") + 2 ,this.apiUrl.indexOf("r/") + 3))=="m"?"movie":"tv");
          // ✅ عند الضغط على الفيلم، يتم الانتقال لصفحة التفاصيل
          movieCard.addEventListener("click", () => {
            localStorage.setItem("selectedMovieId", movie.id);
            if (movie.media_type) {
              console.log("Using movie.media_type:", movie.media_type);
              localStorage.setItem("type", movie.media_type);
            } else {
              const extractedType = this.apiUrl.slice(this.apiUrl.indexOf("r/") + 2, this.apiUrl.indexOf("r/") + 3);
              const type = extractedType === "m" ? "movie" : "tv";
              localStorage.setItem("type", type);
            }

          

            window.location.href = "../pages/movie-details.html"; // فتح صفحة التفاصيل
          });

          this.moviesContainer.appendChild(movieCard);
        });

        // إضافة العناصر إلى DOM
        containerWrapper.appendChild(this.moviesContainer);

        // تحديث حالة الأزرار
        updateButtons(prevBtn, nextBtn, this.moviesContainer);

        // إضافة الأحداث للأزرار
        nextBtn.addEventListener("click", () => {
          this.moviesContainer.scrollLeft += 600;
          setTimeout(
            () => updateButtons(prevBtn, nextBtn, this.moviesContainer),
            100
          );
        });

        prevBtn.addEventListener("click", () => {
          this.moviesContainer.scrollLeft -= 600;
          setTimeout(
            () => updateButtons(prevBtn, nextBtn, this.moviesContainer),
            100
          );
        });
      })
      .catch((error) => console.error("Error fetching movies:", error));

    function updateButtons(prevBtn, nextBtn, moviesContainer) {
      prevBtn.style.display = moviesContainer.scrollLeft > 0 ? "block" : "none";
      nextBtn.style.display =
        moviesContainer.scrollLeft + moviesContainer.clientWidth <
        moviesContainer.scrollWidth
          ? "block"
          : "none";
    }
  }
}
