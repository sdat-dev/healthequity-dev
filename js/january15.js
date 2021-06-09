window.onload = function () {
    let requestURL = "data/january15.json"; 
    let datarequestURL = "data/sessiondata.json"; 
    let request =  axios.get(requestURL);
    let datarequest =  axios.get(datarequestURL);
    let maincontentContainer = document.getElementsByClassName('main-content')[0];
    axios.all([request, datarequest]).then(axios.spread((...responses) => {
        let webelements =  responses[0].data;
        let sessiondata  = responses[1].data;

        let content = '';
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
        sessions = sessiondata.filter(function(item){
            return item.Day == "1/15/2021";
        });
        content += buildSessionContent(sessions);
        addheader(pageheaders);
        let contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.innerHTML = content.trim();
        maincontentContainer.appendChild(contentElement);
        addfooter();
    })).catch(errors => {
        console.log(errors);
    })
}

function getTime(decimaltime) {
    var hrs = parseInt(Number(decimaltime * 24));
    var min = Math.round((Number(decimaltime * 24)-hrs) * 60);
    if(min < 10){
        min = '0' + min;
    }
    let time  = "";
    if(hrs < 12 )
        time = hrs+':'+min + ' ' + 'AM';
    else if (hrs > 12)
        time = (hrs -12) +':'+min + ' ' + 'PM';
    else
        time = hrs+':'+min + ' ' + 'PM';

    return time; 
}

let buildSessionContent =  function (sessions){
    let conent  = '';
    let distinctTitles = getDistinctAttributes(sessions, "SessionTitle");
    for(var i =0; i < distinctTitles.length; i++){
        let session = sessions.filter(function(session){
            return session.SessionTitle == distinctTitles[i];
        });

        let panelists = session.filter(function(object){
            return object.Role == "Panelist" && 
            object.FirstName != "" && object.LastName != "";
        });

        let moderators = session.filter(function(object){
            return object.Role == "Moderator" && 
            object.FirstName != "" && object.LastName != "";
        });

        conent +=   '<section class="session">'+
                        '<h3 class="content-header">'+ session[0].SessionTitle +'</h3>'+ 
                        '<h4>Time: '+ getTime(session[0].StartTime) +' - '+ getTime(session[0].EndTime) +', January 15</h4>'+
                        // (session[0].ZoomLink == ""? "": '<h4>Session Link: Coming Soon!</h4>') +
                        '<p>'+ session[0].PanelDescription +'</p>';
        if(panelists.length != 0){
            conent +='<div class = "display-flex">'+
            '<div class= "col-xs-12"><h3 class="content-header">Panelists</h3></div>';
            for(var j = 0; j < panelists.length; j++){
                let panelist = panelists[j];
                conent += '<div class= "col-lg-3 col-md-3 col-sm-3" id="'+ (panelist.FirstName.replace(/ /g, '')) +'">'+
                '   <p class="text-center"><a href="'+ ((panelist.FirstName == ""|| panelist.LastName == "")? '#':'agenda/' + 
                (panelist.FirstName.split(/\.|\ |\,|-/).join("") + panelist.LastName.split(/\.|\ |\,|-/).join("")).toLowerCase()+ '.html') +'">'+
                '   <img class="img-fluid mx-auto d-block panelist-img img-thumbnail" src="assets/images/Panelists/' + panelist.Photo + '" alt="panelist photo"></a></p>'  +
                '   <p class="panelist-info dont-break-out"><span class="name">' +  panelist.FirstName + ' ' + panelist.LastName + '</span>' + (panelist.DegreeCredential == ''? "": ', ' + panelist.DegreeCredential) +
                (panelist.JobTitle == ""? "" : '<br><span class="jobtitle">' + panelist.JobTitle + '</span>,')+
                (panelist.Department == ""? "": '<br><span class="department">' + panelist.Department + '</span>,') + 
                (panelist.Organization  == ""? "": '<br><span class="organization">' + panelist.Organization + '</span>')+
                '   </p>' + 
                '</div>';   
            }
            conent +='</div>';
        }
        if(moderators.length != 0){
            conent +='<div class = "display-flex">'+
                        '<div class= "col-xs-12"><h3 class="content-header">Moderator</h3></div>';
            for(var j = 0; j < moderators.length; j++){
                let moderator = moderators[j];
                conent += '<div class= "col-lg-3 col-md-3 col-sm-3" id="'+ (moderator.FirstName.replace(/ /g, '')) +'">'+
                '   <p class="text-center"><a href="'+ ((moderator.FirstName == ""|| moderator.LastName == "")? '#':'agenda/' + 
                (moderator.FirstName.split(/\.|\ |\,|-/).join("") + moderator.LastName.split(/\.|\ |\,|-/).join("")).toLowerCase()+ '.html') +'">'+
                '   <img class="img-fluid mx-auto d-block panelist-img img-thumbnail" src="assets/images/Panelists/' + moderator.Photo + '" alt="panelist photo"></a></p>'  +
                '   <p class="panelist-info dont-break-out"><span class="name">' +  moderator.FirstName + ' ' + moderator.LastName + '</span>' + (moderator.DegreeCredential == ''? "": ', ' + moderator.DegreeCredential) +
                (moderator.JobTitle == ""? "" : '<br><span class="jobtitle">' + moderator.JobTitle + '</span>,')+
                (moderator.Department == ""? "": '<br><span class="department">' + moderator.Department + '</span>,') + 
                (moderator.Organization  == ""? "": '<br><span class="organization">' + moderator.Organization + '</span>')+
                '   </p>' + 
                '</div>'; 
            }
            conent += '</div>';
        }
        conent += '</section>';
    }
    return conent;
}