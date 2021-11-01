
let addTopHeader = function () {
    let sidemenu = document.getElementById('navbar');
    sidemenu.classList.add("navbar");
    sidemenu.classList.add("navbar-default");
    sidemenu.classList.add("container-fluid");
    let content = "";
    content += 
    '<div class="container-fluid">'+
    '<div class="navbar-header">'+
        '<div class="region region-navigation"><a href="#" class="menu-burger" title="Toggle Mobile Menu Navigation"><span class="fa fa-bars" role="img" aria-label="mobile menu icon" aria-hidden="true"></span><span class="sr-only">Toggle Mobile Menu Navigation</span></a>'+
            '<section>'+
                '<div class="field field--name-body field--type-text-with-summary field--label-hidden field--item">'+
                    '<div id="logo">'+
                        '<a aria-label="University at Albany Home" href="https://www.albany.edu">'+
                            '<img id="albany-logo-minerva" alt="Minerva" src="https://sdat-dev.github.io/resources/healthequity/assets/images/ualbany/albany-logo-minerva.png">'+
                            '<img id="albany-logo-text" alt="University at Albany" src="https://sdat-dev.github.io/resources/healthequity/assets/images/ualbany/albany-logo-text.png">'+
                            '<img id="albany-logo-mobile" alt="UAlbany" src="https://sdat-dev.github.io/resources/healthequity/assets/images/ualbany/ualbany-logo.png">'+
                        '</a>'+
                    '</div>'+
                    '<nav id="top-nav" aria-label="MyUAlbany and Give Links">'+
                        '<ul>'+
                            '<li><a title="Link to Faculty and Staff Portal" href="https://www.albany.edu/myualbany">MYUALBANY</a></li>'+
                            '<li><a title="Donate to the University" href="https://www.alumni.albany.edu/s/1642/18-giving/landing.aspx?sid=1642&amp;gid=2&amp;pgid=2040&amp;appealcode=uahome">GIVE</a></li>'+
                        '</ul>'+
                    '</nav>'+
                    '<nav id="main-nav" aria-label="Main Navigation Menu">'+
                        '<ul id="main-nav-top">'+
                            '<li><button id="main-nav-toggle"><span class="sr-only">toggle submenu</span></button>'+
                                '<a href="https://www.albany.edu/academics">Academics</a>'+
                                '<ul>'+
                                    '<li><a href="https://www.albany.edu/schools-colleges-affiliations">Schools &amp; Colleges</a></li>'+
                                    '<li><a href="https://www.albany.edu/academics/undergraduate-programs.shtml">Undergraduate Majors</a></li>'+
                                    '<li><a href="https://www.albany.edu/graduate/graduate-programs">Graduate Programs</a></li>'+
                                    '<li><a href="https://www.albany.edu/online-learning">Online Learning</a></li>'+
                                    '<li><a href="https://www.albany.edu/academics/advising.shtml">Academic Advising</a></li>'+
                                    '<li><a href="https://www.albany.edu/registrar/academic_calendar.php">Academic Calendar</a></li>'+
                                    '<li><a href="http://library.albany.edu/">Libraries</a></li>'+
                                '</ul>'+
                            '</li>'+
                            '<li><a href="https://www.albany.edu/admissions">Admissions &amp; Aid<span class="appear"></span></a>'+
                                '<ul>'+
                                    '<li><a href="https://www.albany.edu/admissions-undergraduate">Freshman</a></li>'+
                                    '<li><a href="https://www.albany.edu/admissions-transfer">Transfer</a></li>'+
                                    '<li><a href="https://www.albany.edu/graduate">Graduate</a></li>'+
                                    '<li><a href="https://www.albany.edu/admissions-international">International</a></li>'+
                                    '<li><a href="https://www.albany.edu/cost-aid/tuition-fees">Tuition &amp; Cost</a></li>'+
                                    '<li><a href="https://www.albany.edu/cost-aid/financial-aid">Financial Aid</a></li>'+
                                    '<li><a href="https://www.albany.edu/cost-aid/apply-additional-scholarships ">Scholarships</a></li>'+
                                    '<li><a href="https://www.albany.edu/apply-now">Apply</a></li>'+
                                    '<li><a href="https://www.albany.edu/admissions/tour.php">Visit</a></li>'+
                                '</ul>'+
                            '</li>'+
                            '<li><a href="https://www.albany.edu/student-life">Campus Life</a>'+
                                '<ul>'+
                                    '<li><a href="https://www.albany.edu/housing/index.shtml">Residential Life</a></li>'+
                                    '<li><a href="https://www.albany.edu/pmts">Parking</a></li>'+
                                    '<li><a href="https://www.albany.edu/map/">Maps</a></li>'+
                                    '<li><a href="http://www.ualbanydining.com/">Dining</a></li>'+
                                    '<li><a href="https://www.albany.edu/studentassociation/">Clubs</a></li>'+
                                    '<li><a href="https://www.albany.edu/career/">Career Services</a></li>'+
                                    '<li><a href="https://www.albany.edu/arts">Arts</a></li>'+
                                    '<li><a href="https://www.albany.edu/student-life">Student Life</a></li>'+
                                    '<li class="disappear"><a href="https://ualbanysports.com/">Athletics</a></li>'+
                                '</ul>'+
                            '</li>'+
                            '<li><a href="https://www.albany.edu/about-ualbany">About</a>'+
                                '<ul>'+
                                    '<li><a href="https://www.albany.edu/administration/index.php">Leadership</a></li>'+
                                    '<li><a href="https://www.alumni.albany.edu/">Alumni</a></li>'+
                                    '<li><a href="https://www.albany.edu/publicengagement/">Public Engagement</a></li>'+
                                    '<li><a href="https://www.albany.edu/news-center">News</a></li>'+
                                    '<li><a href="https://events.albany.edu/">Events</a></li>'+
                                    '<li><a href="https://www.albany.edu/main/employment.shtml">Jobs</a></li>'+
                                    '<li><a href="https://www.albany.edu/diversity-and-inclusion ">Diversity &amp; Inclusion</a></li>'+
                                    '<li><a href="https://www.albany.edu/about/directories.php">Staff Directory</a></li>'+
                                    '<li><a href="https://www.albany.edu/a-z-index">A-Z Index</a></li>'+
                                '</ul>'+
                            '</li>'+
                            '<li><a href="https://www.albany.edu/research-ualbany">Research</a>'+
                                '<ul>'+
                                    '<li><a href="https://www.albany.edu/research">Division of Research</a></li>'+
                                    '<li><a href="https://www.albany.edu/undergrad-research">Undergraduate Research</a></li>'+
                                    '<!-- for future:'+
                                    '<li><a href="#">Archives</a></li>'+
                                    '<li><a href="#">Impact</a></li>'+
                                    '-->'+
                                    '<li><a href="https://www.albany.edu/research/research-centers.php">Centers</a></li>'+
                                    '<li><a href="https://www.albany.edu/news-center/experts">Experts</a></li>'+
                                '</ul>'+
                            '</li>'+
                            '<li class="appear"><a href="https://ualbanysports.com/">Athletics</a></li>'+
                        '</ul>'+
                    '</nav>'+

                '</div>'+
            '</section>'+

            '<div class="region region-mobile-navigation">'+
            '<div class="drawer-wrap">'+
                '<section id="block-mobilenav2020"'+
                    'data-block-plugin-id="block_content:dec7b8e7-3499-466e-8026-187dc475eab1"'+
                    'class="block block-block-content block-block-contentdec7b8e7-3499-466e-8026-187dc475eab1 clearfix">'+
                    '<div class="field field--name-body field--type-text-with-summary field--label-hidden field--item">'+
                        '<div id="mobile-nav-holder">'+
                            '<nav id="mobile-nav" aria-label="Mobile Navigation Menu">'+
                                '<ul>'+
                                    '<li>'+
                                        '<div class="mobile-nav-toplink">'+
                                            '<a href="https://www.albany.edu/about-ualbany">About</a>'+
                                            '<button class="mobile-nav-dropdown"><span class="sr-only">toggle about'+
                                                    'menu</span></button>'+
                                        '</div>'+
                                        '<ul>'+
                                        '<li><a href="https://www.albany.edu/administration/index.php">Leadership</a></li>'+
                                        '<li><a href="https://www.alumni.albany.edu/">Alumni</a></li>'+
                                        '<li><a href="https://www.albany.edu/publicengagement/">Public Engagement</a></li>'+
                                        '<li><a href="https://www.albany.edu/news-center">News</a></li>'+
                                        '<li><a href="https://events.albany.edu/">Events</a></li>'+
                                        '<li><a href="https://www.albany.edu/main/employment.shtml">Jobs</a></li>'+
                                        '<li><a href="https://www.albany.edu/diversity-and-inclusion ">Diversity &amp; Inclusion</a></li>'+
                                        '<li><a href="https://www.albany.edu/about/directories.php">Staff Directory</a></li>'+
                                        '<li><a href="https://www.albany.edu/a-z-index">A-Z Index</a></li>'+
                                    '</ul>'+
                                    '</li>'+
                                    '<div class="search-block-form albany-utilities collapse small text-right">'+
                                    '<form class="headerSearchForm form-type-search form-search" method="get"'+
                                    'onsubmit="return albany_search(type.value, albany_URLEncode(keywords.value));">'+
                                    '<select name="type" title="Select Search Type" class="headerSearchSelect"'+
                                        'style="height:27px; display: none">'+
                                        '<option selected="selected" value="GOOGLE">Albany Sites</option>'+
                                    '</select><label class="sr-only" for="global-search">Search UAlbany websites</label>'+
                                    '<input type="text" name="keywords" id="global-search" value="" size="45"'+
                                        'class="headerSearchBox form-search glyphicon-search" /><input type="submit"'+
                                        'name="albanySearch" value="Search" title="Submit Search"'+
                                        'class="headerSearchBtn form-submit search-button btn btn-sm btn-success s3-m-3" />'+
                                '</form>'+
                                    '</div>'+
                                    '<li>'+
                                        '<div class="mobile-nav-toplink">'+
                                            '<a href="https://www.albany.edu/academics">Academics</a>'+
                                            '<button class="mobile-nav-dropdown"><span class="sr-only">toggle academics'+
                                                    'menu</span></button>'+
                                        '</div>'+
                                        '<ul>'+
                                        '<li><a href="https://www.albany.edu/schools-colleges-affiliations">Schools &amp; Colleges</a></li>'+
                                        '<li><a href="https://www.albany.edu/academics/undergraduate-programs.shtml">Undergraduate Majors</a></li>'+
                                        '<li><a href="https://www.albany.edu/graduate/graduate-programs">Graduate Programs</a></li>'+
                                        '<li><a href="https://www.albany.edu/online-learning">Online Learning</a></li>'+
                                        '<li><a href="https://www.albany.edu/academics/advising.shtml">Academic Advising</a></li>'+
                                        '<li><a href="https://www.albany.edu/registrar/academic_calendar.php">Academic Calendar</a></li>'+
                                        '<li><a href="http://library.albany.edu/">Libraries</a></li>'+
                                    '</ul>'+
                                    '</li>'+
                                    '<li>'+
                                        '<div class="mobile-nav-toplink">'+
                                            '<a href="https://www.albany.edu/admissions">Admissions &amp; Aid</a>'+
                                            '<button class="mobile-nav-dropdown"><span class="sr-only">toggle admissions'+
                                                    'menu</span></button>'+
                                        '</div>'+
                                        '<ul>'+
                                        '<li><a href="https://www.albany.edu/admissions-undergraduate">Freshman</a></li>'+
                                        '<li><a href="https://www.albany.edu/admissions-transfer">Transfer</a></li>'+
                                        '<li><a href="https://www.albany.edu/graduate">Graduate</a></li>'+
                                        '<li><a href="https://www.albany.edu/admissions-international">International</a></li>'+
                                        '<li><a href="https://www.albany.edu/cost-aid/tuition-fees">Tuition &amp; Cost</a></li>'+
                                        '<li><a href="https://www.albany.edu/cost-aid/financial-aid">Financial Aid</a></li>'+
                                        '<li><a href="https://www.albany.edu/cost-aid/apply-additional-scholarships ">Scholarships</a></li>'+
                                        '<li><a href="https://www.albany.edu/apply-now">Apply</a></li>'+
                                        '<li><a href="https://www.albany.edu/admissions/tour.php">Visit</a></li>'+
                                    '</ul>'+
                                    '</li>'+
                                    '<li>'+
                                        '<div class="mobile-nav-toplink">'+
                                            '<a href="https://www.albany.edu/student-life">Campus Life</a>'+
                                            '<button class="mobile-nav-dropdown"><span class="sr-only">toggle campus life'+
                                                    'menu</span></button>'+
                                        '</div>'+
                                        '<ul>'+
                                        '<li><a href="https://www.albany.edu/housing/index.shtml">Residential Life</a></li>'+
                                        '<li><a href="https://www.albany.edu/pmts">Parking</a></li>'+
                                        '<li><a href="https://www.albany.edu/map/">Maps</a></li>'+
                                        '<li><a href="http://www.ualbanydining.com/">Dining</a></li>'+
                                        '<li><a href="https://www.albany.edu/studentassociation/">Clubs</a></li>'+
                                        '<li><a href="https://www.albany.edu/career/">Career Services</a></li>'+
                                        '<li><a href="https://www.albany.edu/arts">Arts</a></li>'+
                                        '<li><a href="https://www.albany.edu/student-life">Student Life</a></li>'+
                                        '<li class="disappear"><a href="https://ualbanysports.com/">Athletics</a></li>'+
                                    '</ul>'+
                                    '</li>'+
                                    '<li>'+
                                        '<div class="mobile-nav-toplink">'+
                                            '<a href="https://www.albany.edu/research-ualbany">Research</a>'+
                                            '<button class="mobile-nav-dropdown"><span class="sr-only">toggle research'+
                                                    'menu</span></button>'+
                                        '</div>'+
                                        '<ul>'+
                                            '<li><a href="https://www.albany.edu/research">Division of Research</a></li>'+
                                            '<li><a href="https://www.albany.edu/undergrad-research">Undergraduate Research</a></li>'+
                                            '<li><a href="https://www.albany.edu/research/research-centers.php">Centers</a></li>'+
                                            '<li><a href="https://www.albany.edu/news-center/experts">Experts</a></li>'+
                                        '</ul>'+
                                    '</li>'+
                                    '<li>'+
                                        '<div class="mobile-nav-toplink">'+
                                            '<a href="https://ualbanysports.com/">Athletics</a>'+
                                        '</div>'+
                                    '</li>'+
                                '</ul>'+
                                '<ul class="extra-nav">'+
                                    '<li><a href="https://www.albany.edu/myualbany">MYUAlbany</a></li>'+
                                    '<li><a href="https://www.alumni.albany.edu/s/1642/18-giving/landing.aspx?sid=1642&amp;gid=2&amp;pgid=2040&amp;appealcode=uahome">Give</a>'+
                                    '</li>'+
                                '</ul>'+
                            '</nav>'+
                        '</div>'+
                    '</div>'+
                '</section>'+
            '</div>'+
        '</div>'+

        '<section id="block-albany-searchblockbutton"'+
            'class="search-button block block-block-content block-block-contentf5fc99ed-9b0b-4fef-9f5a-708a4da0e836 clearfix"'+
            'data-block-plugin-id="block_content:f5fc99ed-9b0b-4fef-9f5a-708a4da0e836">'+
            '<div'+
                'class="field field--name-body field--type-text-with-summary field--label-hidden field--item">'+
                '<p><a href="/search-results">Search</a></p>'+
            '</div>'+
        '</section>'+

        '<div class="search-block-form albany-utilities collapse small text-right search-processed">'+
            '<form class="headerSearchForm form-type-search form-search" method="get" onsubmit="return albany_search(type.value, albany_URLEncode(keywords.value));">'+
                '<select name="type" title="Select Search Type" class="headerSearchSelect" style="height:27px; display: none"><option selected="selected" value="GOOGLE">Albany Sites</option></select><label class="sr-only" for="global-search">Search UAlbany websites</label>'+
                '<input type="text" name="keywords" id="global-search" value="" size="45" class="headerSearchBox form-search'+ 
                'glyphicon-search"><input type="submit" name="albanySearch" value="Search" title="Submit Search" '+
                'class="headerSearchBtn form-submit search-button btn btn-sm btn-success s3-m-3">'+
            '</form>'+
        '</div>'+

        '</div>'+
    '</div>'+
'</div>'; 
sidemenu.innerHTML = content;
}

addTopHeader();