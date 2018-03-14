//iclude jquery js file here

$(document).ready(function(){

    var mesgMaskOut="C:\\Users\\Out";
    var mesgMaskIn="C:\\Users\\In> ";

    function replaceMicWithLink(){
     $("div.block-compose").find(".btn-icon").insertAfter("<button onclick='alert(1)'>A</button>");
       //  $("div.block-compose").find(".btn-icon").hide();
    }


    function maskTitle(){
        $("title").off("DOMSubtreeModified");
        $("#favicon").off("DOMAttrModified");

        $("title").text("commands Test Window");
        $("#favicon").attr("href","https://cdn.sstatic.net/stackoverflow/img/favicon.ico?v=4f32ecc8f43d");
        $("title").on("DOMSubtreeModified",maskTitle);
         $("#favicon").on("DOMAttrModified",maskTitle);

    }

    function addCssRule(rule, css) {
        css = JSON.stringify(css).replace(/"/g, "").replace(/,/g, ";");
        $("<style>").prop("type", "text/css").html(rule + css).appendTo("head");
    }
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === "class") {
                var attributeValue = $(mutation.target).prop(mutation.attributeName);
                console.log("Message delivery status changes:", attributeValue);
                 maskMessages();
            }
        });
    });

    function maskMessages(){
       //  unbinding DOMNodeInserted event to avoid infinite loop
       $('.pane-chat-msgs .message-list').off('DOMNodeInserted');

        console.info("message list changes");


        /**
        * chat message box consists of two main parts 1) Actual text 2) meta data of text mesg like delivery status read,delivered,etc.
        * vW7d1=> Element with this class represnts entire text box both IN and OUT mesgs.
        * type of messsage is detected by css class names say for eaxmple "message-out" and "message-in" represets out message and In messages respectively.
        *
        * Below structure explains how the message boxes oragnised by whatsapp
        *
        *    messgebox "div.vW7d1"
        *       |
        *       |- typeof message "div.message-out" or "div.message-in"
        *            |
        *            |-one parent div which holds both text and delivey status "div.Tkt2p"
        *               |-actual mesg text "span.selectable-text"
        *               |-delivey status  ""
        */

        const selectors={
          'rootMesg': "div.vW7d1",
          'inMesg': "div.message-in",
          'outMesg': "div.message-out",
          'text': "span.selectable-text",
          'deliveryStatus': "span[data-icon='msg-dblcheck-ack']"

        };


        $(`${selectors.rootMesg}[ismasked!='true']`).each(function(){

            if(($(this).find(".message-out").length>0) && ($(this).attr("ismasked")!="true")){

                var mesgEle=$(this).find(".message-out .bubble-text .message-text .emojitext");
                var mesgMetaEle=$(this).find(".message-out .bubble-text .message-meta .icon");


                var readStatus="";
                if(mesgMetaEle.hasClass("icon-msg-dblcheck-ack")){
                    $(this).attr("ismasked","true");
                    readStatus="\\Read> ";
                }else if(mesgMetaEle.hasClass("icon-msg-check")){
                    readStatus="\\Not Delivered> ";
                }else if(mesgMetaEle.hasClass("icon-msg-dblcheck")){
                    readStatus="\\Delivered> ";

                }else{
                    readStatus="\\unknown state> ";
                }
                $(this).find(".message-meta").css({"text-indent":"-1000px"});

                var mesg=mesgEle.text();

                var prelen=mesgEle.attr("mesgPrefixlength");
                if(typeof prelen!='undefined'){
                 mesg=mesg.slice(prelen);
                }

                var mesgPrefix=mesgMaskOut+readStatus;
                mesgEle.attr("mesgPrefixlength",mesgPrefix.length)

                mesgEle.text(mesgPrefix+mesg);

                //adding listener on delivery status of mesg
                try{
                 observer.observe(mesgMetaEle[0],  { attributes: true });
                }catch(e){
                }

            }else if($(this).find(".message-in").length>0){
                $(this).attr("ismasked","true");
                var inMesgEle=$(this).find(".message-in .bubble-text .message-text .emojitext");
                var inMesg=mesgMaskIn+inMesgEle.text();

                inMesgEle.text(inMesg);
            }
        });

         $('.pane-chat-msgs .message-list').bind('DOMNodeInserted', maskMessages);

    }


     function test(){



         $(".app-wrapper::after").css({"display":"none"})
         $(".app-wrapper, .app-wrapper-main").attr("style", "opacity: 0.3 !important;");

         $("#app,.app").attr("style", "background: #000 !important");
         $(".pane-body").attr("style", "background: #000 !important");
         $("#main").attr("style", "background: #000 !important");

         $(".message-list").attr("style", "background:#000 !important");

         $("footer").attr("style", "background:#000 !important");
         $(".bubble-text").attr("style", "background:#000 !important");
         $("div.message-list").attr("style", "background:#000 !important");

         //hiding day of the week
         $(".message-system-body").attr("style", "background:#000 !important;color:#fff !important");


          //message box styles
         //pane-chat-msgs

         $(".pane-chat-body").attr("style", "background:#ccc !important;");
         $(".pane-chat-msgs .message-list .msg").attr("style", "background-color:#000 !important;padding:0px;");

         $(".pane-chat-msgs .message-list .message-out").attr("style", "background-color:#000 !important");
         $(".message-out .bubble div.message-text").css({"color":"#fff"});

         $(".pane-chat-msgs .message-list .message-in").attr("style", "background-color:#000 !important");
         $(".message-in .bubble div.message-text").css({"color":"#fff"});

         $(".message-in,.message-out").css({"float":"left","max-width":"80%"});

         //hiding the contact header
         $(".pane-header").hide();

         replaceMicWithLink();


         //listener fn when mesg sent or receieved
         $('.pane-chat-msgs .message-list').bind('DOMNodeInserted', maskMessages);

          $("#title").on("DOMSubtreeModified",maskTitle);
          $("#favicon").on("DOMAttrModified",maskTitle);



    }


    const constants ={
      'cmdLinePlaceHolder':"C:\\Users\\hkolli.FTDCORP>",
      'mesgMaskOut': "C:\\Users\\Out",
      'mesgMaskIn': "C:\\Users\\In> ",
      'delveryStatuses' : ''

    };

    function log(msg){
      console.log("-----start---"+log.caller.toString()+"-----------");
      console.log(msg);
      console.log("-------end----"+log.caller.toString()+"--------");
    }

    function maskInputTextbox(){

         $("div._39LWd").before(`<span style='color:#fff'> ${constants.cmdLinePlaceHolder} </span>`);

        //changing the place holder of textbox 'Type a message' to 'Enter the npm command'
        $("._39LWd").text('Enter the npm command..');

      }


    //Add ur css classes here ..thess will be added to existing style sheet.
    function applyClassesToStyleSheet(){

     $("<style type='text/css' id='dynamic' />").appendTo("head");

     var styles=`
       ${ removeMainPageStyles() }
       ${ hideSideContacts() }
       ${ hideDPHeader() }
       ${ removeDefaultMesgStyles() }
       ${ removeBottomTextBoxStyles() }
       ${ removeMiddleNotificationStyles() }

      /* ==== styles to reomve extra corners in message boxes starts ========*/
      .tail-container{
         display:none !important;
       }
      .message-out .tail-container.highlight{
         display:none !important;
       }
      .tail-override-right .tail-container{
         display:none !important;
       }
       /* styles to reomve extra corners in message boxes ends*/

      /* ===== util classes =======*/
      .none{
        display: none !important;
      }

        `;


        $("#dynamic").text(styles);

    }

    function removeBottomTextBoxStyles(){

     maskInputTextbox();

     //retun the new styles for input textbox
     return `

        /*=========bottom textbox styles styles======= */
        ._3oju3{
          background-color:#000 !important;
        }
        ._2bXVy{
          background-color:#000 !important;
          border-color:#000 !important;
        }

        ._3F6QL{
          color:#fff !important;
        }

        ._3F6QL div._39LWd{
          left:200px !important;
        }


      `;

    }


    //side bar or contacts widget tweaks
    function hideSideContacts(){
      $("._3q4NP .k1feT").hide();
      $("#side").hide();

      return `
          ._3q4NP .k1feT{
             display:none;
           }

       `;

    }

    //removes default styles for messages
    function removeDefaultMesgStyles(){
      return `

         /* =========out message box styles starts=========*/
          .message-out{
           background-color:#000 !important;
           color:#efefef !important;

          }
       /* out message box styles ends*/


       /* =========in message box styles starts=========*/
          .message-in{
           background-color:#000 !important;
           color:#efefef !important;
          }
       /* in message box styles ends*/

         .message-out, .message-in{
             float:left !important;
             width:80% !important;

          }

        //Y9G3K is for quoted mesg styles meaning i.e (reply to sent mesg)
       .Y9G3K{
           color:#fff !important;
       }

      `;

    }

    function removeMainPageStyles(){
     return `

       /* ======global page background colors styles====*/
        .app-wrapper::after{
           background: #000 !important
        }


      `;

    }

    //removes middle notifications like "1 Unread Message" in the middle of the chat window
    function removeMiddleNotificationStyles(){
        return `
            .vW7d1 ._3rjxZ, ._1mq8g{
               display:none;
            }
        `;
    }


    //fn to hide contact name,dp header
    function hideDPHeader(){

        return `

         /* =========dp header styles ==========*/
         header._3AwwN{
               display:none;
        }


        `;
    }


     //apply extra styles to IN mesgs
    function convertInMesgStyles(){

    }


    //apply extra styles to OUT mesgs
    function convertOutMesgStyles(){

    }


    //get actual text from chat so that we can apply some masks/styles on it.
    function textExtractorFromMesg(){


    }

    function hideEmjoi(){

    }


    //detect emoji type like anger,smile
    function  detectEmojiType(){


    }

    var checkExist=setInterval(function(){
          if(($("header").length>0) && ($("footer").length>0) ){

        //   hideGlobalPageBgColors();
           applyClassesToStyleSheet();

           //removeDefaultMesgStyles();
           convertInMesgStyles();
           convertOutMesgStyles();

           test();
           maskTitle();

           addCssRule("",{});
           clearInterval(checkExist);

          }
    },10000);



});


