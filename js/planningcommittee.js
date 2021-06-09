let requestURL = "data/planningcommittee.json"; 
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    let content = '';
    const committeepagejson = request.response;
    //condition for checking if browser is Internet Explorer
    let committee =  ((false || !!document.documentMode))? JSON.parse(committeepagejson): committeepagejson;
    let webelements = committee.content;
    let members = committee.members;
    let logostart = true;
    let pageheaders = [];
    for(let i = 0; i < webelements.length; i++)
    {
        let element = webelements[i]; 
        let type = element.type.toLowerCase(); 
        if(type == 'ph')
        {
            pageheaders.push(element);
        }
        else if(type == 'ch')
        {
            let header = document.getElementsByClassName("content-header")[0];
            header.innerHTML = element.content.toUpperCase();
        }
        else if(type == 'p')
        {
            content += '<p>' + element.content + '</p>';
        }
        else if(type == 'img')
        {
            content += '<img src="assets/images/'+ element.content + '" alt="" style="width: 100%;">';
        }
        else if(type == 'iframe')
        {
            content += '<iframe '+ element.content +'></iframe>';
        }
        else if(type == 'ul')
        { 
            content += '<ul class="sub-list ' + element.content +'">';
        }
        else if(type == 'li')
        {
            content += '<li>'+ element.content +'</li>';
        }
        else if(type == '/ul')
        {
            content += '</ul>';
        }
        else if(type == 'a' && !element.hasOwnProperty("logo"))
        {
            content +='<a href = "'+ element.source +'">'+ element.content + '</a>';
        }
        else if(type == 'a' && element.logo != '')
        {
            if(logostart == true)
            {
                content +='<div class = "display-flex">';
                logostart = false;
            }
            content +='<div class = "col-xl-4 col-lg-6 col-md-12">'+
                        '<a target = "_blank" href = "'+ element.source +'">'+
                            '<div class = "home-logo-container">' +
                                '<img class = "home-logo" src = "assets/images/' + element.logo+ '">'+
                                '<p>'+ element.content+'</p>' +
                            '</div>'+
                        '</a>'+
                    '</div>';
            if(i+1 ==  webelements.length){
                content += '</div>';
            }
        }
    }
    content +=buildMembersContent(members);
    addheader(pageheaders);
    let contentElement = document.createElement('div');
    contentElement.classList.add('content');
    contentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(contentElement);
    addfooter();
}

let addheader =  function (headers){
    let header = document.getElementById("page-header");
    let content ="";
    let image = "";
    let header1 = "";
    let header2 = "";

    content += '<div class="carousel slide carousel-fade pointer-event" data-ride="carousel">'+
                    '<div class="carousel-inner">';
    for(var i =0 ; i < headers.length; i++)
    {
        image = typeof headers[i].logo != 'undefined' && headers[i].logo != ''? headers[i].logo : image;
        header1 =  typeof headers[i].content != 'undefined' && headers[i].content != ''? headers[i].content : header1;
        header2 =  typeof headers[i].subcontent != 'undefined' && headers[i].subcontent != ''? headers[i].subcontent : header2;
        let source = 'assets/images/' + (typeof headers[i].source != 'undefined' && headers[i].source != ''? headers[i].source+'/' : '');
        if(i == 0)
        {
            content += '<div class="carousel-item active">';
        }
        else
        {
            content += '<div class="carousel-item">';
        }
        content +=  '<img src="'+ source + image +'" class="d-block w-100" alt="...">'+
                    '<div id = "landing-page-text-wrapper">'+
                        '<h1>'+ header1 +'</h1>' + 
                        '<p>' + header2 + '</p>' +      
                    '</div>'+
                '</div>';
    }
    content +=  '</div></div>';
    header.innerHTML = content;
}

let buildMembersContent = function(members){
    let content = '<div class="display-flex">';
    for(var i=0; i< members.length; i++){
        let member = members[i];
        content +=  buildMemberElement(member);
    }
    content += '</div>'
    return content;
}

let buildMemberElement = function(member){
    let content = '';
    content +=  '<div class= "col-lg-4 col-md-4 col-sm-6 search-container" id="'+ (member.firstName.replace(/ /g, '')) +'">'+
    '   <p class="text-center"><a target="_blank" href="' + member.profilepage + '"><img class="img-fluid mx-auto d-block member-img img-thumbnail" src="assets/images/Planning_Committee/' + member.photo + '" alt="member photo"></a></p>'  +
    '   <p class="member-info">' + buildNameElement(member) +
    '   <br><span class="jobtitle">' + member.title +
    '   <br><span class="organization">' + member.organization +
    '   <br><a href = mailto:' + member.email + ' class ="dont-break-out email-link">'+ member.email+ '</a>'+
    '   <br>'+ (member.phone != ""? member.phone : "" )+ 
    '   </p>' + 
    '</div>';   
    console.log("content:"+content);
    return content;
}

let buildNameElement = function(member){
  let content = '';
  if(member.profilepage != '')
  {
      content += '<a href = "'+ member.profilepage +'"><span class="name"><strong>' + member.firstName + ' ' + member.lastName + '</strong></a>';
  }
  else
  {
    content += '<span class="name"><strong>' + member.firstName + ' ' + member.lastName + '</strong>';
  }
  return content
}

$('.carousel').carousel({pause: false});