let addTopMenu = function(){
    let navheader = document.getElementById('navbar-header');
    let headerContent = '<div class="ualbany-logo-wrapper">'+
                            '<span class="helper">'+
                            '</span>'+
                            '<a href="https://www.albany.edu/">'+
                                '<img class="ualbany-logo" src="assets/images/logo.png" />'+
                            '</a>'+
                            '<div class="topnav-right" style="float: right; display:inline-block; margin-left:730px;">' +
                                '<a href="https://www.albany.edu/myualbany">MYUALBANY</a>'+
                                '<a href="https://www.albany.edu/apply-now">APPLY</a>'+
                                '<a href="https://www.alumni.albany.edu/s/1642/18-giving/landing.aspx?sid=1642&gid=2&pgid=2040&appealcode=uahome">'+
                                '   GIVE</a>'+ 
                            '</div>'+
                            '<div class="searchTop"  style="float: right;">' +
                                '<form class="searchbox"  > '+
                                  '<button type="button" style="padding-left:25px;padding-right:15px; float:right; padding-top:20px;" class="btn1" id="search-toggle">'+
                                        '<span class="fa fa-search" style="line-height: 50px; font-size: 20px;"></i>'+
                                    '</button>'+
                                    '<button type="button" style="padding-left:25px;padding-right:15px; padding-top:20px;" class="btn1 hidden11 " id="times-button">'+
                                        '<span class="fa fa-times" style="line-height: 50px; font-size: 20px;"></i>'+
                                    '</button>'+
                                    '<input type="search" style=" width:0px; height:0px; margin-left:20px; " class="searchbox-input" id="textInput" >'+ 
                                    '<input class="submitButton"  style=" width:0px; height:0px; margin-bottom:5px; margin-left:5px; margin-right:5px;" value="Search" type="submit" onclick="getValue()">'+
                                '</form>'+
                            '</div>'+  
                        '</div>';
   // navheader.innerHTML = headerContent;

    let megamenu = document.getElementById('mega-menu');
    let megemenuContent = '<div class="hh collapse" id="navbarSupportedContent">' +
                                '<div class="row fo">' +
                                    '<div class="col-md-3 coll">'+
                                        '<div class="bor align-self-right">'+
                                            '<ul>'+
                                                '<li class="headingList">INFORMATION FOR</li>'+
                                                '<li id="test_list" class="listSub"><a class="linkforlist" href="https://www.albany.edu/current-students">Current Students </a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/faculty-and-staff">Faculty & Staff</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/admissions">Future/Prospective Students</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/parents-visitors">Parents & Visitors</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.alumni.albany.edu/s/1642/bp19/home.aspx?gid=2&pgid=61">Alumini</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/giving">Donors</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/puerto-rico-usvi-admissions/">Students from Puerto Rico/USVI</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/corporate-engagement">Corporate, Nonprofit and Public-Sector <br />Partners</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-2.5 col2" style="padding-right: 0px;">'+
                                        '<ul>'+
                                            '<li class="headingList">TOPICS</li>'+
                                            '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/about-ualbany">About UAlbany</a></li>'+
                                            '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/academics"> Academics</a></li>'+
                                            '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/admissions"> Admissions</a></li>'+
                                            '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/publicengagement/">Public Engagement</a></li>'+ 
                                            '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/research-ualbany">Research</a></li>'+
                                            '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/schools-colleges-affiliations">Schools, Colleges & Affiliations</a></li>'+
                                            '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/financialaid/">Financial Aid</a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                    '<div class="col-md-2 col1" style="margin-top: 1em; margin-left: 4%;">'+
                                        '<div class="bor ">'+
                                            '<ul>'+
                                                '<li class="headingList"></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/international/"> International Education</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://library.albany.edu/"> Libraries</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/president">Office of the President</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/arts">Arts</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://ualbanysports.com/">Athletics</a></li>'+
                                                '<li class="listSub"><a class="linkforlist" href="https://www.albany.edu/student-life">Student Life</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-2 col2">'+
                                        '<ul>'+
                                            '<li class="headingList">RESOURCES</li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/calendars-and-schedules">Calendars</a></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/admissions#virtualtour"> Virtual Tour</a></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/about/directories.php">People</a></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/pmts">Parking & Transit</a></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/its/">IT Services</a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                    '<div class="col-md-1.5 " style="margin-top: 2em;">'+
                                        '<ul>'+
                                            '<li class="headingList"></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://events.albany.edu/cal/main/showEventList.rdo;jsessionid=npziD_rxShBzkDjVTJfRzRIX5wtUC5BC3yieI27B.bede-svc-p101">Events</a></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/map/">Maps</a></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/a-z-index"> A-Z Index</a></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/news/">News Center</a></li>'+
                                            '<li class="listSub" style="margin-top: -5px;"><a class="linkforlist" href="https://www.albany.edu/career/">Career Services</a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="d-flex justify-content-center" style="height:55px">'+
                                    '<div class=" p-2">'+ 
                                        '<a  href="https://www.albany.edu/main/facebook.shtml">'+
                                            '<span class="fab fa-facebook-f" style="font-size:22px; color:white"></span>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="p-2">'+ 
                                        '<a href="https://www.albany.edu/main/twitter.shtml">'+
                                            '<i class="fab fa-twitter" style="font-size:22px;color:white"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="p-2">'+ 
                                        '<a href="https://www.instagram.com/ualbany/">'+
                                            '<i class="fab fa-instagram" style="font-size:22px; color:white"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="p-2">'+ 
                                        '<a href="https://www.snapchat.com/add/ualbany">'+
                                            '<i class=" fab fa-snapchat" style="font-size:22px; color:white"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="p-2">'+ 
                                        '<a href="https://www.albany.edu/main/youtube.shtml">'+
                                            '<i class=" fab fa-youtube"  style="font-size:22px; color:white"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="p-2">'+ 
                                        '<a href="https://www.albany.edu/main/linkedin.shtml">'+
                                            '<i class="  fab fa-linkedin" style="font-size:22px; color:white"></i>'+
                                        '</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="test">'+
                                '<button id="buttonatag" data-toggle="collapse" data-target=".hh" aria-expanded="false"'+
                                    'aria-controls=".hh" aria-label="Toggle navigation" class="collapsed">'+
                                    'MENU<br><i class="fa fa-bars"></i>'+
                                '</button>'+
                            '</div>';

   megamenu.innerHTML = megemenuContent;
}

