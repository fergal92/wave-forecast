// document.addEventListener('DOMContentLoaded', function() {
//     // Load the local JSON file
//     fetch('IMI-WaveBuoyForecast_ff60_727a_2d06.json')
//         .then(response => response.json())
//         .then(data => {
//             const rows = data.table.rows;

//             // Filter and display data for each buoy
//             const buoys = ['M6', 'M4', 'M3'];
//             buoys.forEach(buoyID => {
//                 const buoyRows = rows.filter(row => row[3] === buoyID); // Filter rows by buoy ID
//                 const nearestRow = findNearestTime(buoyRows);
                
//                 if (nearestRow) {
//                     displayBuoyData(`${buoyID.toLowerCase()}-info`, nearestRow);
//                 } else {
//                     document.getElementById(`${buoyID.toLowerCase()}-info`).innerHTML = `No data available for buoy ${buoyID}.`;
//                 }
//             });
//         })
//         .catch(error => console.error('Error loading the JSON file:', error));

//     function getCurrentTimeFormatted() {
//         const currentTime = new Date();

//         const year = currentTime.getUTCFullYear();
//         const month = String(currentTime.getUTCMonth() + 1).padStart(2, '0');
//         const day = String(currentTime.getUTCDate()).padStart(2, '0');
//         const hours = String(currentTime.getUTCHours()).padStart(2, '0');
//         const minutes = String(currentTime.getUTCMinutes()).padStart(2, '0');
//         const seconds = String(currentTime.getUTCSeconds()).padStart(2, '0');

//         return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
//     }

//     function findNearestTime(dataRows) {
//         const currentTime = getCurrentTimeFormatted();

//         let nearestTimeRow = null;
//         let smallestDifference = Infinity;

//         dataRows.forEach(row => {
//             const rowTime = row[0]; // Accessing the time at index 0
//             const difference = Math.abs(new Date(currentTime) - new Date(rowTime));

//             if (difference < smallestDifference) {
//                 smallestDifference = difference;
//                 nearestTimeRow = row;
//             }
//         });

//         return nearestTimeRow;
//     }

//     function displayBuoyData(elementId, row) {
//         if (!row || row.length === 0) {
//             document.getElementById(elementId).innerHTML = 'No data available for this buoy.';
//             return;
//         }

//         const info = `
//             Time: ${new Date(row[0]).toLocaleString()}<br>
//             Longitude: ${row[1]}<br>
//             Latitude: ${row[2]}<br>
//             Significant Wave Height: ${row[4]} meters<br>
//             Mean Wave Period: ${row[5]} seconds<br>
//             Mean Wave Direction: ${row[6]} degrees<br>
//             Wave Power: ${row[7]} kW/m<br>
//             Peak Period: ${row[8]} seconds<br>
//             Energy Period: ${row[9]} seconds
//         `;
//         document.getElementById(elementId).innerHTML = info;
//     }
// });
// This code is working and shows the nearest time like a live feed would do

document.addEventListener('DOMContentLoaded', function() {
    // Load the local JSON file
    fetch('IMI-WaveBuoyForecast_ff60_727a_2d06.json')
        .then(response => response.json())
        .then(data => {
            const rows = data.table.rows;

            // Buoy IDs to filter and display
            const buoys = ['M6', 'M4', 'M3'];

            // Iterate over each buoy ID
            buoys.forEach(buoyID => {
                // Filter rows for the specific buoy ID
                const buoyRows = rows.filter(row => row[3] === buoyID); // Assuming row[3] is the buoy ID

                if (buoyRows.length > 0) {
                    // Select every sixth entry
                    const selectedRows = selectEverySixthEntry(buoyRows);

                    // Display the selected data
                    displayAllBuoyData(`${buoyID.toLowerCase()}-info`, selectedRows);
                } else {
                    // Display a message if no data is available for the buoy
                    document.getElementById(`${buoyID.toLowerCase()}-info`).innerHTML = `No data available for buoy ${buoyID}.`;
                }
            });
        })
        .catch(error => console.error('Error loading the JSON file:', error));

    // Function to select every sixth entry from the data rows
    function selectEverySixthEntry(dataRows) {
        const selectedRows = [];
        for (let i = 0; i < dataRows.length; i += 6) {
            selectedRows.push(dataRows[i]);
        }
        return selectedRows;
    }

    // Function to display all buoy data
    function displayAllBuoyData(elementId, buoyRows) {
        let info = '';
        buoyRows.forEach(row => {
            info += `
                <div>
                    <strong>Time:</strong> ${row[0]}<br> <!-- Directly using the original time from the data -->
                    <strong>Longitude:</strong> ${row[1]}<br>
                    <strong>Latitude:</strong> ${row[2]}<br>
                    <strong>Significant Wave Height:</strong> ${row[4]} meters<br>
                    <strong>Mean Wave Period:</strong> ${row[5]} seconds<br>
                    <strong>Mean Wave Direction:</strong> ${row[6]} degrees<br>
                    <strong>Wave Power:</strong> ${row[7]} kW/m<br>
                    <strong>Peak Period:</strong> ${row[8]} seconds<br>
                    <strong>Energy Period:</strong> ${row[9]} seconds<br><br>
                </div>
                <hr>
            `;
        });

        // Set the inner HTML of the element to display the buoy data
        document.getElementById(elementId).innerHTML = info;
    }
});





