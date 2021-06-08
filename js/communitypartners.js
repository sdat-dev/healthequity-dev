window.onload = function () {
    let requestURL = "data/communitypartners.json"; 
    let datarequestURL = "data/communitypartnersdata.json"; 
    let request =  axios.get(requestURL);
    let datarequest =  axios.get(datarequestURL);
    let maincontentContainer = document.getElementsByClassName('main-content')[0];
    axios.all([request, datarequest]).then(axios.spread((...responses) => {
        let partnerscontent =  responses[0].data;
        let partners  = responses[1].data;
        let webelements = partnerscontent;
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
        content += '<input id = "search-box" placeholder = "Search Community Partners...">'+
                   '<button id = "search-button" type = "submit"><i class="fa fa-search"></i></button>'+
                   '<br><span id = "search-box-results"></span>';
        content +='<div id="experts-content">'+buildPartnersContent(partners)+'</div>';
        addheader(pageheaders);
        let contentElement = document.createElement('div');
        contentElement.classList.add('content');
        contentElement.innerHTML = content.trim();
        maincontentContainer.appendChild(contentElement);
        addfooter();
        let searchbox = document.getElementById('search-box');
        let searchbutton = document.getElementById('search-button');
        searchbox.onkeyup = searchfunctioncommunity;
        searchbutton.onclick = searchfunctioncommunity;
    })).catch(errors => {
        console.log(errors);
    })
}

let buildPartnersContent = function(partners){

    partners.sort(function(a, b){
        var nameA = a.Q21.toUpperCase(); 
        var nameB = b.Q21.toUpperCase(); 
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    
    let content = '';
    for(var i=0; i< partners.length; i++){
        if(partners[i].Q12 == "")
            continue;
        content +='<div class = "search-container partner-info"><img class = "partner-logo" src = "assets/images/community-partners/'+ ((partners[i]["Q23_Name"] != '' && !partners[i]["Q23_Name"].includes(".docx"))? partners[i].ResponseId+'_'+ partners[i]["Q23_Name"] :'placeholder.jpg') + '"/>'+
        '<h2 class = "content-header-no-margin" style="font-size:30px;">'+ (partners[i].Q22 != ""? '<a class = "no-link-decoration" href = ' + partners[i].Q22 + '>' + partners[i].Q21 + '</a>': partners[i].Q21) +'</h2>'+
        '<div class="display-flex"><div class = "col-sm-12 col-md-6 col-lg-6 poc dont-break-out"><span>Point Of Contact: </span><br>'+ getPointOfContact(partners[i]) + '</div>'+
        '<div class = "col-sm-12 col-md-6 col-lg-6 col-xl-6 address dont-break-out"><span>Address: </span><br>'+ getAddress(partners[i]) + '</div></div>'+
        buildmissionandvision(partners[i])+'</div>';
    }
    return content;
}

let getAddress = function(partner){
    let address = "";
    if(partner.Q25 != ""){
        address += partner.Q25;
    }
    if(partner.Q26 != "")
    {
        address = address == ""? partner.Q26 : (address + "<br> " +  partner.Q26);
    }
    if(partner.Q27 != "")
    {
        address = address == ""? partner.Q27 : (address + "<br>" +  partner.Q27 + ",");
    }
    if(partner.Q28 != "")
    {
        address = address == ""? partner.Q28 : (address + " " +  partner.Q28);
    }
    if(partner.Q29 != "")
    {
        address = address == ""? partner.Q29 : (address + " " +  partner.Q29);
    }
    return address;
}

let getPointOfContact = function(partner){
    let pointofcontact = "";
    pointofcontact += partner.Q12 + " " + partner.Q11+ ",<br> "+ partner.Q15 + '<br> <a class = "email-link" href = mailto:' + partner.Q13 + 
    '>'+ partner.Q13+ '</a>'+ (partner.Q14 == ""? '' : ',<br>'+ formatPhone(partner.Q14)); 
    return pointofcontact;
}

let counter = 1;
let buildmissionandvision = function(partner){
    let missionandvision = "";
    missionandvision = '<p class="mav-header">'+
                        '<button class="btn btn-mav collapsed" style="font-size:20px;" type="button" data-toggle="collapse" data-target="#missionandvision'+ counter +'" aria-expanded="false" aria-controls="missionandvision'+ counter +'">Mission and Vision '+
                        '<i class="fas fa-chevron-up"></i></button>'+
                        '</p>'+
                        '<div class="collapse" id="missionandvision'+ counter +'">'+
                            '<div class="card card-body">'+
                            formatText(partner.Q24) +
                            '</div>'+
                        '</div>';
    counter++;
    return missionandvision;
}

let formatText = function(text){
    let result = '';
    let paras = text.split("\n\n");
    for(var i=0; i< paras.length; i++){
        let para = paras[i];
        if(para.includes("\n") == false && para.search(/d.\t/) == -1)
        {
            result += para;
        }
        else
        {
            let lines = para.split(/\n/);
            if(lines.length == 1)
            {
                result += lines[0]; 
            }
            else
            {
                for(var j =0; j< lines.length; j++)
                {
                    if(lines[j] == '') continue;
                    result += '<p>'+lines[j]+'</p>'; 
                }
            }
        }        
    }
    return result;
}

let formatPhone = function(text){
    let result = text;
    if(isNaN(text) == false){
        result = (text/10000000 |0)+ '-' + ((text/10000)%1000|0) + '-' + text%10000
    }
    return result;
}

let carousel = document.getElementsByClassName('carousel')[0]