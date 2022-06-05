// googleapis npm 설치
// https://developers.google.com/sheets/api/quickstart/nodejs 
const {google} = require("googleapis")

// 비공계키 받아오기
// https://console.cloud.google.com/apis/dashboard?project=seoul-building-permit-address
const keys = require("../비공계키.json")

const client = new google.auth.JWT(
  keys.client_email, 
  null, 
  keys.private_key, 
  // scope 받아오는 곳
  // https://developers.google.com/identity/protocols/oauth2/scopes
  ['https://www.googleapis.com/auth/spreadsheets']
)

// client 승인이 나면 실행됨
client.authorize((err, tokens) => {
  if(err) {
    console.error(err)
    return;
  } else {
    get서울시법정동리스트Sheet(client).then(list => {
      get법정동코드(client)
      .then(code => {
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < code.length; j++) {
            if (list[i][1] == code[j] ) {
              let addressArr = []
              addressArr.push(list[i][2]) // 주소시트 순서대로 들어감
              put법정동주소(client, addressArr)
            }
          }
        }
      })
    })
    // update법정동주소(client)
    // update주소(client)
}})

// 주소 시트 M2에 법정동주소 넣는다. 
async function put법정동주소(cl, 주소) {
  console.log(주소)
  const gsapi = google.sheets({version: "v4", auth: cl})
  const readOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    // range: '주소!A2:M2056'
    range: '주소!A18:M25'
  }

  // read
  let apiData = await gsapi.spreadsheets.values.get(readOptions)
  const apiArray = apiData.data.values
  let 법정동코드전체Array = apiArray.map((data) => {
    let 법정동코드전체Arr = []
    법정동코드전체Arr.push(`${data[12]} ${data[7]}-${data[8]}`)
    return 법정동코드전체Arr
  })

  // update
  const updateOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    range: '주소!m2',
    valueInputOption: 'USER_ENTERED',
    resource: { values: [['서울특별시 종로구 효자동'], ['서울특별시 종로구 창성동']]}
    // resource: { values: [].push(주소)}
  }

  let res = await gsapi.spreadsheets.values.update(updateOptions)
}

// 서울시 법정동 리스트 시트 안의 values를 서울시법정동리스트Array 안에 담기
async function get서울시법정동리스트Sheet(cl){
  const gsapi = google.sheets({version: "v4", auth: cl})
  const readOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    // range: '서울시 법정동 리스트!A2:c494'
    range: '서울시 법정동 리스트!A2:c494'
  }

  // read
  let 서울시법정동리스트 = await gsapi.spreadsheets.values.get(readOptions)
  const 서울시법정동리스트Array = 서울시법정동리스트.data.values
  return 서울시법정동리스트Array
}

async function get법정동코드(cl){
  const gsapi = google.sheets({version: "v4", auth: cl})
  const readOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    // range: '주소!A1:k2056'
    // range: '주소!k2:k2056'
    range: '주소!k2:k100'
  }

  // read
  let 법정동코드 = await gsapi.spreadsheets.values.get(readOptions)
  const 법정동코드Array = 법정동코드.data.values
  return 법정동코드Array
}



//-----------------------------------
// 주소 시트 
async function update법정동주소(cl){
  const gsapi = google.sheets({version: "v4", auth: cl})
  const readOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    // range: '주소!A2:I2056'
    range: '주소!A2:I20'
  }

  // read
  let apiData = await gsapi.spreadsheets.values.get(readOptions)
  const apiArray = apiData.data.values

  let 법정동코드전체Array = apiArray.map((data) => {
    data.push(`${data[4]}${data[5]}`)
    let 법정동코드전체Arr = []
    법정동코드전체Arr.push(data[9])
    return 법정동코드전체Arr
  })


  // update
  const updateOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    range: '주소!K2',
    valueInputOption: 'USER_ENTERED',
    resource: { values: 법정동코드전체Array }
  }

  let res = await gsapi.spreadsheets.values.update(updateOptions)
}

async function update주소(cl) {
  const gsapi = google.sheets({version: "v4", auth: cl})
  const readOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    // range: '주소!A2:M2056'
    range: '주소!A18:M25'
  }

  // read
  let apiData = await gsapi.spreadsheets.values.get(readOptions)
  const apiArray = apiData.data.values
  let 법정동코드전체Array = apiArray.map((data) => {
    let 법정동코드전체Arr = []
    법정동코드전체Arr.push(`${data[12]} ${data[7]}-${data[8]}`)
    // console.log(법정동코드전체Arr)
    return 법정동코드전체Arr
  })

  // update
  const updateOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    range: '주소!O18',
    valueInputOption: 'USER_ENTERED',
    resource: { values: 법정동코드전체Array }
  }

  let res = await gsapi.spreadsheets.values.update(updateOptions)
}

