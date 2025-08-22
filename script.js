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
                const link = document.createElement('a');
                link.href = img.src;
                link.download = 'qrcode.png';
                link.click();
            };
        }
    }, 300);
});
