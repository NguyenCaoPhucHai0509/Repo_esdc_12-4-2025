import {
  GET_SCHEDULE,
  UPDATE_SCHEDULE,
  ADD_SCHEDULE_ITEM,
  DELETE_SCHEDULE_ITEM,
  SCHEDULE_ERROR,
  CLEAR_SCHEDULE,
  SET_LOADING,
  CLEAR_ERRORS
} from './types';

const scheduleReducer = (state, action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: action.payload.schedule,
        trainerId: action.payload.trainerId,
        loading: false,
        error: null
      };
    case UPDATE_SCHEDULE:
      return {
        ...state,
        schedule: action.payload.schedule,
        loading: false,
        error: null
      };
    case ADD_SCHEDULE_ITEM:
      return {
        ...state,
        schedule: [...state.schedule, action.payload.scheduleItem],
        loading: false,
        error: null
      };
    case DELETE_SCHEDULE_ITEM:
      return {
        ...state,
        schedule: state.schedule.filter(
          item => item._id !== action.payload.scheduleId
        ),
        loading: false,
        error: null
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case CLEAR_SCHEDULE:
      return {
        ...state,
        schedule: [],
        trainerId: null,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default scheduleReducer;