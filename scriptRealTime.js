document.addEventListener('DOMContentLoaded', function() {
    fetch('IWBNetwork_e389_57d5_9804.json')
        .then(response => response.json())
        .then(data => {
            const rows = data.table.rows;
            const buoys = ['M6', 'M4', 'M3'];

            buoys.forEach(buoyID => {
                // Filter rows by buoy ID
                const buoyRows = rows.filter(row => row[0] === buoyID);
                
                // Get the last row for each buoy
                const lastRow = buoyRows[buoyRows.length - 1];
                
                // Display the last row data in a new section
                displayLastBuoyData(`${buoyID.toLowerCase()}-latest-info`, lastRow);
            });
        })
        .catch(error => console.error('Error loading the JSON file:', error));

    function displayLastBuoyData(elementId, row) {
        if (!row || row.length === 0) {
            document.getElementById(elementId).innerHTML = 'No recent data available for this buoy.';
            return;
        }

        const info = `
        <strong>Latest Data for Buoy ${row[0]}:</strong><br>
        Time: ${row[3]}<br>
        Longitude: ${row[1]} degrees_east<br>
        Latitude: ${row[2]} degrees_north<br>
        Atmospheric Pressure: ${row[4]} millibars<br>
        Wind Direction: ${row[5]} degrees true<br>
        Wind Speed: ${row[6]} knots<br>
        Gust: ${row[7]} knots<br>
        Wave Height: ${row[8]} meters<br>
        Wave Period: ${row[9]} seconds<br>
        Mean Wave Direction: ${row[10]} degrees true<br>
        Hmax: ${row[11]} meters<br>
        Air Temperature: ${row[12]} degrees_C<br>
        Dew Point: ${row[13]} degrees_C<br>
        Sea Temperature: ${row[14]} degrees_C<br>
        Relative Humidity: ${row[15]} percent<br>
        QC Flag: ${row[16]}
    `;
        document.getElementById(elementId).innerHTML = info;
    }
});
