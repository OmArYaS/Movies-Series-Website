export function show_tv() {
  let tvShow = document.createElement("div");
  tvShow.classList.add("tv-page");
  tvShow.innerHTML = `
    <div class="filter-container">
      <select id="categoryFilter">
        <option value="trending">🔥 الأكثر رواجًا</option>
        <option value="top_rated">⭐ أعلى تقييمًا</option>
        <option value="popular">🔥 الأكثر شهرة</option>
        <option value="airing_today">📺 يعرض اليوم</option>
        <option value="on_the_air">📡 يُبَث حاليًا</option>
      </select>
      <select id="genreFilter">
        <option value="all">🎭 كل الأنواع</option>
        <option value="10759">💥 أكشن ومغامرات</option>
        <option value="16">🎨 أنمي</option>
        <option value="35">😂 كوميدي</option>
        <option value="80">🕵️ جريمة</option>
        <option value="18">🎭 دراما</option>
        <option value="9648">🔍 غموض</option>
        <option value="10765">🚀 خيال علمي وفانتازيا</option>
        <option value="10768">🎖️ حرب وسياسة</option>
        <option value="37">🤠 الغرب الأمريكي</option>
      </select>
    </div>
    <div class="tv-grid" id="tvGrid"></div>
    <div class="pagination">
      <button id="prevPage">❮ السابق</button>
      <span id="pageNumber">1</span>
      <button id="nextPage">التالي ❯</button>
    </div>
  `;

  document.body.appendChild(tvShow); // إضافة العنصر إلى الصفحة

  setTimeout(() => {
    const apiKey = "6e5375abed4712485e0d625644275a1b";
    let currentPage = 1;
    let selectedCategory = "popular";
    let selectedGenre = "all";
    const tvGrid = document.getElementById("tvGrid");
    const pageNumber = document.getElementById("pageNumber");

    const fetchTVShows = async (
      category = "popular",
      genre = "all",
      page = 1
    ) => {
      let url =
        genre !== "all"
          ? `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genre}&page=${page}`
          : `https://api.themoviedb.org/3/tv/${category}?api_key=${apiKey}&page=${page}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        displayTVShows(data.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    const displayTVShows = (tvShows) => {
      tvGrid.innerHTML = "";
      tvShows.forEach((show) => {
        const tvCard = document.createElement("div");
        tvCard.classList.add("tv-card");
        tvCard.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name}">
          <h4>${show.name}</h4>
          <p>⭐ ${show.vote_average} / 10 <br> ${show.first_air_date}</p>
        `;
        // ✅ عند الضغط على الفيلم، يتم الانتقال لصفحة التفاصيل
        tvCard.addEventListener("click", () => {
          localStorage.setItem("selectedMovieId", show.id);
          window.location.href = "../pages/movie-details.html"; // فتح صفحة التفاصيل
        });
        tvGrid.appendChild(tvCard);
      });
    };

    document
      .getElementById("categoryFilter")
      .addEventListener("change", (e) => {
        selectedCategory = e.target.value;
        selectedGenre = "all";
        currentPage = 1;
        fetchTVShows(selectedCategory, selectedGenre, currentPage);
      });

    document.getElementById("genreFilter").addEventListener("change", (e) => {
      selectedGenre = e.target.value;
      selectedCategory = "all";
      currentPage = 1;
      fetchTVShows(selectedCategory, selectedGenre, currentPage);
    });

    document.getElementById("nextPage").addEventListener("click", () => {
      currentPage++;
      pageNumber.textContent = currentPage;
      fetchTVShows(selectedCategory, selectedGenre, currentPage);
    });

    document.getElementById("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        pageNumber.textContent = currentPage;
        fetchTVShows(selectedCategory, selectedGenre, currentPage);
      }
    });

    fetchTVShows();
  }, 100);
}
