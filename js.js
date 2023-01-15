// Abrufe die Logindaten aus dem lokalen Speicher
const loginData = JSON.parse(localStorage.getItem("loginData"));

// Setze den Inhalt der Elemente mit den entsprechenden IDs auf die Logindaten
document.getElementById("one").textContent = `E-Mail: ${loginData.email}`;
document.getElementById("two").textContent = `Passwort: ${loginData.password}`;