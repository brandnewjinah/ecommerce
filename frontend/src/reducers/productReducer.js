// Action types
const ADD_FASHION = "ADD_FASHION";

// Action creators
export const likeItem = (movie) => {
  return (dispatch) => {
    dispatch({
      type: ADD_FASHION,
      payload: {
        movie,
      },
    });
  };
};

// State
const initialState = {
  fashion: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_FASHION) {
    let added = action.payload.movie;
    let newFashion = [...state.fashion];

    //look for duplicate first
    let duplicate = newFashion.find((item) => item.id === added.id);

    if (duplicate) {
      newFashion = newFashion.filter((f) => f.id !== added.id);
    } else {
      newFashion = [...newFashion, added];
    }
    return { ...state, fashion: newFashion };
  }

  return state;
};

export default reducer;
