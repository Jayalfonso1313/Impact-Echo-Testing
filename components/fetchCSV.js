import Papa from 'papaparse';

export async function fetchCSV(url) {
  try {
    // console.log("Fetching CSV from URL:", url);

    // Fetch the CSV file from the provided URL
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch CSV: ${response.statusText}');
    }

    // Read the response as text
    const text = await response.text();

    // Parse the CSV text using PapaParse
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: false, // Assuming no header row, since you want to skip the first row
        complete: (result) => {
          // Extracting the relevant columns assuming 'time' and 'amplitude' are columns 0 and 1
          const data = result.data.slice(1); // Remove the first row
          const time = [];
          const amplitude = [];

          // Iterate through the data to extract time and amplitude
          data.forEach((row) => {
            const timeValue = parseFloat(row[0]);
            const amplitudeValue = parseFloat(row[1]);

            // Check for NaN values and skip them
            if (!isNaN(timeValue) && !isNaN(amplitudeValue)) {
              time.push(timeValue);
              amplitude.push(amplitudeValue);
            }
          });

          // Print the shape (length) of time and amplitude arrays
          // console.log("Shape of time array:", time.length);
          // console.log("Shape of amplitude array:", amplitude.length);

          resolve({ time, amplitude });
        },
        error: (error) => reject(error),
      });
    });
  } catch (error) {
    // console.error("Error fetching or parsing CSV:", error);
    throw error; // Rethrow the error to handle it further up the chain
  }
}