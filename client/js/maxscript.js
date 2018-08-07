/**
 * Created by Malyi on 28.02.18.
 */
(function ($) {
   var winWidth= $(window).width(),nowMoreBtn=$('a.btn-more'),bgtButton=$('div.btn-big'),
       skillsTree=$('div.first')
       ,expTree=$('div.second'),
       ToHead=$('#head');
    /*-------------------START anchor ------------------------*/
    $(' .up a').on("click", function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($(anchor.attr('href')).offset().top)-100
        }, 777);
        e.preventDefault();
        return false;
    });
    /*-------------------END anchor ------------------------*/
    /*----AJAX START*/
     $('button#ajaxBtn').on('click', function() {
         if($('form').find('.error:visible').length != 0  ){
             
         $(this).attr("style","background-color:red!important;");
         
         } else {
             
            $.ajax({
             url:"/message",
             method:"POST",
             data:{
                 validate: false,
                 recaptcha: $('form #g-recaptcha').val()!=''? $('form #g-recaptcha-response').val() : false 
             },
             success:function(res){
                 
                 if(res.responseDesc!=false){
                    $.ajax({
             url:"/message_notbot",
             method:"POST",
             data:{
                 name:$('input[name="name"]').val(),
                 email:$('input[name="email"]').val(),
                 message:$('textarea[name="message"]').val(),
                 validate: true ,
             },
             success:function(res){
               $('button#ajaxBtn').attr("style","background-color:green!important;").html("<h5> I will contact you as  soon as I can</h5>");
                 
             },
             error:function(err){
                $('button#ajaxBtn').attr("style","background-color:red!important;").html("<h5> ERROR </h5>");
             }
             } );
                 } else {
         
                $('button#ajaxBtn').attr("style","background-color:red!important;").html("<h5> You not a human ?</h5>");
         
                     console.log('you not a human ?');
                 }
                 
                
             },
             error:function(err){
                 console.log("error ==="+err);
             },
         });
         }
        
        
     });
    /*----AJAX END*/
    /*----Validation START*/
     $('form#msg-action').validate({
            rules: {
                name: {
                    minlength: 4
                },
                email: {
                    required: true,
                    remote:{
                     url:'/validate_email',
                     method:"POST",
                     data:$('[name="email"]').val(),
                     success:function(res){
                         console.log("validate function resulte =="+res);
                     },
                     error:function(res){
                       
                         console.log("validate function ERROR =="+res);
                     return "no connection to server"
                         
                     },
                    }
                },
                message: {
                    required: true,
                    minlength: 20,
                }
            },
            messages: {
                name: {
                    required: "Please name your salfe",
                    minlength: "You name should be not less than 5 symbols"
                },
                email: {
                    required: "Please enter  your email adress so I can unswear your questions.",
                    error:"Please enter  your email adress so I can unswear your questions."
                },
                message: {
                    required: "Please anter your message",
                }
            },
            errorLabelContainer: "#messageBox",
            onfocusout: function (element) {
        $(element).valid();
    }
        });
    /*----Validation END*/
    $(window).on('scroll',function () {
       This=$(this).scrollTop();//$(window).offset();
        if(This>=450){
            $('div.up').fadeIn();
        }else{
             $('div.up').fadeOut();
        };
    });
    $('.up').on('mouseover', function () {
        var correntState = $(this).find('li').attr('style');
        $(this).find('li').animate({
            'margin-top':'10'
        },1000);
    });
    $('.up').on('mouseout', function () {
        var correntState = $(this).find('li').attr('style');

        $(this).find('li').animate({
            'margin-top':'0'
        },1000);
    });
    nowMoreBtn.on('mouseover, mouseout' ,function () {
   // $(this).off();
     smallRoundDiv=$('div.small-round-div');
        smallRoundDiv.toggleClass('rotate-round');

    });

    nowMoreBtn.on('click' ,function () {

        bgtButton.each(function (index) {
            sec = index!=0?index*1:0.8;
            classAnimation = 'rotateInDown'+(index%2!=0?'Right':'Left');
            $(this).addClass(classAnimation);
            $(this).attr('style',' -webkit-animation-duration: '+sec+'s; animation-duration: '+sec+'s; -webkit-animation-fill-mode: both; animation-fill-mode: both;display:block;');
            if( index==bgtButton.length-1){
                console.log('flag == up');

                $(' footer ').attr('style',' -webkit-animation-duration: '+sec+'s; animation-duration: '+sec+'s; -webkit-animation-fill-mode: both; animation-fill-mode: both;display:block;');

            }
        });
        setTimeout(function () {
            bgtButton.removeClass('rotateInDownRight rotateInDownLeft');
        },4000);

    });
    skillsTree.on('click' ,function () {
    /*  PLace for ajax request*/
        treeSticks=$('section[data-first-tree]  div.squer-container');
        treeSticksHiddenPosts=$('section[data-first-tree]').find('div[style="display: none;"]');
        treeSticksHiddenPostsHeader=$('section[data-first-tree]').find('div.skills-line');
        //
        console.log("treeSticksHiddenPostsHeader height === "+treeSticksHiddenPosts.height());
        time= treeSticks.length*1000;
        $(this).parent('.squer-container').animate({ 'min-height':'100px','margin-top':'0px' },500);
        treeSticks.each(function (i,v) {
            totalTime= i!=0?time/i:time+1000;
          var  flag=false;
          $(this).animate({ 'min-height':(treeSticksHiddenPosts.height()+90)+'px' },totalTime);
            $(this).find('.squer').animate({ 'height':'30px','width':'30px' },totalTime);
/*
         $(this).delay(9000).parent().parent().find('div[style="display: none;"]').addClass(" animated "+(i%2!=0?"rotateInDownRight":"rotateInDownLeft")).attr('style','display:block;');
*/
        });
        setTimeout(function () {

            treeSticksHiddenPosts.attr('style','display:block;');

        },time+2000);

    });
    expTree.on('click' ,function () {
        /*  PLace for ajax request*/
        $.fn.reverse = [].reverse;
       console.log("++++");
        treeSticks=$('section[data-second-tree]  div.squer-container');
        treeSticksHiddenPosts=$('section[data-second-tree]').find('div[style="display: none;"]');
        time= treeSticks.length*1000;
        $(this).parent('.squer-container').animate({ 'min-height':'100px','margin-top':'0px' },500);
        treeSticks.reverse().each(function (i,v) {
            totalTime= i!=0?time/i:time+1000;
            height =i!=treeSticks.length-1?treeSticksHiddenPosts.height()+60:150;
            var  flag=false;
            $(this).animate({ 'min-height':height+'px' },totalTime);
            $(this).find('.squer').animate({ 'height':'30px','width':'30px' },totalTime);

        });
        setTimeout(function () {

            treeSticksHiddenPosts.addClass(" animated rotateInDownRight").attr('style','display:block;');

        },time+2000);

    });

    bgtButton.on('click' ,function () {
    id=$(this).attr('id');
    thisContainerChl=$('section[id="'+id+'-this"]').find('section');
    $('section[id="'+id+'-this"]').slideDown('slow');
        thisContainerChl!==undefined?thisContainerChl.slideDown('slow'):console.log('und');
   if(id=="my-porfolio"){
      setTimeout(function () {
          $('.owl-carousel').owlCarousel({
              loop:true,
              margin:10,
              // merge:true,
              responsiveClass:true,
              autoplay:true,
              autoplayTimeout:1000,
              autoplayHoverPause:true,
              smartSpeed:450,
              //  navContainer:'#and-navowl-container',
              responsive:{
                  600:{
                      items:3,
                      nav:false,
                      margin:0
                  },
                  1000:{
                      items:4,
                      nav:false
                  }
              }
          });
      },1000);
      }
    });


    $('#several-items').carousel({
        interval: 3000
    });
    bigScreenCorousel ();

    //    if(winWidth>=768){bigScreenCorousel ();}

    function bigScreenCorousel () {

        $('#several-items .item').each(function(){
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            if (next.next().length>0) {
                next.next().children(':first-child').clone().appendTo($(this));
            }
            else {
                $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }
        });

    };
})(jQuery);