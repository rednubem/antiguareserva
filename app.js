document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('search').value;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}+Chile`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const result = data[0];
                const lat = result.lat;
                const lon = result.lon;
                document.getElementById('result').innerHTML = `<p>Dirección: ${result.display_name}</p>`;
                showMap(lat, lon);
            } else {
                document.getElementById('result').innerHTML = '<p>No se encontraron resultados.</p>';
            }
        });
});

function showMap(lat, lon) {
    const map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([lat, lon]).addTo(map)
        .bindPopup('Ubicación de la viña')
        .openPopup();
}
