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

    // ===== TABLE MATCHES =====
    if (tableBody && ligaSelect) {
      tableBody.innerHTML = '';
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.dataset.liga = row.LIGA || '';
        tr.innerHTML = `
          <td>${row.LIGA || ''}</td>
          <td>${row.PLAYER || ''}</td>
          <td>${row.TEAM ? `<img src="${row.TEAM}" alt="Logo" class="team-logo">` : ''} ${row.HOME || ''}</td>
          <td>${row.HOME || ''}</td>
          <td>${row.POOR || ''}</td>
          <td>${row.AWAY || ''}</td>
          <td>${row.LOGO_2 ? `<img src="${row.LOGO_2}" alt="Logo" class="team-logo">` : ''}</td>
          <td>${row.PLAYER_2 || ''}</td>
          <td>${row.REAL_SCORE || ''}</td>
          <td>${row.TOTAL_SCORE || ''}</td>
          <td>${row.WINNER || ''}</td>
        `;
        tableBody.appendChild(tr);
        ligaSet.add(row.LIGA || '');
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
        const value = ligaSel
