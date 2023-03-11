mapboxgl.accessToken =
    'pk.eyJ1IjoiamFsZW5zYW5kZXJzIiwiYSI6ImNsZjBiYjI0MDA3aGwzeGxnbXk4bG9lNDAifQ.ow2dGWDrvp_70E1VNmg6GQ';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-100, 40], // starting position [lng, lat]
    zoom: 4, // starting zoom
    projection: 'albers'
});
//load data to the map as new layers.
//map.on('load', function loadingData() {
map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function
    map.addSource('counts', {
        type: 'geojson',
        data: 'assets/us-covid-2020/us-covid-2020-counts.json'
        });
        map.addLayer({
            'id': 'covid-count',
            'type': 'circle',
            'source': 'counts',
            'paint': {
            // increase the radii of the circle as the zoom level and dbh value increases
            'circle-radius': {
                'property': 'cases',
                'stops': [
                    [grades[0], radii[0]],
                    [grades[1], radii[1]],
                    [grades[2], radii[2]]
                    ]
                },
            'circle-color': {
                'property': 'cases',
                'stops': [
                    [grades[0], colors[0]],
                    [grades[1], colors[1]],
                    [grades[2], colors[2]]
                    ]
                },
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                'circle-opacity': 0.6
            }
        }
    );
    
});
const grades = [6000, 12000, 18000],
    colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
    radii = [4, 8, 12];
    
map.on('click', 'covid-count', (event) => {
    new mapboxgl.Popup()
        .setLngLat(event.features[0].geometry.coordinates)
        .setHTML('<strong>Cases:</strong> ${event.features[0].properties.cases}')
        .addTo(map);
    });
// create legend
const legend = document.getElementById('legend');

//set up legend grades and labels
var labels = ['<strong>Cases</strong>'],
    vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    // you need to manually adjust the radius of each dot on the legend 
    // in order to make sure the legend can be properly referred to the dot on the map.
    dot_radius = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radius +
        'px; height: ' +
        dot_radius + 'px; "></i> <span class="dot-label" style="top: ' + dot_radius / 2 + 'px;">' + vbreak +
        '</span></p>');

}

const source =
    '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv%22%3ENYTimes</a></p>';

// combine all the html codes.
legend.innerHTML = labels.join('') + source;