addTopMenu();

$('#buttonatag').click(function (e) {


    e.preventDefault(); // Prevent default Browser anchor-click behavior   
    if($(e.target).hasClass("fa") ){ 
        flag_fa=true;
        $("#buttonatag").trigger('click'); 
        console.log("TEST");
    }
    else{

            let innerHTML = this.innerHTML;
            console.log(innerHTML);
            if (innerHTML.includes('MENU') == true) {
                this.innerHTML = 'CLOSE<br><i  class="fa fa-times"></i>';
                console.log("IF");
            }
            else {
                console.log("ELSE");
                this.innerHTML = 'MENU<br><i  class="fa fa-bars"></i>';
            }
        
    }
    

   
});

$(document).ready(function () {
    $(document).click(function (event) {
        var click = $(event.target);
        var _open = $(".hh").hasClass("show");
        if (_open === true && !click.hasClass("collapsed")) {
            $("#buttonatag").click();
        }
    });

    var submitIcon = $('#search-toggle');
    var inputBox = $('.searchbox-input');
    var searchBox = $('.searchbox');
    var isOpen = false;
    submitIcon.click(function(){
       
           $(".topnav-right").animate({ "margin-left":  "416px" },"fast");    

         
            searchBox.addClass('searchbox-open');


            $('#search-toggle').addClass('hidden11');
            $('#times-button').removeClass('hidden11');
            $('.searchTop').css("display","inline");
            setTimeout(showpanel, 200);
    });  
     
    function showpanel(){
        $('.searchbox-input').css("width","200px");  
        $('.searchbox-input').css("height","25px");


        $('.submitButton').css("width","90px");  
        $('.submitButton').css("height","25px");
    }


    $('#times-button').click(function() {
       
          $(".searchBox").toggleClass('hide');
          $('.searchbox-input').css("width","0px");  
          $('.searchbox-input').css("height","0px");
          $('.submitButton').css("width","0px");  
          $('.submitButton').css("height","0px");
          $('#search-toggle').removeClass('hidden11');
          $('#times-button').addClass('hidden11');

          searchBox.removeClass('searchbox-open');

          $(".topnav-right").animate({ "margin-left":  "730px" },"fast");      
        });
});



function buttonUp(){
    var inputVal = $('.searchbox-input').val();
    inputVal = $.trim(inputVal).length;
    if( inputVal !== 0){
        $('.searchbox-icon').css('display','none');
    } else {
        $('.searchbox-input').val('');
        $('.searchbox-icon').css('display','block');
    }
}

$('#navbarSupportedContent').collapse('hide');



function getValue() {
    var text_input = document.getElementById('textInput').value;
    console.log(text_input);
  
  
  if(text_input === ""){
      window.open("https://www.albany.edu/search/search_results.php?cx=009452333206896616693%3Aabbjmkl5yry&cof=FORID%3A11&ie=UTF-8&sa.x=0&sa.y=0&sa=Search&siteurl=www.albany.edu%2F&ref=www.google.com%2F&ss=233j24671j6&q=");
  
  }else{
    window.open("https://www.albany.edu/search/search_results.php?cx=009452333206896616693%3Aabbjmkl5yry&cof=FORID%3A11&ie=UTF-8&sa.x=0&sa.y=0&sa=Search&siteurl=www.albany.edu%2F&ref=www.google.com%2F&ss=233j24671j6&q="+text_input);
  }
  }

