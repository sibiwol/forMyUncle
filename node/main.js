// googleapis npm 설치
// https://developers.google.com/sheets/api/quickstart/nodejs 
const {google} = require("googleapis")

// 비공계키 받아오기
// https://console.cloud.google.com/apis/dashboard?project=seoul-building-permit-address
const keys = require("../비공계키.json")
// const fs = require("fs")

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
    console.log("연결됨!")
    let 서울시법정동리스트Array = run서울시법정동리스트Sheet(client)
    console.log(서울시법정동리스트Array)
    update법정동주소(client)
    update주소(client)
    
  }
})

// 서울시 법정동 리스트 시트 안의 values를 서울시법정동리스트Array 안에 담기
async function run서울시법정동리스트Sheet(cl){
  const gsapi = google.sheets({version: "v4", auth: cl})
  const readOptions = {
    spreadsheetId: '1jIqwvViG69ObWAL_td5vE_KtgHSywwkV6wZixPo7LlQ',
    range: '서울시 법정동 리스트!A2:c494'
  }

  // read
  let 서울시법정동리스트 = await gsapi.spreadsheets.values.get(readOptions)
  const 서울시법정동리스트Array = 서울시법정동리스트.data.values
  console.log(서울시법정동리스트Array)
  return 서울시법정동리스트Array
}



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

