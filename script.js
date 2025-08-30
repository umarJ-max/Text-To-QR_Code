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
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 400;
                canvas.height = 400;
                
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, 400, 400);
                
                const padding = 40;
                const qrSize = 320;
                
                if (qrCanvas) {
                    ctx.drawImage(qrCanvas, padding, padding, qrSize, qrSize);
                } else {
                    ctx.drawImage(qrImg, padding, padding, qrSize, qrSize);
                }
                
                const dataURL = canvas.toDataURL('image/png');
                const filename = text.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '_qrcode.png';
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = filename;
                link.click();
            };
        }
    }, 500);
});
