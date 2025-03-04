document.addEventListener("DOMContentLoaded", async () => {
  const movieId = localStorage.getItem("selectedMovieId");
  const type = localStorage.getItem("type");
  if (!movieId) {
    alert("لا يوجد فيلم محدد!");
    window.location.href = "index.html"; // رجوع للصفحة الرئيسية
    return;
  }

  const apiKey = "6e5375abed4712485e0d625644275a1b"; // ضع مفتاحك هنا
  const url = `https://api.themoviedb.org/3/${type}/${movieId}?api_key=${apiKey}&language=en`;

  try {
    const response = await fetch(url);
    const movie = await response.json();

    document.getElementById("movie-details").innerHTML = `
      <h1>${movie.title || movie.name}</h1>
      <div class="all">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="desc">
      <p><strong>⭐ التقييم:</strong> ${movie.vote_average} / 10</p>
      <p><strong>📅 تاريخ الإصدار:</strong> ${movie.release_date}</p>
      <p><strong>🎭 الأنواع:</strong> ${movie.genres.map((g) => g.name).join(", ")}</p>
      
      <div class="add-trailer">
        <div class="add" id="addToWatchlist">
          <i class="fi fi-rr-bookmark"></i>
          Add to Watchlist
        </div>
        <div class="trailer" id="watchTrailer">Watch Trailer</div>
      </div>
      
      <p><strong>📖 القصة:</strong> ${movie.overview}</p>
      </div>
      </div>

      <!-- نافذة عرض التريلر -->
      <div id="trailerModal" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <iframe class="vd-tr" id="trailerVideo" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    `;
    document.body.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`;

    // برمجة زر "Add to Watchlist"
    document.getElementById("addToWatchlist").addEventListener("click", () => {
      let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      if (!watchlist.some((item) => item.id === movie.id)) {
        watchlist.push({ id: movie.id, title: movie.title, poster: movie.poster_path });
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("تمت إضافة الفيلم إلى قائمة المشاهدة ✅");
      } else {
        alert("الفيلم موجود بالفعل في قائمة المشاهدة! 🔥");
      }
    });

    // برمجة زر "Watch Trailer"
    document.getElementById("watchTrailer").addEventListener("click", async () => {
      const trailerUrl = `https://api.themoviedb.org/3/${type}/${movieId}/videos?api_key=${apiKey}&language=en`;
      const res = await fetch(trailerUrl);
      const data = await res.json();
      const trailer = data.results.find((video) => video.type === "Trailer");

      if (trailer) {
        document.getElementById("trailerVideo").src = `https://www.youtube.com/embed/${trailer.key}`;
        document.getElementById("trailerModal").style.display = "block";
      } else {
        alert("لم يتم العثور على تريلر لهذا الفيلم! ❌");
      }
    });

    // إغلاق نافذة التريلر
    document.querySelector(".close").addEventListener("click", () => {
      document.getElementById("trailerModal").style.display = "none";
      document.getElementById("trailerVideo").src = ""; // إيقاف الفيديو عند الإغلاق
    });

  } catch (error) {
    console.error("خطأ في جلب بيانات الفيلم:", error);
    alert("حدث خطأ، حاول مجددًا!");
  }

});
