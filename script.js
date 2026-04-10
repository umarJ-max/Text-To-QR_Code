const input       = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const clearBtn    = document.getElementById('clear-btn');
const resultArea  = document.getElementById('result-area');
const qrContainer = document.getElementById('qrcode');
const downloadBtn = document.getElementById('download-btn');
const scannedText = document.getElementById('scanned-text');

clearBtn.addEventListener('click', () => {
  input.value = '';
  resultArea.classList.add('hidden');
  qrContainer.innerHTML = '';
  input.focus();
});

generateBtn.addEventListener('click', generate);
input.addEventListener('keydown', e => { if (e.key === 'Enter') generate(); });

function generate() {
  const text = input.value.trim();
  if (!text) {
    input.focus();
    input.style.borderColor = '#ff6b6b';
    setTimeout(() => { input.style.borderColor = ''; }, 1200);
    return;
  }

  qrContainer.innerHTML = '';
  resultArea.classList.add('hidden');

  new QRCode(qrContainer, {
    text: text,
    width: 240,
    height: 240,
    colorDark: '#1a1a2e',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {
    const qrCanvas = qrContainer.querySelector('canvas');
    const qrImg    = qrContainer.querySelector('img');

    if (qrCanvas || qrImg) {
      scannedText.textContent = text.length > 60 ? text.slice(0, 60) + '…' : text;
      resultArea.classList.remove('hidden');

      downloadBtn.onclick = function () {
        const canvas = document.createElement('canvas');
        const ctx    = canvas.getContext('2d');
        const pad    = 32;
        const qrSize = 240;
        canvas.width  = qrSize + pad * 2;
        canvas.height = qrSize + pad * 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (qrCanvas) {
          ctx.drawImage(qrCanvas, pad, pad, qrSize, qrSize);
        } else {
          ctx.drawImage(qrImg, pad, pad, qrSize, qrSize);
        }

        const dataURL  = canvas.toDataURL('image/png');
        const filename = text.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 40) + '_qr.png';
        const link     = document.createElement('a');
        link.href      = dataURL;
        link.download  = filename;
        link.click();
      };
    }
  }, 400);
}
