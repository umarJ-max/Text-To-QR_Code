document.getElementById('generate-btn').addEventListener('click', function() {
    const text = document.getElementById('text-input').value.trim();
    const qrContainer = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('download-btn');
    qrContainer.innerHTML = '';
    downloadBtn.style.display = 'none';
    if (!text) return;
    const qr = new QRCode(qrContainer, {
        text: text,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
    setTimeout(() => {
        const qrCanvas = qrContainer.querySelector('canvas');
        const qrImg = qrContainer.querySelector('img');
        
        if (qrCanvas || qrImg) {
            downloadBtn.style.display = 'inline-block';
            downloadBtn.onclick = function() {
                let dataURL;
                if (qrCanvas) {
                    dataURL = qrCanvas.toDataURL('image/png');
                } else {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = qrImg.width || 256;
                    canvas.height = qrImg.height || 256;
                    ctx.drawImage(qrImg, 0, 0);
                    dataURL = canvas.toDataURL('image/png');
                }
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'qrcode.png';
                link.click();
            };
        }
    }, 500);
});
