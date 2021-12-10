// FetchSites.js

const URI = 'http://127.0.0.1:3001';


  export const  fetchTasks=async(number = 3 )=> {
    const axios = require('axios');
      // Make a request for a user with a given ID
    //tmpResult = await  axios.get(`${URI}/tasks`)    
     
    const data = await axios.get(`${URI}/tasks?number=${number}`)
    .then((response) =>{ return response.data}).catch((error) => {   console.log(error)})

    console.log(data)

    return data;
 
  }

  export const  putTasks=async(task)=> {
    console.log(task)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify(task);
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let r = URI + '/tasks';
    let responseJson= await fetch(r,requestOptions)
    .then((response) => response.json())
      //If response is in json then in success
    .then((responseJson) => {
      //Success 
      return  responseJson;
    })
      //If response is not in json then in error
    .catch((error) => {
      //Error 
      console.error(error);
    });
    return responseJson;
  } 


  