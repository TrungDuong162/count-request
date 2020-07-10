const initialState = {
    countSuccess: 0,
    total:0,
    countFail: 0, 
    people: [],
    failReq: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case "FETCH_DATA": {
        let data = [];
      let failReq = []
      action.data.forEach(element => {
        if(!element.status) data.push(element);
        else failReq.push(element);
      });

      return {
        ...state,
        people: [...data],
        failReq : [...failReq],
        countSuccess: data.length,
        countFail: failReq.length,
        total: data.length + failReq.length,

      };
      }
      case "FETCH_DATA_FAIL": {
        let data = [];
      let failReq = []
      action.data.forEach(element => {
        if(!element.status) data.push(element);
        else failReq.push(element);
      });

      return {
        ...state,
        people: [...state.people,...data],
        failReq : [...failReq],
        countSuccess: data.length,
        countFail: failReq.length,
        total: data.length + failReq.length,

      };
      }
     
      default: return state;
    }
}