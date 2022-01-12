//date form 을 인자로 넘겨 Date 오브젝트 생성
//new Date("0000-00-00")
// const myDate = new Date("2021-11-25");
// console.log(myDate.getDate() + "일");

//시계(00:00.000)가 달린 디데이 카운터 만들기
//ㄴ 구글에서 dday counter ui 검색 -> 레퍼런스 선택(이미지 캡쳐)
//ㄴ 그대로 만들어보기
//ㄴ 이벤트리스너

//ㄴ 기념일 입력받고
//ㄴ 오늘을 기준으로 D-day 출력 (+ -)

let loadChk = false;

function move(){
  document.getElementById('t2').checked = false;
  document.getElementById("t1").checked = true;
}

//클릭하면 기본값 지우기
function deleteCon(val) {
  const data1 = document.querySelector(".data1");
  const data2 = document.querySelector(".data2");

  if (data1.getAttribute("value") === val) data1.setAttribute("value", "");
  else data2.setAttribute("value", "");
}

//디폴트행
function addRow(){
  const table = document.querySelector('table');
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  const td2 = document.createElement('td');
  
  tr.setAttribute('bgcolor', "lightgreen");

  let text = "기념일제목:12월 시작! \n"
  text += "2021년 12월 1일";

  td2.innerText = "[D-3]";
  td.innerText = text;
  tr.append(td2);
  tr.append(td);
  table.append(tr);
  td.setAttribute("style", "border-radius: 10px 10px 10px 10px;");
  loadChk = true;
}

//디데이추가
function addDday() {

  if(checkValue()){
    const table = document.querySelector('table');
    table.setAttribute('border', 2);
  
    const title = document.getElementById('title').value;
    const color = document.querySelector('.color').value;
  
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const td2 = document.createElement('td');
  
    tr.setAttribute('bgcolor', color);
    table.setAttribute('border-style', 'solid');
  
  
    const tmpyear = document.querySelector('.data1').value;
    const tmpmonth = document.querySelector('.data3').value;
    const tmpday = document.querySelector('.data2').value;

    const time2 = document.getElementById("fileArea").value;
    
    console.log("time: " ,time2);
    
    let a = time2.split(":");
    console.log("a[0]: " ,a[0], " a[1]: " , a[1]);
    
    let addhour = parseInt(a[0]);
    let addmin = parseInt(a[1]);

    const date = new Date(tmpyear, tmpmonth, tmpday, addhour, addmin);
    
    
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    const today = new Date();
    var time = date.getTime() - today.getTime();
    var days = Math.ceil(time / (1000 * 60 * 60 * 24));
    
    let text = "";
    let text2 = "";
    text += "기념일제목: " + title + "\n " + year + "년 " + month + "월 " + day + "일";
  
    if (days < 0) {
      text2 += "[D+" + Math.abs(days) + "]";
    }
    else {
      text2 += "[D-" + days + "]";
    }
  
    td.innerText = text;
    td2.innerText = text2;
    tr.append(td2);
    tr.append(td);
    table.append(tr);
  
    // table.setAttribute("style", "font-size:20pt;")
    td.setAttribute("style", "border-radius: 10px 10px 10px 10px; display:flex; margin-left:15px;");
    alert(`디데이가 등록되었습니다.`);
  
    makeCheckbox(td);
    makeImage();
    makeTimer(date);
    checkCalendar(date);
  }
}

//사용자 입력값 체크
function checkValue(){
  const title = document.getElementById('title').value;
  const year = document.querySelector('.data1').value;
  const month = document.querySelector('.data3').value;
  const day = document.querySelector('.data2').value;
  const time = document.querySelector('#fileArea').value;

  console.log(year.valueOf());
  if(title.valueOf() == "" || year.valueOf() == "년(4자)입력" || year.valueOf() == "" || month.valueOf() == "월" || day.valueOf() == "일 입력" || time==""){
    alert(`제목과 날짜를 입력해주세요!`);
    return false;
  }
  
  if(year.valueOf() < new Date().getFullYear()){
    alert(`유효한 날짜를 입력해주세요!`);
    return false;
  }
  return true;
}

let cnt = 0;

//체크박스 만들기
function makeCheckbox(td) {
  const div = document.querySelector(".imgArea");
  const img = document.createElement("img");

  td.append(img);
  img.setAttribute("src", "img/checkbox1.PNG");
  img.setAttribute("id", "img" + ++cnt);
  img.setAttribute("class", "chkboximg");
  img.setAttribute("style", "width:50px; height:50px; margin-left:30px; margin-top:15px; display:flex; flex-direction:column; cursor: pointer;");
}

