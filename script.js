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
        const img = qrContainer.querySelector('img');
        if (img) {
            downloadBtn.style.display = 'inline-block';
            downloadBtn.onclick = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(function(blob) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'qrcode.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                }, 'image/png');
            };
        }
    }, 300);
});
