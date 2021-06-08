let requestURL = "data/fundingopportunity.json";
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.onload = function () {
    const webelementsjson = request.response;
    //condition for checking if browser is Internet Explorer
    let webelements = ((false || !!document.documentMode)) ? JSON.parse(webelementsjson) : webelementsjson;
    let contentElement = document.getElementsByClassName('content')[0];
    let content = getContent(webelements);
    contentElement.innerHTML = content;
    maincontentContainer.appendChild(contentElement);
    addfooter();
    addSpinData();
}

let addSpinData = function () {
    let spinURL = "https://spin.infoedglobal.com/Service/ProgramSearch";
    var data = {
        PublicKey: "96183961-68B2-4B14-AEA3-376E734380CD",
        InstCode: "SUNYALB",
        signature: "97707afe4847b9862f27c9ce80a9cb6e",
        responseFormat: 'JSONP',
        pageSize: 3000,
        columns: ["synopsis", "id", "spon_name", "NextDeadlineDate", "total_funding_limit", "programurl", "sponsor_type", "prog_title", "revision_date", "deadline_note"],
        isCrossDomain: true,
        callback: 'parseData',
        keywords: '[SOLR]keyword_exact:"Health Disparities"',
        uniqueId: '801E4DCB-736C-4601-B'
    };

    let params = new URLSearchParams(data).toString();
    let final_url = spinURL + '?' + params;

    $.ajax({
        url: final_url,
        dataType: 'jsonp',
        success: function (dataWeGotViaJsonp) {
            console.log(dataWeGotViaJsonp);
        }
    });
}


function getAccordiationData(p) {

    //getting content Element to append grants information 
    var covid_data = p;
    let distinctCategories = ['NIH', 'NSF', 'Federal - Others', 'Others'];
    let FederalsubCategories = ['Federal - All CDC', 'Federal - All HHS', 'Federal - All DoD', 'Federal - All DoE'];
    let content = '<div class="panel-group" id = "accordion-ops" role="tablist" aria-multiselectable="true">';
    let counter = 1;

    for (var k = 0; k < distinctCategories.length; k++) {
        var NSF_arr = [];
        var NIH_arr = [];
        var federal_arr = [];

        var others = [];
        var length = 0;
        var img_url = "";
        var arr = [];
        for (var j = 0; j < covid_data.Programs.length; j++) {
            var programs_value = covid_data.Programs[j];

            if (programs_value.spon_name.includes('NSF') ||
                programs_value.spon_name.includes('National Science Foundation') ||
                programs_value.spon_name === "Directorate for Engineering/NSF"
            ) {
                NSF_arr.push(programs_value);
            }
            else if (programs_value.spon_name.includes('NIH') ||
                programs_value.spon_name.includes('DHHS')
                || programs_value.spon_name.includes('National Institute of Health')
                && !NIH_arr.includes(programs_value)
            ) {
                NIH_arr.push(programs_value);

            }
            else if (distinctCategories[k] == 'Federal - Others') {
                if (programs_value.sponsor_type == 'US Federal' && !programs_value.spon_name.includes('DHHS') &&
                    !programs_value.spon_name.includes('NIH') && !programs_value.spon_name.includes('NSF')) {
                    federal_arr.push(programs_value);
                }
            }
            else {
                if (distinctCategories[k] == 'Others') {
                    if (programs_value.sponsor_type != 'US Federal' &&

                        !federal_arr.includes(programs_value) && !NIH_arr.includes(programs_value)
                    ) {

                        others.push(programs_value);
                    }
                }
            }
        }

        if (distinctCategories[k] == 'NSF') {
            length = NSF_arr.length;
            arr = NSF_arr;
            img_url = "assets/logos-funding-opportunities/nsf.png";
        }

        if (distinctCategories[k] == 'NIH') {
            length = NIH_arr.length;
            arr = NIH_arr;
            img_url = "assets/logos-funding-opportunities/NIH-logo.png";


        }
        if (distinctCategories[k] == 'Federal - Others') {
            length = federal_arr.length;
            arr = federal_arr;
            img_url = "assets/logos-funding-opportunities/SPIN_logo.png";

        }

        if (distinctCategories[k] == 'Others') {
            length = others.length;
            arr = others;
            img_url = "assets/logos-funding-opportunities/SPIN_logo.png"

        }


        let categoryHeader = distinctCategories[k] + ' (<span class="noofsolis">' + length + '</span> Solicitations)';
        console.log("categoryHeader", categoryHeader);
        let accordionContent = generateFederalAccordionContent(arr, img_url, distinctCategories[k]);
        let collapseId = "collapse" + counter;
        let headerId = "heading" + counter;
        let childId = "child" + counter;
        let accordionElem = generateAccordionElem(1, collapseId, headerId, "accordion-ops", childId, categoryHeader, accordionContent);
        content = content + accordionElem;
        counter++;
    }
    content += '</div>';

    let accordionElement = document.getElementById('fundingopps');
    accordionElement.classList.add('accordion-container');
    accordionElement.innerHTML = content.trim();
    maincontentContainer.appendChild(accordionElement);
}