//기념일 이미지
function makeImage(params) {
  const div = document.querySelector(".conArea");
  const innerdiv = document.createElement("div");
  const img = document.createElement("img");
  const kind = document.querySelector(".ddayKinds").value;

  console.log("kind:" , kind)
  let idx = findImgIdx(kind);

  div.appendChild(innerdiv);
  innerdiv.appendChild(img);

  const imgName = "pic" + idx;
  img.setAttribute("src", `img/${imgName}.png`);
  img.setAttribute("style", "margin-left:50px; margin-right:10px; width:70px; height:70px;");

  innerdiv.className = `innerdiv${cnt}`;
}

//이미지 인덱스 찾기
function findImgIdx(kind){
  let idx = -1;

  switch (kind) {
    case "없음":
      idx = 0;
      break;
    case "시험":
      idx = 1;
      break;
    case "생일":
      idx = 2;
      break;
    case "커플기념일":
      idx = 3;
      break;
    case "다이어트":
      idx = 4;
      break;
    case "여행":
      idx = 5;
      break;
  }
  return idx;
}

let tmp = 0;

//리스트 체크박스 클릭 시 세부내용 출력
document.getElementById("t2").addEventListener('click', function (e) {
  const imgList = document.querySelectorAll('.content .list td img');

  console.log("imgList.length:", imgList.length)
  for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click', function (e) {
      e.preventDefault();
      const div = document.querySelector(`.innerdiv${i + 1}`);
      console.log("div:", div);

      if(tmp != 0 && i == 0){
        imgList[i].setAttribute("src", "img/checkbox2.PNG");
        div.setAttribute("style", "display: flex;");
      }
      if (imgList[i].getAttribute("src").valueOf() === "img/checkbox1.PNG") {
        imgList[i].setAttribute("src", "img/checkbox2.PNG");
        div.setAttribute("style", "display: flex;");
      }
      else {
        imgList[i].setAttribute("src", "img/checkbox1.PNG");
        div.setAttribute("style", "display:none;");
        tmp = i;
      }
    });
  }
});

document.getElementById("t1").addEventListener('click', function (e) {
  const imgList = document.querySelectorAll('.content .list .imgArea img');

  for (let i = 0; i < imgList.length; i++) {
    const div = document.querySelector(`.innerdiv${i + 1}`);
    imgList[i].setAttribute("src", "img/checkbox2.PNG");
    div.setAttribute("style", "display: flex;");
  }
});

//디데이 타이머
function makeTimer(date) {
  const div = document.querySelector(`.innerdiv${cnt}`);
  div.setAttribute("style", "display:none; background-color:black;");

  const dayp = document.createElement('p');
  dayp.id = "dayp" + cnt;
  const hourp = document.createElement('p');
  hourp.id = "hourp" + cnt;
  const minp = document.createElement('p');
  minp.id = "minp" + cnt;
  const secp = document.createElement('p');
  secp.id = "secp" + cnt;

  div.appendChild(dayp);
  div.appendChild(hourp);
  div.appendChild(minp);
  div.appendChild(secp);

  document.getElementById(`dayp${cnt}`).setAttribute("style", "margin-top:10px; font-size: 35px;");
  document.getElementById(`hourp${cnt}`).setAttribute("style", "margin-top:10px; font-size: 35px;");
  document.getElementById(`minp${cnt}`).setAttribute("style", "margin-top:10px; font-size: 35px;");
  document.getElementById(`secp${cnt}`).setAttribute("style", "margin-top:10px; font-size: 35px;");

  childArr.push({ num: cnt, newDate: date, newDiv: div });

  setInterval(setTime, 1000);
};

const childArr = [];

