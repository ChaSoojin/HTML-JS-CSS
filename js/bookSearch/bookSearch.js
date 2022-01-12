function search() {
    const query = document.querySelector('input').value;
    getBooksData(query, 1);
}

$("#input").keypress(function(e) {
    if (e.keyCode === 13) {
        const query = document.querySelector('input').value;
        getBooksData(query, 1);
    }
});

let tmpKeyWord = "";

function getBooksData(keyword, page) {
    console.log(keyword);
    let is_end = false;

    if(tmpKeyWord !== "" && tmpKeyWord !== keyword){
        $('h5').remove();
        $('p').remove();
        $('img').remove();
    }

    tmpKeyWord = keyword;

    $.ajax({
        url: 'https://dapi.kakao.com/v3/search/book?target=title',
        Host: 'dapi.kakao.com',
        method: 'get',
        data: {
            query: keyword,
            size: 50,
            page: page
        },
        headers: {
            Authorization: 'KakaoAK cdcc4f2c5e21657d163e0b11e7c381a4'
        }
    }).done(repBody => {
        console.log('repBody: ', repBody);

        is_end = repBody.meta.is_end;
        let idx = 0;

        (repBody.documents).forEach(element => {   
            let conArea = document.querySelector('div#con');
            
            const content = document.createElement('div');
            content.setAttribute("class", "content");
            content.setAttribute("style","margin-bottom:100px;");
            $(conArea).append(content);
            
            $(content).append("<h5><a href='" + element.url + "'>" + element.title + "</a></h5>");
            $(content).append("<p>저자: " + element.authors + "</p>");
            $(content).append("<p>출판사: " + element.publisher + "</p>");
            $(content).append("<img src='" + element.thumbnail + "'/>");
            
            idx++;
        });

        console.log("page: ", page);
    });

    if (is_end === false && page < 10) {
        return getBooksData(keyword, ++page);
    }
    else return;
}