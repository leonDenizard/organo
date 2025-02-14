export function resizeImageFromUrl(imageUrl, maxWidth) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Permite redimensionar imagens externas
      img.src = imageUrl;
  
      img.onload = function () {
        const canvas = document.createElement("canvas");
        let width = maxWidth; 
        let height = (img.height / img.width) * maxWidth; // Mantém a proporção
  
        canvas.width = width;
        canvas.height = height;
  
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(
          (blob) => {
            const newUrl = URL.createObjectURL(blob);
            resolve(newUrl);
          },
          "image/webp",
          0.9
        );
      };
  
      img.onerror = reject;
    });
  }
  