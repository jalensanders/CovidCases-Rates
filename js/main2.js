mapboxgl.accessToken =
    'pk.eyJ1IjoiamFsZW5zYW5kZXJzIiwiYSI6ImNsZjBiYjI0MDA3aGwzeGxnbXk4bG9lNDAifQ.ow2dGWDrvp_70E1VNmg6GQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v11', // style URL
    center: [-100, 40], // starting position [lng, lat]
    zoom: 4, // starting zoom
    projection: 'albers'
});

async function geojsonFetch() {

let response = await fetch('assets/us-covid-2020-rates.json');
let rates = await response.json();

map.on('load', function loadingData() { 
    map.addSource('rates', {
        type: 'geojson',
        data: rates,
        });

        map.addLayer({
            'id': 'covid-rate',
            'type': 'fill',
            'source': 'rates',
            'paint': {
                'fill-color': [
                    'step',
                    ['get', 'rates'],
                    '#FFEDA0',   // stop_output_0
                    20,          // stop_input_0
                    '#FED976',   // stop_output_1
                    40,          // stop_input_1
                    '#FEB24C',   // stop_output_2
                    60,          // stop_input_2
                    '#FD8D3C',   // stop_output_3
                    80,          // stop_input_3
                    '#FC4E2A',   // stop_output_4
                    100,         // stop_input_4
                    '#E31A1C',   // stop_output_5
                ],
                'fill-outline-color':'#9e9e9e',
                'fill-opacity': 0.7,
            }
        
        });
    


const layers = [
    '0-19',
    '20-39',
    '40-59',
    '60-79',
    '80-99',
    '100 and more',
];
const colors = [
    '#FFEDA070',
    '#FED97670',
    '#FEB24C70',
    '#FD8D3C70',
    '#FC4E2A70',
    '#E31A1C70',
];

const legend = document.getElementById('legend');
legend.innerHTML =  "<b>COVID-19 Rates<br>(per 1000 people</br></b>";

layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
});

const source =
'<p style="text-align: right; font-size:10pt">Source: <a href="https://data.census.gov/table?g=0100000US$050000&d=ACS+5-Year+Estimates+Data+Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true">ACS</a></p>';

legend.innerHTML += source;



map.on('click', 'covid-rate', (event) => {
    console.log(event.features)
    new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates[0][0])
        .setHTML(`<strong>Rate:</strong> ${event.features[0].properties.rates}`)
        .addTo(map);
    });
});
}

geojsonFetch();