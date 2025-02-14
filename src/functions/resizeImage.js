export default function resizeImage(file, maxWidth, callback) {
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target.result;
  
      img.onload = function() {
        const aspectRatio = img.width / img.height;
        const width = maxWidth;
        const height = maxWidth / aspectRatio; // Mantém a proporção
  
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
  
        const ctx = canvas.getContext("2d");
  
        // Ativar interpolação de imagem para manter qualidade
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
  
        ctx.drawImage(img, 0, 0, width, height);
  
        // Converter para WebP mantendo alta qualidade
        canvas.toBlob(callback, "image/webp", 1.0); // Qualidade máxima
      };
    };
  }
  