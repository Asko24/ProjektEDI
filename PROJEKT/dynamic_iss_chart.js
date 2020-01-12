    // Fetching API
    const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
    let firstTime = true;

    // Getting data from json

    async function getData() {
        const response = await fetch(api_url);
        const data = await response.json();
        const { latitude, longitude, altitude } = data;


        document.getElementById('lat').textContent = latitude.toFixed(2);
        document.getElementById('long').textContent = longitude.toFixed(2);
        document.getElementById('alt').textContent = altitude.toFixed(2);
    }

    getData();
    setInterval(getData, 2000);

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(
        ctx,
        {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset 
            data:
            {
                labels: [],
                datasets:
                    [{
                        label: "The current altitude of ISS in km's (refreshing every 2 seconds)",
                        fill: false,
                        backgroundColor: '#000',
                        borderColor: '#2badc2',
                        data: []
                    }]
            },

            // Configuration options go here
            options: {}
        });


    var altitudeCount = '0';
    function updateChart() {
        // Adds a label per updateChart()
        chart.data.labels.push("#" + altitudeCount)
        // Setting the value to current altitude from json file
        chart.data.datasets[0].data = chart.data.datasets[0].data.concat(document.getElementById('alt').textContent);

        chart.update();
        altitudeCount++;
    };

    // Chart autoupdate
    setInterval(updateChart, 2000);