function setTime() {
  childArr.forEach(e => {
    console.log("e:", e);

    const today = new Date();
    const time = e.newDate.getTime() - today.getTime();
    const gap = (e.newDate - today) / 1000;
    
    const days = Math.ceil(time / (1000 * 60 * 60 * 24));
    const hour = Math.floor(gap / 3600) % 24;
    var min = Math.ceil((time % (1000 * 60 * 60)) / (1000 * 60));
    var sec = Math.ceil((time % (1000 * 60)) / 1000);

    document.getElementById(`dayp${e.num}`).innerText = days + "일:";
    document.getElementById(`hourp${e.num}`).innerText = hour + "시간:";
    document.getElementById(`minp${e.num}`).innerText = min + "분:";
    document.getElementById(`secp${e.num}`).innerText = sec + "초";
    
    document.getElementById(`dayp${e.num}`).style.backgroundImage = "url('https://img1.daumcdn.net/thumb/S272x320/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcckdnY%2FbtqDogEdAS4%2F7kJZCk4ZhTYhNQMl6RkIU1%2Fimg.png'";
    document.getElementById(`dayp${e.num}`).style.color = "white";
    document.getElementById(`hourp${e.num}`).style.backgroundImage = "url('https://img1.daumcdn.net/thumb/S272x320/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcckdnY%2FbtqDogEdAS4%2F7kJZCk4ZhTYhNQMl6RkIU1%2Fimg.png'";
    document.getElementById(`hourp${e.num}`).style.color = "white";
    document.getElementById(`minp${e.num}`).style.backgroundImage = "url('https://img1.daumcdn.net/thumb/S272x320/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcckdnY%2FbtqDogEdAS4%2F7kJZCk4ZhTYhNQMl6RkIU1%2Fimg.png'";
    document.getElementById(`minp${e.num}`).style.color = "white";
    document.getElementById(`secp${e.num}`).style.backgroundImage = "url('https://img1.daumcdn.net/thumb/S272x320/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcckdnY%2FbtqDogEdAS4%2F7kJZCk4ZhTYhNQMl6RkIU1%2Fimg.png'";
    document.getElementById(`secp${e.num}`).style.color = "white";
  });
}


//캘린더 달력 및 오늘날짜 출력
window.onload = function () {
  addRow();
  const area = document.querySelector("#calendar");

  if (area.getElementsByTagName('div').length == 0) {
    makeCalendar();

    const today = new Date();

    for (let i = 0; i < 35; i++) {
      const val = document.getElementById(`s${i}`).innerHTML;

      if (parseInt(val) === today.getDate()) {
        document.getElementById(`s${i}`).setAttribute("style", "font-weight: bold; font-size:17px; background-color: rgba( 255, 255, 255, 0.5 ); position:relative; left:30px; top:12px;")
      }
    }
  }
}

//캘린더만들기
function makeCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  

  const start = new Date(year, month - 1, 1);
  const startDay = start.getDate(); //일
  const startYoil = start.getDay(); //요일

  const lastDay = new Date(year, month, 0).getDate();
  const preLastDay = new Date(year, month - 1, 0).getDate();

  let startDayCnt = 1;
  let lastDayCnt = 1;
  let divNum = 1;

  for (let i = 0; i < 5; i++) { //5주
    for (let j = 0; j < 7; j++) { //월~일
      const area = document.querySelector("#calendar");
      if(i == 0){
        const header = document.createElement("p")
        header.setAttribute("class", "header");

        switch(j){
          case 0:
            header.innerText = "일";
            break;
          case 1:
            header.innerText = "월";
            break;
          case 2:
            header.innerText = "화";
            break;
          case 3:
            header.innerText = "수";
            break;
          case 4:
            header.innerText = "목";
            break;
          case 5:
            header.innerText = "금";
            break;
          case 6:
            header.innerText = "토";
            break;
        }
        area.appendChild(header);
      } 
    }
  }
  

  for (let i = 0; i < 5; i++) { //5주
    for (let j = 0; j < 7; j++) { //월~일
      const area = document.querySelector("#calendar");
      const div = document.createElement("div");
      div.setAttribute("style", "background-color:#FFFFBB;");
      div.setAttribute("id", `d${divNum++}`);
      div.setAttribute("title", "해당 날짜의 디데이를 등록해보세요~")
      area.appendChild(div);

      const span = document.createElement("span");

      if (i == 0 && j == 0) {
        span.setAttribute("id", `s${startDayCnt - 1}`);
      }
      else {
        span.setAttribute("id", `s${startDayCnt}`);
      }
      div.appendChild(span);

      if (i == 0 && j == 0 && j < startYoil) {
        div.setAttribute("style", "background-color:lightblue;");
        div.setAttribute("class", "calendar garo");
        span.innerText = preLastDay - (startYoil - 1) + j;
      }

      else if (i == 0 && j >= startYoil) {
        span.innerText = startDayCnt;

        const span2 = document.createElement("span");
        div.appendChild(span2);

        span2.setAttribute("id", `${startDayCnt++}`);

        if (j == 6) div.setAttribute("class", "calendar");
        else div.setAttribute("class", "calendar garo");
      }

      else if (i > 0 && startDayCnt <= lastDay) {
        span.innerText = startDayCnt;

        const span2 = document.createElement("span");
        div.appendChild(span2);

        span2.setAttribute("id", `${startDayCnt++}`);

        if (j == 0) div.setAttribute("class", "calendar garo sero");
        else if (j == 6) div.setAttribute("class", "calendar sero");
        else div.setAttribute("class", "calendar garo sero");
      }

      else if (startDayCnt > lastDay) {
        div.setAttribute("style", "background-color:lightblue;");
        span.setAttribute("id", `s${startDayCnt++}`);
        span.innerText = lastDayCnt++;

        if (j == 6) {
          div.setAttribute("class", "calendar sero");
        }
        else {
          div.setAttribute("class", "calendar garo sero");
        }
      }

      if(i == 4 && j == today.getDay()){
        div.setAttribute("style", "background-image:url('https://previews.123rf.com/images/dolphfyn/dolphfyn1411/dolphfyn141100084/34010948-today-calendar.jpg'); background-size: 130px 70px;");
      }
      
      if(j == 0 || j == 6){
        span.setAttribute("style", "color:red;")
      }
    }
  }
};

