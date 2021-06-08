let addfooter = function (relativepath = ".") {
    let footer = document.getElementById("footer");
    let content = "";
    content += 
            '<footer class="footer container-fluid">'+
                '<div class="region region-footer" >'+
                    '<section id="block-footer2020-2" data-block-plugin-id="block_content:58324575-ecf1-412b-b839-09d0cf593aef"'+
                        'class="block block-block-content block-block-content58324575-ecf1-412b-b839-09d0cf593aef clearfix">'+

                        '<div class="field field--name-body field--type-text-with-summary field--label-hidden field--item">'+
                            '<div class="footer-new">'+
                                '<div class="col-sm-12 col-sm-offset-0 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">'+
                                    '<a target="_blank" href="https://www.albany.edu/">'+
                                        '<img alt="University at Albany Logo" class=" img-responsive footer-logo" height="39"'+
                                        'src="'+relativepath+'/assets/images/UAlbany-logo.png" typeof="Image" />'+
                                    '</a>'+
                                    '<p>'+
                                        '<a target="_blank" href="https://www.facebook.com/universityatalbany"><span class="fab fa-facebook-f footer-icon" role="img"'+
                                                'aria-label="Facebook Icon"></span><span class="sr-only">facebook</span></a>'+
                                            '<a target="_blank" href="https://twitter.com/ualbany/"><span class="fab fa-twitter footer-icon" role="img"'+
                                                'aria-label="Twitter Icon"></span><span class="sr-only">twitter</span></a>'+
                                            '<a target="_blank" href="https://www.instagram.com/ualbany/"><span class="fab fa-instagram footer-icon" role="img"'+
                                                'aria-label= "Instagram Icon"></span><span class="sr-only">instagram</span></a>'+
                                            '<a target="_blank" href="https://www.snapchat.com/add/ualbany"><span class="fab fa-snapchat-ghost footer-icon" role="img"'+
                                                'aria-label="Snapchat Icon"></span><span class="sr-only">snapchat</span></a>'+
                                            '<a target="_blank" href="https://www.youtube.com/c/ualbany"><span class="fab fa-youtube footer-icon" role="img"'+
                                                'aria-label="YouTube Icon"></span><span class="sr-only">youtube</span></a>'+
                                            '<a target="_blank" href="https://www.linkedin.com/school/university-at-albany/"><span class="fab fa-linkedin-in footer-icon" role="img"'+
                                                'aria-label="LinkedIn Icon"></span><span class="sr-only">linkedin</span></a>'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="footer-end row">'+
                            '<div class="col-sm-12 col-md-6 address-phone">'+
                            '<a target="_blank" href="https://www.google.com/maps/place/1400+Washington+Ave,+Albany,+NY+12222/@42.6859115,-73.8287166,17z/data=!3m1!4b1!4m5!3m4!1s0x89de0b3ce5c93e45:0x4cdbe8d7b52fa412!8m2!3d42.6859115!4d-73.8265279"'+
                                        'target="_blank">1400 Washington Avenue, Albany, NY 12222</a> | Phone: <a'+
                                        'target="_blank" href="tel:5184423300">518-442-3300</a>'+
                                '</div>'+
                                '<div class="col-sm-12 col-md-6 copyright" style="align:center;">'+
                                '©2021 University at Albany |'+
                                '<a target="_blank" href="https://www.albany.edu/web-services"> Accessibility</a> |'+
                                '<a target="_blank" href="https://wiki.albany.edu/display/public/askit/Internet+Privacy+Policy"> Privacy Policy</a> |'+
                                '<a target="_blank" href="http://www.albany.edu/equity-compliance/"> Title IX</a>'+
                            '</div> '+

                            '</div>'+
                        '</div>'+
                    '</section>'+
                '</div>'+
            '</footer >';


        // '<section id="copyright-content">'+
        //     '<p>© 2020&nbsp;University at Albany</p>'+
        // '</section>';
        footer.innerHTML = content;
}

addfooter();