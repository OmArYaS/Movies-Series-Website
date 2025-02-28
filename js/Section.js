
export class Section {
  constructor(moviesContainer, apiUrl, prevBtn, nextBtn) {
    this.moviesContainer = document.querySelector(moviesContainer);
    this.prevBtn = document.getElementById(prevBtn);
    this.nextBtn = document.getElementById(nextBtn);
    this.apiUrl = apiUrl;
  }
}

Section.prototype.getShow = function () {
  fetch(this.apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-info p-2 ">
        <p class="movie-rating">⭐ ${movie.vote_average} / 10</p>
          <p class="movie-title fs-6"><strong>${movie.title}</strong></p>
        </div>
      `;

        this.moviesContainer.appendChild(movieCard);
      });

      updateButtons(this.prevBtn, this.nextBtn, this.moviesContainer);
    })
    .catch((error) => console.error("Error fetching movies:", error));

  // تحريك القائمة عند الضغط على الأزرار

  this.nextBtn.addEventListener("click", () => {
    this.moviesContainer.scrollLeft += 1600;

    setTimeout(() => {
      updateButtons(this.prevBtn, this.nextBtn, this.moviesContainer);
    }, 100); // ننتظر 100ms قبل استدعاء updateButtons
  });

  this.prevBtn.addEventListener("click", () => {
    this.moviesContainer.scrollLeft -= 1600;

    setTimeout(() => {
      updateButtons(this.prevBtn, this.nextBtn, this.moviesContainer);
    }, 100); // ننتظر 100ms قبل استدعاء updateButtons
  });

  // تحديث حالة الأزرار عند التمرير
  function updateButtons(prevBtn, nextBtn, moviesContainer) {
    console.log(moviesContainer.scrollLeft);
    prevBtn.style.display = moviesContainer.scrollLeft > 0 ? "block" : "none";
    nextBtn.style.display =
      moviesContainer.scrollLeft + moviesContainer.clientWidth <
      moviesContainer.scrollWidth
        ? "block"
        : "none";
  }
};