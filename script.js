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

// ===== MATCHES DATA =====
const csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT7c6Nn46_FqX3jOIJW5JIfwOwn6d8IoJczjSDjcgiyEKVaVpQttgNO54_RDJQblo0SRfB8Ksafs4Ab/pub?gid=1735155149&single=true&output=csv";
const tableBody = document.querySelector('#matches-table tbody');
const ligaSelect = document.getElementById('liga-select');
const leaderboardBody = document.querySelector('#leaderboard-table tbody');

Papa.parse(csvURL, {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: function(results) {
    const data = results.data;
    let ligaSet = new Set();
    if (tableBody && ligaSelect) {
      tableBody.innerHTML = '';

      data.forEach(row => {
        const liga = row.LIGA || '';
        const player1 = row.PLAYER || '';
        const logo1 = row.TEAM || '';
        const team1 = row.HOME || '';
        const poor = row.POOR || '';
        const team2 = row.AWAY || '';
        const logo2 = row.LOGO_2 || '';
        const player2 = row.PLAYER_2 || '';
        const realScore = row.REAL_SCORE || '';
        const totalScore = row.TOTAL_SCORE || '';
        const winner = row.WINNER || '';

        const tr = document.createElement('tr');
        tr.dataset.liga = liga;
        tr.innerHTML = `
          <td>${liga}</td>
          <td>${player1}</td>
          <td>${logo1 ? `<img src="${logo1}" alt="Logo" class="team-logo">` : ''} ${team1}</td>
          <td>${team1}</td>
          <td>${poor}</td>
          <td>${team2}</td>
          <td>${logo2 ? `<img src="${logo2}" alt="Logo" class="team-logo">` : ''}</td>
          <td>${player2}</td>
          <td>${realScore}</td>
          <td>${totalScore}</td>
          <td>${winner}</td>
        `;
        tableBody.appendChild(tr);
        ligaSet.add(liga);
      });

      // Filter Liga
      ligaSelect.innerHTML = '<option value="All">All</option>';
      Array.from(ligaSet).forEach(liga => {
        const option = document.createElement('option');
        option.value = liga;
        option.textContent = liga;
        ligaSelect.appendChild(option);
      });

      ligaSelect.addEventListener("change", () => {
        const value = ligaSelect.value;
        const tableRows = document.querySelectorAll("#matches-table tbody tr");
        tableRows.forEach(row => {
          row.style.display = (value === "All" || row.dataset.liga === value) ? "" : "none";
        });
      });
    }

    // ===== LEADERBOARD AUTO HITUNG =====
    if (leaderboardBody) {
      const leaderboard = {};

      // Hitung MATCHES, WIN, DRAW, LOSE, POINT
      data.forEach(row => {
        const players = [
          {name: row.PLAYER, winner: row.WINNER, loser: row.LOSER, draw: row.DRAW},
          {name: row.PLAYER_2, winner: row.WINNER, loser: row.LOSER, draw: row.DRAW}
        ];

        players.forEach(p => {
          if (!p.name) return;
          if (!leaderboard[p.name]) {
            leaderboard[p.name] = {MATCHES:0, WIN:0, DRAW:0, LOSE:0, POINT:0};
          }

          leaderboard[p.name].MATCHES += 1;

          if (p.draw && p.draw.toUpperCase() === "DRAW") {
            leaderboard[p.name].DRAW += 1;
            leaderboard[p.name].POINT += 1; // draw = 1
          } else if (p.name === row.WINNER) {
            leaderboard[p.name].WIN += 1;
            leaderboard[p.name].POINT += 3; // win = 3
          } else if (p.name === row.LOSER) {
            leaderboard[p.name].LOSE += 1;
            leaderboard[p.name].POINT += 0; // lose = 0
          }
        });
      });

      // Convert ke array & sort descending by POINT
      const leaderboardArray = Object.keys(leaderboard).map(name => ({
        NAMA: name,
        ...leaderboard[name]
      })).sort((a,b)=>b.POINT - a.POINT);

      // Inject ke table
      leaderboardBody.innerHTML = '';
      leaderboardArray.forEach((row, index)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${row.NAMA}</td>
          <td>${row.MATCHES}</td>
          <td>${row.WIN}</td>
          <td>${row.DRAW}</td>
          <td>${row.LOSE}</td>
          <td>${row.POINT}</td>
        `;
        leaderboardBody.appendChild(tr);
      });
    }
  }
});