//디데이 등록 시 달력에 표시
function checkCalendar(date) {
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  
  const kind = document.querySelector(".ddayKinds").value;
  let idx = findImgIdx(kind);
  const imgName = "pic" + idx;
  const imgurl = `img/${imgName}.png`;
  let chk = false;

  //console.log("날짜;" , month, "  " , new Date().getMonth());

  if(year == 2021){
    for (let i = 1; i < 36; i++) {
      if(month === new Date().getMonth() && parseInt(document.getElementById(`s${i-1}`).innerHTML) == day){
        document.getElementById(`d${i}`).setAttribute("style", "background-image:url(" + "'" + imgurl + "'" + "); background-size: 140px 70px;");
        chk = true;
      }
      
      else if(parseInt(document.getElementById(`s${i-1}`).innerHTML) == day){
        if(i <= 31 && month === (new Date().getMonth() + 1)){
          document.getElementById(`d${i}`).setAttribute("style", "background-image:url(" + "'" + imgurl + "'" + "); background-size: 140px 70px;");
          chk = true;
        }
        else if(i >= 31 && month === (new Date().getMonth() + 2)){
          document.getElementById(`d${i}`).setAttribute("style", "background-image:url(" + "'" + imgurl + "'" + "); background-size: 140px 70px;");
          chk = true;
        }
      }
    }
  }

  if(chk){
    document.getElementById('t1').checked = false;
    document.getElementById("t3").checked = true;
  }
}

document.getElementById("t3").addEventListener('click', function (e) {
  for (let i = 1; i < 36; i++) {
    document.getElementById(`d${i}`).addEventListener('click', function(e){
      if(i == 1){
        var confirmflag = confirm(`10월 31일 디데이를 등록하시겠습니까?`);
      }
      else if(i > 31){
        var confirmflag = confirm(`12월 ${i-31}일 디데이를 등록하시겠습니까?`);
      }
      else{
        var confirmflag = confirm(`11월 ${i-1}일 디데이를 등록하시겠습니까?`);
      }
     
      if(confirmflag){
        document.getElementById("t3").checked = false;
        document.getElementById('t1').checked = true;
        
        const today = new Date();
        let day;
        let month;
        let year = today.getFullYear();

        if(i == 1){
          month = today.getMonth() - 1;
          day = 31;
        }
        else if(i > 31){
          month = today.getMonth() + 1;
          if(i == 35){
            day = 4;
          }else{
            day = document.getElementById(`s${i}`).innerHTML - 1;
          }
        }
        else{
          month = today.getMonth();

          if(i == 31){
            day = 30;
          }
          else{
            day = document.getElementById(`s${i}`).innerHTML - 1;
          }
        }

        document.querySelector('.data1').value = year;
        document.querySelector('.data3').value = month;
        document.querySelector('.data2').value = day;
      }
    });
  }
});

document.getElementById("t4").addEventListener('click', function (e) {
  var container = document.getElementById('daumRoughmapContainer1638113797827'),
      options = {
           center: new kakao.maps.LatLng(37.497779115046306, 127.02790969168299),
           level: 3
      };
  var map = new kakao.maps.Map(container, options);
  
  container.style.width = '500px';
  container.style.height = '180px';
  
  map.relayout();
  
  var container = document.getElementById('daumRoughmapContainer1638116940172'),
      options = {
           center: new kakao.maps.LatLng(37.581206091559920, 127.00223597359480),
           level: 3
      };
  var map = new kakao.maps.Map(container, options);
  
  container.style.width = '500px';
  container.style.height = '200px';
  
  map.relayout();
});