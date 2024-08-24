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

export const formatDate = (value) => {
  // Remove todos os caracteres não numéricos
  const numbersOnly = value.replace(/\D/g, "");

  // Aplica a máscara
  return numbersOnly.replace(/^(\d{2})(\d{2})(\d{0,4})$/, "$1/$2/$3");

};

export const formatWhatsAppLink = (value) => {
  // Remove todos os caracteres que não são números
  const numbersOnly = value.replace(/\D/g, "");

  return numbersOnly;
};

export const formatSlackHandle = (value) => {
  // Remove qualquer caractere não alfabético antes do nome e garante o @ inicial
  let formattedValue = value.replace(/[^a-z.]/gi, "");

  if (!formattedValue.startsWith('@')) {
    formattedValue = '@' + formattedValue;
  }

  // Formata para garantir 3 letras antes do ponto, e uma ou mais após
  return formattedValue.replace(/^(@[a-z]{3})[^.]*\.?/i, '$1.');
};
