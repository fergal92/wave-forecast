//This code is working and displays the first row data
// document.addEventListener('DOMContentLoaded', function () {
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//     const targetUrl = 'http://erddap.marine.ie/erddap/tabledap/IMI-WaveBuoyForecast.json?time,longitude,latitude,stationID,significant_wave_height,mean_wave_period,mean_wave_direction,wave_power_per_unit_crest_length,peak_period,energy_period';

//     fetch(proxyUrl + targetUrl)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             let rows = data.table.rows;

//             let m6Data = rows.find(row => row[3] === 'M6');
//             let m4Data = rows.find(row => row[3] === 'M4');
//             let m3Data = rows.find(row => row[3] === 'M3');


//             if (m6Data) displayBuoyData('m6-info', m6Data);
//             if (m4Data) displayBuoyData('m4-info', m4Data);
//             if (m3Data) displayBuoyData('m3-info', m3Data);
//         })
//         .catch(error => console.error('Error fetching data:', error));

//     function displayBuoyData(elementId, data) {
//         const info = `
//             Time: ${data[0]}<br>
//             Longitude: ${data[1]}<br>
//             Latitude: ${data[2]}<br>
//             Significant Wave Height: ${data[4]} meters<br>
//             Mean Wave Period: ${data[5]} seconds<br>
//             Mean Wave Direction: ${data[6]} degrees<br>
//             Wave Power: ${data[7]} kW/m<br>
//             Peak Period: ${data[8]} seconds<br>
//             Energy Period: ${data[9]} seconds
//         `;
//         document.getElementById(elementId).innerHTML = info;
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
    // Load the local JSON file
    fetch('IMI-WaveBuoyForecast_ff60_727a_2d06.json')
        .then(response => response.json())
        .then(data => {
            const rows = data.table.rows;
            const nearestRow = findNearestTime(rows);

            if (nearestRow) {
                displayBuoyData('m6-info', nearestRow.filter(row => row[3] === 'M6'));
                displayBuoyData('m4-info', nearestRow.filter(row => row[3] === 'M4'));
                displayBuoyData('m3-info', nearestRow.filter(row => row[3] === 'M3'));
            }
        })
        .catch(error => console.error('Error loading the JSON file:', error));

    function getCurrentTimeFormatted() {
        const currentTime = new Date();

        const year = currentTime.getUTCFullYear();
        const month = String(currentTime.getUTCMonth() + 1).padStart(2, '0');
        const day = String(currentTime.getUTCDate()).padStart(2, '0');
        const hours = String(currentTime.getUTCHours()).padStart(2, '0');
        const minutes = String(currentTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(currentTime.getUTCSeconds()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    function findNearestTime(dataRows) {
        const currentTime = getCurrentTimeFormatted();

        let nearestTimeRow = null;
        let smallestDifference = Infinity;

        dataRows.forEach(row => {
            const rowTime = row[0]; // Assuming the first element in each row is the time
            const difference = Math.abs(new Date(currentTime) - new Date(rowTime));

            if (difference < smallestDifference) {
                smallestDifference = difference;
                nearestTimeRow = row;
            }
        });

        return nearestTimeRow;
    }

    function displayBuoyData(elementId, row) {
        const info = `
            Time: ${new Date(row[0]).toLocaleString()}<br>
            Longitude: ${row[1]}<br>
            Latitude: ${row[2]}<br>
            Significant Wave Height: ${row[4]} meters<br>
            Mean Wave Period: ${row[5]} seconds<br>
            Mean Wave Direction: ${row[6]} degrees<br>
            Wave Power: ${row[7]} kW/m<br>
            Peak Period: ${row[8]} seconds<br>
            Energy Period: ${row[9]} seconds
        `;
        document.getElementById(elementId).innerHTML = info || 'No data available for this buoy.';
    }
});