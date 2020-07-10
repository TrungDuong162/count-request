import axios from 'axios';
export const fetchData =  (res) =>{
    return {
    type: 'FETCH_DATA',
    data:res 
}

};

export const fetchDataFail =  (res) =>{

    return {
    type: 'FETCH_DATA_FAIL',
    data:res 
}

};


