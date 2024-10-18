export const setNewOffset = (card, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export function autoGrow(textAreaRef) {
  const { current } = textAreaRef;
  current.style.height = "auto";
  current.style.height = current.scrollHeight + "px";
}

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 999;

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1;
    }
  });
};

export const validaEmail = (email) => {
  const regex = /^[^\s]+@[^\s]+\.[^\s]+$/;
  return regex.test(email);
};

export const bodyParser = (data) => {
  if (
    typeof data === "string" &&
    (data.startsWith("{") || data.startsWith("["))
  ) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.warn("Invalid JSON string:", data);
      return {}; // Retourne un objet vide ou un objet par défaut
    }
  }
  return data; // Retourne les données telles quelles si elles ne sont pas une chaîne ou une chaîne malformée
};
