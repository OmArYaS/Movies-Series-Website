export function show_movie() {
  let movie = document.createElement("div");
  movie.classList.add("movies-page");
  movie.innerHTML = `
    <div class="filter-container">
      <select id="categoryFilter">
        <option value="trending">🔥 الأكثر رواجًا</option>
        <option value="top_rated">⭐ أعلى تقييمًا</option>
        <option value="popular">🔥 الأكثر شهرة</option>
        <option value="now_playing">🎬 يعرض الآن</option>
        <option value="upcoming">📅 القادم قريبًا</option>
      </select>
      <select id="genreFilter">
        <option value="all">🎭 كل الأنواع</option>
        <option value="28">💥 أكشن</option>
        <option value="12">🌍 مغامرات</option>
        <option value="16">🎨 أنمي</option>
        <option value="35">😂 كوميدي</option>
        <option value="80">🕵️ جريمة</option>
        <option value="18">🎭 دراما</option>
        <option value="27">👻 رعب</option>
        <option value="878">🚀 خيال علمي</option>
        <option value="53">🔪 إثارة</option>
      </select>
    </div>
    <div class="movies-grid" id="moviesGrid"></div>
    <div class="pagination">
      <button id="prevPage">❮ السابق</button>
      <span id="pageNumber">1</span>
      <button id="nextPage">التالي ❯</button>
    </div>
  `;

  document.body.appendChild(movie); // إضافة العنصر إلى الصفحة

  setTimeout(() => {
    const apiKey = "6e5375abed4712485e0d625644275a1b";
    let currentPage = 1;
    let selectedCategory = "popular";
    let selectedGenre = "all";
    const moviesGrid = document.getElementById("moviesGrid");
    const pageNumber = document.getElementById("pageNumber");

    const fetchMovies = async (
      category = "popular",
      genre = "all",
      page = 1
    ) => {
      let url =
        genre !== "all"
          ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${page}`
          : `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const displayMovies = (movies) => {
      moviesGrid.innerHTML = "";
      movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h4>${movie.title}</h4>
          <p>⭐ ${movie.vote_average} / 10 <br> ${movie.release_date}</p>
        `;
        // ✅ عند الضغط على الفيلم، يتم الانتقال لصفحة التفاصيل
        movieCard.addEventListener("click", () => {
          localStorage.setItem("selectedMovieId", movie.id);
          localStorage.setItem("type", "movie");

          window.location.href = "../pages/movie-details.html"; // فتح صفحة التفاصيل
        });
        moviesGrid.appendChild(movieCard);
      });
    };

    document
      .getElementById("categoryFilter")
      .addEventListener("change", (e) => {
        selectedCategory = e.target.value;
        selectedGenre = "all";
        currentPage = 1;
        fetchMovies(selectedCategory, selectedGenre, currentPage);
      });

    document.getElementById("genreFilter").addEventListener("change", (e) => {
      selectedGenre = e.target.value;
      selectedCategory = "all";
      currentPage = 1;
      fetchMovies(selectedCategory, selectedGenre, currentPage);
    });

    document.getElementById("nextPage").addEventListener("click", () => {
      currentPage++;
      pageNumber.textContent = currentPage;
      fetchMovies(selectedCategory, selectedGenre, currentPage);
    });

    document.getElementById("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        pageNumber.textContent = currentPage;
        fetchMovies(selectedCategory, selectedGenre, currentPage);
      }
    });

    fetchMovies();
  }, 100);
}
