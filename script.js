document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const songCards = document.querySelectorAll(".song-card");
  const sortSelect = document.getElementById("sortSelect");
  const songGrid = document.getElementById("songGrid");

  // ==========================================
  // 1. LOGIKA FILTER CATEGORY (GENRE)
  // ==========================================
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Hilangkan class 'active' dari semua tombol
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Tambahkan class 'active' ke tombol yang diklik
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-category");

      // Filter item kartu lagu
      songCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.style.display = "block"; // Tampilkan
        } else {
          card.style.display = "none"; // Sembunyikan
        }
      });
    });
  });

  // ==========================================
  // 2. LOGIKA SORTING (URUTAN)
  // ==========================================
  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const cardsArray = Array.from(songCards);

    if (value === "title-asc") {
      // Urutkan A-Z berdasarkan Judul
      cardsArray.sort((a, b) => {
        const titleA = a.getAttribute("data-title").toLowerCase();
        const titleB = b.getAttribute("data-title").toLowerCase();
        return titleA.localeCompare(titleB);
      });
    } else if (value === "newest") {
      // Urutkan Tanggal Terbaru
      cardsArray.sort((a, b) => {
        const dateA = new Date(a.getAttribute("data-date"));
        const dateB = new Date(b.getAttribute("data-date"));
        return dateB - dateA;
      });
    }

    // Tempelkan kembali urutan kartu yang sudah disortir ke dalam Grid
    cardsArray.forEach((card) => songGrid.appendChild(card));
  });
});