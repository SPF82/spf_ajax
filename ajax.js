  let statesList = ['UNSET', 'OPENED', 'HEADERS_RECEIVED', 'LOADING', 'DONE'];
  let initialTime = 0;
  
  window.onload = function() {
    // Load the default value to the input field
    let source = document.getElementById('source');
    source.value = 'https://www.google.es/';
    // source.value = location.href;
    
    // Load the content when button is pressed
    document.getElementById('send').onclick = loadContent;
  }
  
  function loadContent() {
    // Clear previous data
    document.getElementById('contents').innerHTML = "";
    document.getElementById('states').innerHTML = "";
    document.getElementById('code').innerHTML = "";
    document.getElementById('headers').innerHTML = "";
    
    // Instance object
    if(window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    }
    
    request.onreadystatechange = showContent;
    
    // Request
    initialTime = new Date();
    let source = document.getElementById('source').value;
    request.open('GET', source+'?nocache='+Math.random(), true);
    request.send(null);
  }
  
  // Función de respuesta
  function showContent() {
    let finalTime = new Date();
    let miliseconds = finalTime - initialTime;
    
    let states = document.getElementById('states');
    states.innerHTML += request.readyState +" - [" + miliseconds + " ms.] " + statesList[request.readyState] + "<br/>";
    
    if(request.readyState == 4 && request.status == 200) {
      let contents = document.getElementById('contents');
        contents.innerHTML = request.responseText
      showHeaders();
      showStateCodes();
    }
  }
  
  function showHeaders() {
    let headers = document.getElementById('headers');
    headers.innerHTML = request.getAllResponseHeaders();
  }
  
  function showStateCodes() {
    let code = document.getElementById('code');
    code.innerHTML = request.status + " " + request.statusText;        
  }