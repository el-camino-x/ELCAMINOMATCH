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

// ===== LEADERBOARD HOME =====
const leaderboardURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTkFDJVcyrG3EY9rv4jBvQc7JOAHAy9CsCMIFEB0oM1N3Afqi5ZuJCk5TD1hXKkFkMjq4VMEl3gHygg/pub?gid=1213844965&single=true&output=csv";
const leaderboardBody = document.querySelector('#leaderboard-table tbody');

if (leaderboardBody) {
  Papa.parse(leaderboardURL, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      const data = results.data;

      // Pastikan angka POINT, MATCHES, WIN, DRAW, LOSE jadi number
      data.forEach(row => {
        row.MATCHES = Number(row.MATCHES) || 0;
        row.WIN = Number(row.WIN) || 0;
        row.DRAW = Number(row.DRAW) || 0;
        row.LOSE = Number(row.LOSE) || 0;
        row.POINT = Number(row.POINT) || 0;
      });

      // Sort descending by POINT
      data.sort((a,b) => b.POINT - a.POINT);

      // Inject ke table
      leaderboardBody.innerHTML = '';
      data.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${row.NAMA || ''}</td>
          <td>${row.MATCHES}</td>
          <td>${row.WIN}</td>
          <td>${row.DRAW}</td>
          <td>${row.LOSE}</td>
          <td>${row.POINT}</td>
        `;
        leaderboardBody.appendChild(tr);
      });
    },
    error: function(err) {
      console.error("Gagal load leaderboard CSV:", err);
    }
  });
}

