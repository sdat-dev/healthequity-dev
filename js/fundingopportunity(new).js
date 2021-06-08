let requestURL = "data/fundingopportunity(new).json";
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    let content = '';
    const webelementsjson = request.response;
    //condition for checking if browser is Internet Explorer
    let webelements = ((false || !!document.documentMode)) ? JSON.parse(webelementsjson) : webelementsjson;
    let logostart = true;
    let pageheaders = [];
    for (let i = 0; i < webelements.length; i++) {
        let element = webelements[i];
        let type = element.type.toLowerCase();
        if (type == 'ph') {
            pageheaders.push(element);
        }
        else if (type == 'ch') {
            let header = document.getElementsByClassName("content-header")[0];
            header.innerHTML = element.content;
            if (element.hasOwnProperty('style'))
                header.setAttribute('style', element.style);
        }
        else if (type == 'p') {
            if (element.hasOwnProperty('style'))
                content += '<p style ="' + element.style + '">' + element.content + '</p>';
            else
                content += '<p>' + element.content + '</p>';
        }
        else if (type == 'img') {
            if (element.hasOwnProperty('style'))
                content += '<img src="assets/images/' + element.content + '" alt="" style="' + element.style + '">';
            else
                content += '<img src="assets/images/' + element.content + '" alt="" style="width: 100%;">';
        }
        else if (type == 'iframe') {
            content += '<iframe ' + element.content + '></iframe>';
        }
        else if (type == 'ul') {
            if (element.hasOwnProperty('style'))
                content += '<ul class="sub-list ' + element.content + '" style ="' + element.style + '">';
            else
                content += '<ul class="sub-list ' + element.content + '">';
        }
        else if (type == 'li') {
            content += '<li style="padding-bottom:10px;">' + element.content + '</li>';
        }
        else if (type == '/ul') {
            content += '</ul>';
        }
        else if (type == 'a' && !element.hasOwnProperty("logo") && !element.hasOwnProperty("style")) {
            content += '<a href = "' + element.source + '">' + element.content + '</a>';
        }
        else if (type == 'a' && !element.hasOwnProperty("style") && element.logo != '') {
            if (logostart == true) {
                content += '<div class = "display-flex">';
                logostart = false;
            }
            content += '<div class = "col-xl-4 col-lg-4 col-md-4">' +
                '<a target = "_blank" href = "' + element.source + '">' +
                '<div class = "home-logo-container">' +
                '<img class = "home-logo" src = "assets/images/' + element.logo + '">' +
                '<p>' + element.content + '</p>' +
                '</div>' +
                '</a>' +
                '</div>';
            if (i + 1 == webelements.length) {
                content += '</div>';
            }
        }
        else if (type == 'a' && element.hasOwnProperty("style") && element.logo != '') {
            content += '<a target = "_blank" href = "' + element.source + '">' +
                '<img  img-fluid style="' + element.style + '" src = "assets/images/' + element.logo + '">' +
                '<p>' + element.content + '</p>' +
                '</a>';
        }
        else if (type == 'div') {
            if (element.hasOwnProperty('style'))
                content += '<div style ="' + element.style + '">' + element.content + '</div>';
            else
                content += '<div>' + element.content + '</div>';
        }
    }
    addheader(pageheaders);
    let contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(contentElement);
    addfooter();
}

let addheader = function (headers) {
    let header = document.getElementById("page-header");
    let content = "";
    let image = "";
    let header1 = "";
    let header2 = "";

    content += '<div class="carousel slide carousel-fade pointer-event" data-ride="carousel">' +
        '<div class="carousel-inner">';
    for (var i = 0; i < headers.length; i++) {
        image = typeof headers[i].logo != 'undefined' && headers[i].logo != '' ? headers[i].logo : image;
        header1 = typeof headers[i].content != 'undefined' && headers[i].content != '' ? headers[i].content : header1;
        header2 = typeof headers[i].subcontent != 'undefined' && headers[i].subcontent != '' ? headers[i].subcontent : header2;
        let source = 'assets/images/' + (typeof headers[i].source != 'undefined' && headers[i].source != '' ? headers[i].source + '/' : '');
        if (i == 0) {
            content += '<div class="carousel-item active">';
        }
        else {
            content += '<div class="carousel-item">';
        }
        if (header1 == '') {
            content += '<img src="' + source + image + '" class="d-block w-100" alt="...">' +
                '</div>';
        }
        else if (header1.includes('link')) {
            console.log("else if");
            content += '<a target = "_blank" href="https://albany.az1.qualtrics.com/jfe/form/SV_7Vw1AmKqr14FT25"> <img src="' + source + image + '" class="d-block w-100" alt="..."></a>' +
                '</div>';
        }
        else {
            content += '<img src="' + source + image + '" class="d-block w-100" alt="...">' +
                '<div id = "landing-page-text-wrapper">' +
                '<h1>' + header1 + '</h1>' +
                '<p>' + header2 + '</p>' +
                '</div>' +
                '</div>';
        }
    }
    content += '</div></div>';
    header.innerHTML = content;
}

$('.carousel').carousel({
    pause: "false",
    interval: 2000

});