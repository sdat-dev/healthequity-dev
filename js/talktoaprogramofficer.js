window.onload = function () {
    let requestURL = "data/talktoaprogramofficer.json";
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
let datarequestURL = "data/talktoaprogramofficerdata.json";
let datarequest = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
datarequest.open('GET', datarequestURL);
datarequest.responseType = 'json';
datarequest.send();
datarequest.onload = function(){
    let agencies_sort = ['NSF​','NIH','DoD','DOE','ED','NASA','NOAA','NEA','NEH','NIJ','SAMHSA','USDA']
    let content = '';
    const pointsofcontactjson = datarequest.response;
    //condition for checking if browser is Internet Explorer
    let pointsofcontact =  ((false || !!document.documentMode))? JSON.parse(pointsofcontactjson): pointsofcontactjson;
    let distinctAgencies = getDistinctAttributes(pointsofcontact, 'acronym');
    // distinctAgencies = customSort(agencies_sort, distinctAgencies);

    let navContent = createAgencyNavigation(distinctAgencies);
    let tabContent = buildAgencyContacts(distinctAgencies, pointsofcontact);
    
    // updatecontentHeading("Points of Contact");
    //appendPostDate(maincontentContainer, pointsofcontact[0].updateddate);
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

let buildAgencyContacts = function(distinctAgencies, pointsofcontact){
    let tabContent = '<div class="tab-content" id="pills-tabContent">';
    
    for(let i = 0; i< distinctAgencies.length; i++)
    {
        let agencyId = "agency" + i.toString();
        let agencycontacts = pointsofcontact.filter(function(pointofcontact){
            return pointofcontact.acronym == distinctAgencies[i];
        });

        if(i == 0)
        {
            tabContent +='<div class="tab-pane fade show active" id="pills-'+ agencyId +'" role="tabpanel" aria-labelledby="pills-'+ agencyId +'-tab">';
        }
        else
        {
            tabContent +='<div class="tab-pane fade" id="pills-'+ agencyId +'" role="tabpanel" aria-labelledby="pills-'+ agencyId +'-tab">';
        }
        tabContent += '<div class="sponsor-title-container"><h3 class="sponsor-title"><img class="logo" src="assets/sponsor_logos/'+ agencycontacts[0].acronym.toLowerCase() +'.png">'+ agencycontacts[0].agency.toString() +'</h3></div>';
        tabContent += buildContacts(agencyId, agencycontacts);
        tabContent += '</div>';

    }
    tabContent += '</div>';
    return tabContent;
}

//Start with level1 accordion and build one by one the levels going down.
//this is nestted accordion that can go upto 4 levels
let buildContacts = function(agencyId, agencycontacts){
    let counter = 1; 
    let contactElem = '';
    contactElem += '<div id = "' + agencyId + '">';
    let level1s = agencycontacts.filter(function(contact){
        return contact.level2 == '';
    });
    //if there is no level2 then it is a simple list
    if(level1s.length > 0)
    {
        contactElem += buildDivisionElement(level1s, 'level1');
    }
    //if there is level 2 then it is accordion
    let level1as = agencycontacts.filter(function(contact){
        return contact.level2 != '';
    });

    if(level1as.length > 0)
    {
        let distinctLevel1s = getDistinctAttributes(level1as, 'level1');
        distinctLevel1s.forEach(function(level) {
            let collapseId1 = "collapse" + counter;
            let headerId1 = "heading" + counter;
            let childId1 = "child" + counter;
            counter++;
            let level2Elem = '';
            //filter level2 without level3
            let level2s = level1as.filter(function(contact){
                return contact.level1 == level && contact.level3 == '';
            }); 
            //for level2s with out level3 build simple list
            if(level2s.length > 0)
            {
                level2Elem += buildDivisionElement(level2s, 'level2');
            }
            //filter level2s with level3 
            let level2as = level1as.filter(function(contact){
                return contact.level1 == level && contact.level3 != '';
            }); 
            //build accordion
            if(level2as.length > 0)
            {
                let distinctLevel2s = getDistinctAttributes(level2as, 'level2');
                distinctLevel2s.forEach(function(level){
                    let collapseId2 = "collapse" + counter;
                    let headerId2 = "heading" + counter;
                    let childId2 = "child" + counter;
                    counter++;
                    let level3Elem = '';
                    //filter level3 without level4
                    let level3s = level2as.filter(function(contact){
                        return contact.level2 == level && contact.level4 == '';
                    });
                    //for level3s with out level4 build simple list
                    if(level3s.length > 0)
                    {
                        level3Elem+= buildDivisionElement(level3s, 'level3');
                    }
                    //filter level3 with level4
                    let level3as = level2as.filter(function(contact){
                        return contact.level2 == level && contact.level4 != '';
                    });
                    //build accordion
                    if(level3as.length > 0)
                    {
                        let distinctLevel3s = getDistinctAttributes(level3as, 'level3');
                        distinctLevel3s.forEach(function(level){
                        let collapseId3 = "collapse" + counter;
                        let headerId3 = "heading" + counter;
                        let childId3 = "child" + counter;
                        counter++;
                        let level4s = level3as.filter(function(contact){
                                return contact.level3 == level;
                            });
                            let level4Elem = '';
                            level4Elem += buildDivisionElement(level4s, 'level4');
                            level3Elem+= generateAccordionElem(3, collapseId3, headerId3, childId2, childId3, level, level4Elem);
                        }); 
                        //end level3 accordion
                    }
                    level2Elem+= generateAccordionElem(2, collapseId2, headerId2, childId1, childId2, level, level3Elem);
                });
                //end level2 accordion
            }  
            contactElem+= generateAccordionElem(1, collapseId1, headerId1, agencyId, childId1, level, level2Elem);
        });
    }
    contactElem += '</div>';
    //end level1 accordion
    return contactElem;
}

let buildDivisionElement = function(divisions, level){
    let content = '';
    if(divisions.length === 1){
        if(divisions[0].staticText != '')
        {
            content = content + '<p>'+ divisions[0][level] +' <a target="_blank" href = "'+ divisions[0].link +'">('+ divisions[0].staticText +')</a></p>';
        }
        else
        {
            content = content + '<p><a target="_blank" href = "'+ divisions[0].link +'">'+ divisions[0][level] +'</a></p>';
        }
        return content;
    }
    else{
        content = '<ul class = "sub-list">';
        for(let i = 0; i< divisions.length; i++)
        {
            if(divisions[i].staticText != '')
            {
                content = content + '<li>'+ divisions[i][level] +'<a target="_blank" href = "'+ divisions[i].link +'">('+ divisions[i].staticText +')</a></li>';
            }
            else
            {
                content = content + '<li><a target="_blank" href = "'+ divisions[i].link +'">'+ divisions[i][level]+'</a></li>';
            }
            addfooter();
        }
        content = content + '</ul>';
        return content;
    }
}
