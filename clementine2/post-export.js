const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');
const targetDir = path.join(__dirname, 'out', 'clementine');

// Crée le dossier clementine si il n'existe pas
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir);
}

// Déplace tout le contenu de out/ sauf le dossier clementine lui-même
fs.readdirSync(outDir).forEach(file => {
  if (file !== 'clementine') {
    const oldPath = path.join(outDir, file);
    const newPath = path.join(targetDir, file);
    fs.renameSync(oldPath, newPath);
  }
});

console.log('✅ Contenu déplacé dans out/clementine');
