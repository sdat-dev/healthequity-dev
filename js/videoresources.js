window.onload = function () {
    let requestURL = "data/videoresources.json";
    let request = axios.get(requestURL);
    axios.all([request]).then(axios.spread((...responses) => {
        let proposalcontent =  responses[0].data;
        let webelements = proposalcontent;
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
        addheader(pageheaders);
        let contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.innerHTML = content.trim();
        maincontentContainer.appendChild(contentElement);

    })).catch(errors => {
        console.log(errors);
    })
}
let datarequestURL = "data/videoresourcesdata.json";
let datarequest = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
datarequest.open('GET', datarequestURL);
datarequest.responseType = 'json';
datarequest.send();
datarequest.onload = function () {
    let agencies_sort = ['NSF​', 'NIH', 'DoD', 'DOE', 'ED', 'NASA', 'NOAA', 'NEA', 'NEH', 'NIJ', 'SAMHSA', 'USDA']
    let content = '';
    const videoresourcesjson = datarequest.response;
    //condition for checking if browser is Internet Explorer
    let videoresources = ((false || !!document.documentMode)) ? JSON.parse(videoresourcesjson) : videoresourcesjson;
    let distinctAgencies = getDistinctAttributes(videoresources, 'acronym');

    let navContent = createAgencyNavigation(distinctAgencies);
    let tabContent = buildAgencyVideos(distinctAgencies, videoresources);
    // updatecontentHeading("Video Resources");
    //appendPostDate(maincontentContainer, videoresources[0].updateddate);
    appendMainContent(maincontentContainer, navContent + tabContent);
}

let createAgencyNavigation = function (distinctAgencies) {
    let navigationContent = '<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">';
    for (let i = 0; i < distinctAgencies.length; i++) {
        let buttonContent = '';
        let agencyId = "agency" + i.toString();
        if (i == 0) {
            buttonContent = '<a class="nav-link active" id="pills-' + agencyId + '-tab" data-toggle="pill" href="#pills-' + agencyId + '" role="tab" aria-controls="pills-' + agencyId + '" aria-selected="true">' + distinctAgencies[i] + '</a>';
        }
        else {
            buttonContent = '<a class="nav-link" id="pills-' + agencyId + '-tab" data-toggle="pill" href="#pills-' + agencyId + '" role="tab" aria-controls="pills-' + agencyId + '" aria-selected="true">' + distinctAgencies[i] + '</a>';
        }

        let linkElement = '<li class="nav-item">' + buttonContent + '</li>';
        navigationContent = navigationContent + linkElement;
    }
    navigationContent += '</ul>';
    return navigationContent;
}

let buildAgencyVideos = function (distinctAgencies, videoresources) {
    let tabContent = '<div class="tab-content" id="pills-tabContent">';

    for (let i = 0; i < distinctAgencies.length; i++) {
        let agencyId = "agency" + i.toString();
        let agencyvideos = videoresources.filter(function (videoresource) {
            return videoresource.acronym == distinctAgencies[i];
        });

        if (i == 0) {
            tabContent += '<div class="tab-pane fade show active" id="pills-' + agencyId + '" role="tabpanel" aria-labelledby="pills-' + agencyId + '-tab">';
        }
        else {
            tabContent += '<div class="tab-pane fade" id="pills-' + agencyId + '" role="tabpanel" aria-labelledby="pills-' + agencyId + '-tab">';
        }
        tabContent += '<div class="sponsor-title-container"><h3 class="sponsor-title"><img class="logo" src="assets/sponsor_logos/' + agencyvideos[0].acronym.toLowerCase() + '.png">' + agencyvideos[0].agency.toString() + '</h3></div>';
        tabContent += buildVideos(agencyvideos);
        tabContent += '</div>';

    }
    tabContent += '</div>';
    return tabContent;
}

let buildVideos = function (agencyvideos) {
    let accordionCounter = 1;
    let videoElem = '<div class = "accordion" id = "accordionExample">';
    let distinctTypes = getDistinctAttributes(agencyvideos, 'type');
    distinctTypes.forEach(function (type) {
        let videos = agencyvideos.filter(function (video) {
            return video.type == type;
        });
        let videoContent = buildVideoContent(videos);
        let headerId = "collapse" + accordionCounter;
        let headingId = "heading" + accordionCounter;
        let childId = "child" + accordionCounter;
        videoElem += generateAccordionElem(1, headerId, headingId, "accordionExample", childId, videos[0].type, videoContent);
        accordionCounter++;
    });
    videoElem += '</div>';
    return videoElem;
}

let buildVideoContent = function (videos) {
    let content = '<ul class = "sub-list">';
    //var regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    let weblinks = videos.filter(function (video) {
        return (video.link.includes("youtube") == false &&
            video.link.includes("youtu.be") == false &&
            video.link.includes(".mp4") == false);
    });

    for (let i = 0; i < weblinks.length; i++) {
        if (weblinks[i].text != '') {

            content = content + '<li><a target="_blank" href = "' + weblinks[i].link + '">' + weblinks[i].title + ' (' + weblinks[i].text + ')</a></li>';
        }
        else {
            content = content + '<li><a target="_blank" href = "' + weblinks[i].link + '">' + weblinks[i].title + '</a></li>';
        }
    }
    content = content + '</ul>';
    let youtubelinks = videos.filter(function (video) {
        return (video.link.includes("youtube") == true ||
            video.link.includes("youtu.be") == true ||
            video.link.includes(".mp4") == true);
    });

    content += '<div class="display-flex">';
    for (let i = 0; i < youtubelinks.length; i++) {
        let youtubelink = '';
        let link = youtubelinks[i].link;
        if (link.includes("user")) {
            channel_title = link;
        }
        if (link.includes("youtube") == true) {
            youtubelink = link.replace('watch?v=', 'embed/');
        }
        else if (link.includes("youtu.be") == true) {
            youtubelink = link.replace('youtu.be', 'www.youtube.com/embed/');
        }
        else {
            youtubelink = link;
        }

        var ampersandPosition = youtubelink.indexOf('&');
        if (ampersandPosition != -1)
            youtubelink = youtubelink.substring(0, ampersandPosition);
        if (youtubelinks[i].title.includes("Channel")) {
            content += '<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 video-padding-margin">' +
                '   <div class="videoWrapper wide-screen"><img src="assets/sponsor_logos/' + youtubelinks[i].acronym.toLowerCase() + '.png""></img></div>' +
                '   <a target = "_blank" href="' + youtubelink + '"><h5 class="video-title">' + youtubelinks[i].title + '</h5></a>' +
                '</div>';
        }
        else {
            content += '<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 video-padding-margin">' +
                '   <div class="videoWrapper wide-screen"><iframe  src="' + youtubelink + '" allowfullscreen="true" autoplay="false"></iframe></div>' +
                '   <a target = "_blank" href="' + youtubelink + '"><h5 class="video-title">' + youtubelinks[i].title + '</h5></a>' +
                '</div>';
        }



        addfooter();

    }
    content += '</div>';
    return content;

}