let generateFederalAccordionContent = function (arr, img_url, funding_name) {
    let content = '';
    var today = new Date();
    var flag = false;
    var flag_defunct = true;

    arr.sort(function(a, b) {
        var deadlineDate_a = new Date();
        var deadlineDate_b = new Date();
        if (a.NextDeadlineDate != null) {
    
            if (a.NextDeadlineDate.length <= 11) {
                deadlineDate_a = new Date(a.NextDeadlineDate);
            }
            else {
                var dateArr = a.NextDeadlineDate.split(" ");
                deadlineDate_a = new Date(dateArr[0]);
            }
        }
    
        if (b.NextDeadlineDate != null) {
    
            if (b.NextDeadlineDate.length <= 11) {
                deadlineDate_b = new Date(b.NextDeadlineDate);
            }
            else {
                var dateArr = b.NextDeadlineDate.split(" ");
                deadlineDate_b = new Date(dateArr[0]);
            }
        }   
        return deadlineDate_a-deadlineDate_b;
    });

    for (let i = 0; i < arr.length; i++) {
        flag = false;
        var dueDate = "";
        var deadlineDate = "";
        var Estimated_Funding = "";
        if (arr[i].NextDeadlineDate != null) {
            if (arr[i].NextDeadlineDate.length <= 11) {
                dueDate = arr[i].NextDeadlineDate;
                deadlineDate = new Date(arr[i].NextDeadlineDate).toLocaleDateString();
            }
            else {
                var dateArr = arr[i].NextDeadlineDate.split(" ");
                dueDate = arr[i].NextDeadlineDate.substring(1, 11);
                deadlineDate = new Date(dateArr[0]).toLocaleDateString();

            }
        } else {
            dueDate = "Continuous Submission/Contact the Program Officer"
            flag = true;
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        if (arr[i].total_funding_limit === 0) {
            Estimated_Funding = "N/A";
        } else {
            Estimated_Funding = formatter.format(arr[i].total_funding_limit);
        }

        var image_name = getImageName(arr[i].spon_name).toLowerCase();
        if (funding_name === 'Federal - Others') {
            var url_image = "assets/logos-funding-opportunities/" + image_name + ".png";
            var image = new Image(url_image);

            if (image_name === "cfgh" ||
                image_name === "cdc") {
                img_url = "assets/logos-funding-opportunities/cdc.png";
            }

            else if (image_name === "dotaf" ||
                image_name === "dota" ||
                image_name === "dla" ||
                image_name === "dova" ||
                image_name === "dohs" ||
                image_name === "dod"
            ) {
                img_url = "assets/logos-funding-opportunities/dod.png";

            }
            else if (image_name === "niofaadoa"
                || image_name === "arsdoa"
            ) {
                img_url = "assets/logos-funding-opportunities/" + image_name + ".png";
            }
            else {
                if (checkFileExists(url_image)) {
                    img_url = url_image;
                }
                else {
                    img_url = "assets/logos-funding-opportunities/SPIN_logo.png";
                }
            }
        }
        if (funding_name === 'Others') {
            var url_image = "assets/logos-funding-opportunities/" + image_name + ".png";
            var image = new Image(url_image);
            if (checkFileExists(url_image)) {
                img_url = url_image;
            }
            else {
                img_url = "assets/logos-funding-opportunities/SPIN_logo.png";
            }
        }
        var description = arr[i].synopsis.replace(/<[^>]*>/g, '');
        if (dueDate != "Continuous Submission/Contact the Program Officer") {
            if (dueDate > today) {
                flag = true;
                dueDate = deadlineDate;
            }
        }
        let imageElement = (arr[i].logo == '') ? '' : '<div class = "col-xl-2 col-lg-3"><img class = "agency-logo" src = "' + img_url + '" /></div>';
        content = content + '<div class = "display-flex opportunity-container search-container">' + imageElement +
            '<div class = "col-xl-10 col-lg-9">' + '<h4 class = "opp-header black-content-header-no-margin">' + arr[i].prog_title + '</h4>' + '<div class = "opp-details display-flex">' +

            '<div class = "col-sm-12 col-md-12 col-lg-12 col-xl-6">' +
            '<i class="fas fa-flag"></i> <strong>Agency Name: </strong>' + arr[i].spon_name +
            '<br>' +
            '<i class="fas fa-dollar-sign"></i> <strong>Estimated Funding: </strong>' + Estimated_Funding +
            '<br>' +
            '</div><div class = "col-sm-12 col-md-12 col-lg-12 col-xl-6">' +
            '<i class="fas fa-calendar-day"></i> <strong>Date: </strong>' + dueDate +
            '<br></div></div></div>' +
            '<p class = "opp-description">' + description + '</p>';
        if (arr[i].deadline_note != null) {
            content += buildduedatenote(arr[i].deadline_note);
        }
        content += '<p class="width100"><button type = "button" class = "details-button" onclick = "location.href = \'' + arr[i].programurl + '\'">View Details</button></p></div>';
    }
    return content;
}

let counter = 1;
let buildduedatenote = function (deadlinenote) {
    let content = "";
    content = '<p class="mav-header">' +
        '<button class="btn btn-mav details-button collapsed" type="button" data-toggle="collapse" data-target="#deadlinenote' + counter + '" aria-expanded="false" aria-controls="deadlinenote' + counter + '">Due Date Note ' +
        '<i class="fas fa-chevron-up"></i></button>' +
        '</p>' +
        '<div class="collapse" id="deadlinenote' + counter + '">' +
        '<div class="card card-body">' +
        deadlinenote +
        '</div>' +
        '</div>';
    counter++;
    return content;
}

let getImageName = function (sponser_name) {
    if (sponser_name.split(" ").length == 1) {
        return sponser_name;
    }
    var matches = sponser_name.match(/\b(\w)/g);
    return matches.join('');
}

let checkFileExists = function (url) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

var parseData = function (p) {
    data = p;
    if (p.ErrorType != null) {
        if ($('#waiter').is(':visible')) $('#waiter').hide();
        alert(p.ErrorType + '\n' + p.ErrorMessage);
        return;
    }
    getAccordiationData(p);
};