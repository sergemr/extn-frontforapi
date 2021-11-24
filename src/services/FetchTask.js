// FetchSites.js

const URI = 'http://127.0.0.1:3000';

const exportedObject = {
  async fetchTasks(number = 3) {
    let r = URI + '/tasks?number='+number;
    let responseJson= await fetch(r, 
      {
        method: 'GET',
        headers: 
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
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
  },

  async putTasks(task) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify(task);
    
    var requestOptions = {
      method: 'POST',
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
};
export default exportedObject;