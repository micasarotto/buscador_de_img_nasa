document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value;
    const url = `https://images-api.nasa.gov/search?q=${query}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayImages(data.collection.items);
    })
    .catch(error => console.log('Error:', error));
});

function displayImages(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';  // Limpiar resultados anteriores

    if (items.length === 0) {
        contenedor.innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        const imageUrl = item.links ? item.links[0].href : 'https://via.placeholder.com/300';

        const card = `
            <div class="col-md-4">
                <div class="card mb-4 d-flex flex-column" style="height: 420px; overflow: hidden;"> <!-- Tarjeta con altura fija y overflow oculto -->
                    <img src="${imageUrl}" class="card-img-top img-fluid" style="height: 200px; object-fit: cover;" alt="${title}">
                    <div class="card-body d-flex flex-column flex-grow-1"> <!-- Permitir que el cuerpo crezca -->
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text overflow-auto" style="max-height: 100px;">${description ? description : 'No description available.'}</p>                        
                        <p class="card-text mt-auto mb-0"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p> <!-- Mantener fecha al final y sin margen inferior -->
                    </div>
                </div>
            </div>
        `;

        contenedor.innerHTML += card;
    });
}