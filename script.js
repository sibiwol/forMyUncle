// 'use strict'

// let xhr = new XMLHttpRequest();
// let url =
//   "http://openapi.seoul.go.kr:8088/684d77555a797539353654426b5366/xml/bigKcyPlatPlcInfo/1/5/"; /*URL*/
// xhr.open("GET", url);
// xhr.onreadystatechange = function () {
//   if (this.readyState === xhr.DONE) {
//     // <== 정상적으로 준비되었을때
//     if (xhr.status === 200 || xhr.status === 201) {
//       // <== 호출 상태가 정상적일때
//       alert(
//         "Status: " +
//           this.status +
//           "\nHeaders: " +
//           JSON.stringify(this.getAllResponseHeaders()) +
//           "\nBody: " +
//           this.responseText
//       );
//     }
//   }
// };
// xhr.send("");
  $.ajax( {
    type: "GET", 
    url: "http://openapi.seoul.go.kr:8088/684d77555a797539353654426b5366/xml/bigKcyPlatPlcInfo/1/5/",
    data: {},
    success: function(response) {
      console.log(response)
    }
  })