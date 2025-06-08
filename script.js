// For generating QR Code using API
function generateQR() {
  const input = document.getElementById('qr').value;
  const img = document.getElementById('qrimg');

  if(!input.trim()) {
    alert("Please enter a URL or text to generate a QR Code.");
    return;
  }

  img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(input)}`;
}

// For downloading the img
async function downloadQR() {
  const img = document.getElementById('qrimg');
  const qrURL = img.src;

  if (!qrURL || !qrURL.includes("create-qr-code")) {
    alert("Please generate a QR Code first.");
    return;
  }

    try {
      const response = await fetch(qrURL);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl); // Clean up memory

    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download the QR code. Please try again.");
    }
}