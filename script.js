
const container = document.getElementById('buttonContainer');
const statusDiv = document.getElementById('status');

// Configuration: List your 10 files here
const fileList = [
    'data1.txt', 'data2.txt', 'data3.txt', 'data4.txt', 'data5.txt',
    'data6.txt', 'data7.txt', 'data8.txt', 'data9.txt', 'data10.txt'
];

// 1. Generate the buttons dynamically
fileList.forEach((filename, index) => {
    const btn = document.createElement('button');
    btn.innerText = `Copy File ${index + 1}`; // Label: Copy File 1, Copy File 2...
    btn.className = 'btn';
    
    // Attach the click event to this specific button
    btn.onclick = () => handleFileAction(filename);
    
    container.appendChild(btn);
});

// 2. The Shared Function
async function handleFileAction(filename) {
    try {
        statusDiv.style.color = "#e67e22"; // Orange
        statusDiv.innerText = `Reading ${filename}...`;

        // Fetch
        const response = await fetch(filename);
        if (!response.ok) throw new Error(`Could not find ${filename}`);
        const text = await response.text();

        // Copy
        await navigator.clipboard.writeText(text);

        statusDiv.style.color = "#27ae60"; // Green
        statusDiv.innerText = "Copied! Closing tab...";

        // Close
        setTimeout(() => {
            window.close();
            // Fallback warning
            if (!window.closed) {
                statusDiv.innerText = "Browser blocked close. Use Launcher.";
            }
        }, 800);

    } catch (error) {
        console.error(error);
        statusDiv.style.color = "#c0392b"; // Red
        statusDiv.innerText = "Error: File missing or access denied.";
    }
}