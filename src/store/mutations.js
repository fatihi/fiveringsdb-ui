export const openCardModale = (state, payload) => {
  state.cardModale = payload.card;
  state.setFocus = payload.setFocus;
};

export const closeCardModale = state => {
  state.cardModale = null;
};

export const changeCardPopover = (state, card) => {
  state.cardPopover = card;
};

export const changeDocumentTitle = (state, title) => {
  state.documentTitle = title;
};

export const touchDevice = (state, isTouchDevice) => {
  state.touchDevice = isTouchDevice;
};
