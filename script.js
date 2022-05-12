'use strict'

// bigKcyPlatPlcInfo와 bigCmpBjdongMgmInfo에서 시군구_코드를 찾아 시군구명의 값으로 바꾼다
// bigKcyPlatPlcInfo와 bigCmpBjdongMgmInfo에서 법정동_코드를 찾아 법정동명의 값으로 바꾼다

// 건축 인허가 대지 위치
// 좋은 거 찾았다. 이거 쓰자.
// https://open.eais.go.kr/opnsvc/opnSvcInqireView.do?viewType=1&searchCondition=01&opnSvcSn=55&searchKeyword=%EA%B1%B4%EC%B6%95%EB%8D%B0%EC%9D%B4%ED%84%B0#

// 근데 데이터가 너무 많다... 1714개 정도? 데이터 관리하기 위해 sql 필요... 
function showBigKcyPlatPlcInfo() {
  $.ajax( {
    type: "GET", 
    url: "http://openapi.seoul.go.kr:8088/684d77555a797539353654426b5366/json/bigKcyPlatPlcInfo/1001/2000/",
    data: {},
    success: function(response) {
      let bigKcyPlatPlcInfo = response["bigKcyPlatPlcInfo"]["row"]
      for ( let i = 0; i < bigKcyPlatPlcInfo.length; i++) {
        let address = bigKcyPlatPlcInfo[i]
        let 관리_대지_위치_PK = address["MGM_PLAT_PLC_PK"]
        let 관리_허가대장_PK = address["MGM_PMSRGST_PK"]
        let 시군구_코드 = address["SIGUNGU_CD	"]
        let 법정동_코드 = address["BJDONG_CD"]
        let 대지_구분_코드 = address["PLAT_GB_CD"]
        let 번 = address["BUN"]
        let 지 = address["JI"]
        console.log(`관리_대지_위치_PK: ${관리_대지_위치_PK}, 관리_허가대장_PK: ${관리_허가대장_PK}, 시군구_코드: ${시군구_코드}, 법정동_코드: ${법정동_코드}, 대지_구분_코드: ${대지_구분_코드}
        , 번지: ${번} - ${지}`)
      }
    
    }
  })
}
  

  //bigKcyPlatPlcInfo 94201
  // 필요한 데이터
  // 시군구 코드 => 시군구명, 법정동 코드 => 법정동명
  function showBigCmpBjdongMgmInfo() {
    $.ajax( {
      type: "GET", 
      url: "http://openapi.seoul.go.kr:8088/684d77555a797539353654426b5366/json/bigCmpBjdongMgmInfo/1/5/",
      data: {},
      success: function(response) {
        console.log(response["bigCmpBjdongMgmInfo"]["row"][1]["SIGUNGU_CD"])
      }
    })
  }

showBigKcyPlatPlcInfo()
showBigCmpBjdongMgmInfo()