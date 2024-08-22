export const formatWhatsApp = (value) => {
    // Remove todos os caracteres não numéricos
    const numbersOnly = value.replace(/\D/g, "");
  
    // Aplica a máscara
    if (numbersOnly.length <= 10) {
      // Formato (51) 9740-2208
      return numbersOnly.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else {
      // Formato (51) 9 9740-2208
      return numbersOnly.replace(/^(\d{2})(\d)(\d{4})(\d{4})$/, "($1) $2 $3-$4");
    }
  };