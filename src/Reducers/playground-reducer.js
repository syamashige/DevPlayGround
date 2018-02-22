

const initialState = {
  isFetching: null,
  data: [],
  hasError: false,
  errorMessage: null
}


export default function (state = initialState, action) {

  switch(action.type){

    case "FETCHING_DATA":
      return state
    default:
      return state;
  }

}