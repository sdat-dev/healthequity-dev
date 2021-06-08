window.onload = function () {
    let requestURL = "data/libraryresources.json";
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
let datarequestURL = "data/libraryresourcesdata.json";
let datarequest = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
datarequest.open('GET', datarequestURL);
datarequest.responseType = 'json';
datarequest.send();
datarequest.onload = function(){
    let agencies_sort = ['NSF​','NIH','DoD','DOE','ED','NASA','NOAA','NEA','NEH','NIJ','SAMHSA','USDA']
    let content = '';
    const libraryresourcesjson = datarequest.response;
    //condition for checking if browser is Internet Explorer
    let libraryresources =  ((false || !!document.documentMode))? JSON.parse(libraryresourcesjson): libraryresourcesjson;
    let distinctAgencies = getDistinctAttributes(libraryresources, 'acronym');
    distinctAgencies = customSort(agencies_sort, distinctAgencies);

    let navContent = createAgencyNavigation(distinctAgencies);
    let tabContent = buildAgencyLibResources(distinctAgencies, libraryresources);
    updatecontentHeading("Library Resources");
    //appendPostDate(maincontentContainer, libraryresources[0].updateddate);
    appendMainContent(maincontentContainer, navContent + tabContent);
}

let createAgencyNavigation = function(distinctAgencies)
{
    let navigationContent = '<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">';
    for(let i = 0; i< distinctAgencies.length; i++)
    {
        let buttonContent = '';
        let agencyId = "agency" + i.toString();
        if(i == 0)
        {
            buttonContent = '<a class="nav-link active" id="pills-'+ agencyId +'-tab" data-toggle="pill" href="#pills-'+ agencyId +'" role="tab" aria-controls="pills-'+ agencyId +'" aria-selected="true">'+ distinctAgencies[i] +'</a>';
        }
        else
        {
            buttonContent = '<a class="nav-link" id="pills-'+ agencyId +'-tab" data-toggle="pill" href="#pills-'+ agencyId +'" role="tab" aria-controls="pills-'+ agencyId +'" aria-selected="true">'+ distinctAgencies[i] +'</a>';
        }
       
        let linkElement = '<li class="nav-item">' + buttonContent + '</li>';
        navigationContent = navigationContent + linkElement;
    }
    navigationContent += '</ul>';
    return navigationContent;
}

let buildAgencyLibResources = function(distinctAgencies, libraryresources){
    let tabContent = '<div class="tab-content" id="pills-tabContent">';
    
    for(let i = 0; i< distinctAgencies.length; i++)
    {
        let agencyId = "agency" + i.toString();
        let agencyresources = libraryresources.filter(function(libraryresource){
            return libraryresource.acronym == distinctAgencies[i];
        });

        if(i == 0)
        {
            tabContent +='<div class="tab-pane fade show active" id="pills-'+ agencyId +'" role="tabpanel" aria-labelledby="pills-'+ agencyId +'-tab">';
        }
        else
        {
            tabContent +='<div class="tab-pane fade" id="pills-'+ agencyId +'" role="tabpanel" aria-labelledby="pills-'+ agencyId +'-tab">';
        }

        if(agencyresources[0].acronym != 'General')
            tabContent += '<h3 class="sponsor-title"><img class="logo" src="assets/sponsor_logos/'+ agencyresources[0].acronym.toLowerCase() +'.png">'+ agencyresources[0].agency.toString() +'</h3>';
        agencyresources.forEach(function(agencyresource) {
            tabContent += buildResourceInfo(agencyresource);
        });

        tabContent += '</div>';
        addfooter();
    }
    tabContent += '</div>';
    return tabContent;
    
}

let buildResourceInfo = function(resource){
    let content = '';
    content +=  '<div class="display-flex bookinfo search-container">' +
                    '<div class="col-xl-2 col-lg-3 ml-0 pl-0">'+
                        '<img class="book-cover" src="assets/images/Book-Covers/'+ resource.image +'">'+
                    '</div>'+
                    '<div class="col-xl-10 col-lg-9 p-0">' +
                        '<h4 class="booktitle"><a href="' + resource.link + '"';
    if(resource.type == 'eBooks')
        content +=      '   target="_blank"><i class="fas fa-file-pdf"></i> '+ resource.title+'</a></h4>';
    else
        content +=      '   target="_blank"><i class="fas fa-book"></i> '+ resource.title+'</a></h4>'; 
    content +=          '<p><i class="fas fa-user"></i> <strong>Author: </strong>'+ resource.author +'</p>'+
                        '<p><i class="fas fa-calendar-day"></i> <strong>Published Year: </strong>'+ resource.year +'</p>'+
                    '</div>'+
                '</div>';    
    return content;
}
