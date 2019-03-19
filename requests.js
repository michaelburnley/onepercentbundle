const xhr = new XMLHttpRequest();

const request = (url, type = 'GET', params = {}) => {
    xhr.open(type, link);
    if(type == 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    xhr.onload = function() {
        if (xhr.status === 200) {
            alert('User\'s name is ' + xhr.responseText);
        }
        else {
            alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send();
}


// var newName = 'John Smith',
//     xhr = new XMLHttpRequest();

// xhr.open('POST', 'myservice/username?id=some-unique-id');
// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// xhr.onload = function() {
//     if (xhr.status === 200 && xhr.responseText !== newName) {
//         alert('Something went wrong.  Name is now ' + xhr.responseText);
//     }
//     else if (xhr.status !== 200) {
//         alert('Request failed.  Returned status of ' + xhr.status);
//     }
// };
// xhr.send(encodeURI('name=' + newName));