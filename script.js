// ===== LOGIN =====
const PASSWORD = "siaptugas";
const loginBtn = document.getElementById("loginBtn");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");

if (loginBtn && passwordInput && errorMsg) {
  loginBtn.addEventListener("click", () => {
    const enteredPassword = passwordInput.value.trim();
    if (enteredPassword === PASSWORD) {
      window.location.href = "home.html";
    } else {
      errorMsg.textContent = "Password salah! Coba lagi.";
      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") loginBtn.click();
  });
}

// ===== MATCHES DATA (KOSONG DULU) =====
const tableBody = document.querySelector('#matches-table tbody');
const ligaSelect = document.getElementById('liga-select');

if (tableBody && ligaSelect) {
  // Kosong dulu, siap diisi nanti
  tableBody.innerHTML = '';
  ligaSelect.innerHTML = '<option value="All">All</option>';

  // Event filter liga (meskipun kosong)
  ligaSelect.addEventListener("change", () => {
    const value = ligaSelect.value;
    const tableRows = document.querySelectorAll("#matches-table tbody tr");
    tableRows.forEach(row => {
      row.style.display = (value === "All" || row.dataset.liga === value) ? "" : "none";
    });
  });
}

// ===== LEADERBOARD (KOSONG UNTUK HOME) =====
const leaderboardBody = document.querySelector('#leaderboard-table tbody');
if (leaderboardBody) {
  leaderboardBody.innerHTML = '';
  // nanti bisa diisi logic auto hitung atau hardcode data
}
