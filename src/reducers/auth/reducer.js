export const api = (state = {}, action = {}) => {
  const { type, code } = action;
  switch(type) {
    case actionTypes.AUTHENTICATE:
      return { code };
  }
  return state;
}
