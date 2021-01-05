// Action types
const ADD_COLLECTION = "ADD_COLLECTION";
const EDIT_ITEM = "EDIT_ITEM";
const DELETE_COLLECTION = "DELETE_COLLECTION";
const DELETE_ALL = "DELETE_ALL";

// Action creators
export const addCollection = (item) => {
  return (dispatch) => {
    dispatch({
      type: ADD_COLLECTION,
      payload: {
        item,
      },
    });
  };
};

export const editItem = (item) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_ITEM,
      payload: {
        item,
      },
    });
  };
};

export const deleteCollection = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_COLLECTION,
      payload: {
        item,
      },
    });
  };
};

export const deleteAll = (item) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ALL,
      payload: {
        item,
      },
    });
  };
};

// State
const initialState = {
  collection: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  if (action.type === ADD_COLLECTION) {
    let added = action.payload.item;
    let newCollection = [...state.collection];

    //look for duplicate first
    let duplicate = newCollection.find((item) => item.id === added.id);

    if (duplicate) {
      newCollection = newCollection.filter((f) => f.id !== added.id);
    } else {
      newCollection = [...newCollection, added];
    }
    return { ...state, collection: newCollection };
  }
  if (action.type === EDIT_ITEM) {
    let updatedCollection = action.payload.item;
    let newCollection = [...state.collection];
    const index = newCollection.findIndex(
      (item) => item.id === updatedCollection.id
    );
    newCollection[index] = newCollection;

    return { ...state, collection: newCollection };
  }

  if (action.type === DELETE_COLLECTION) {
    let collection = action.payload.item;
    let newCollection = [...state.collection];
    newCollection = newCollection.filter((c) => c.id !== collection.id);

    return { ...state, collection: newCollection };
  }
  if (action.type === DELETE_ALL) {
    return { collection: [] };
  }

  return state;
};

export default reducer;
