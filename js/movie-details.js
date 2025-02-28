document.addEventListener("DOMContentLoaded", async () => {
  const movieId = localStorage.getItem("selectedMovieId");
  if (!movieId) {
    alert("لا يوجد فيلم محدد!");
    window.location.href = "index.html"; // رجوع للصفحة الرئيسية
    return;
  }

  const apiKey = "6e5375abed4712485e0d625644275a1b"; // ضع مفتاحك هنا
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en`;

  try {
    const response = await fetch(url);
    const movie = await response.json();

    document.getElementById("movie-details").innerHTML = `
      <h1>${movie.title}</h1>
      <div class="all">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }">
      <div class="desc">
    
      <p><strong>⭐ التقييم:</strong> ${movie.vote_average} / 10</p>
      <p><strong>📅 تاريخ الإصدار:</strong> ${movie.release_date}</p>
      <p><strong>🎭 الأنواع:</strong> ${movie.genres
        .map((g) => g.name)
        .join(", ")}</p>
      <p><strong>📖 القصة:</strong> ${movie.overview}</p>
      </div>
      </div>

    `;
  } catch (error) {
    console.error("خطأ في جلب بيانات الفيلم:", error);
    alert("حدث خطأ، حاول مجددًا!");
  }
});
