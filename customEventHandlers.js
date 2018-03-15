   
   //contains list of custom event handkers
   document.getElementById("encryptBtn").addEventListener("click", encryptMesgs);
   document.getElementById("hideEmojiBtn").addEventListener("click", hideEmojis);
   document.getElementById("hideDelStatusBtn").addEventListener("click", hideMesgDeliveruStatusTicks);

   function encryptMesgs(){
      console.log("custom btn click worked");
      var allMesgsSelector = $(".selectable-text");
        allMesgsSelector.hide();
    }

    //hide emoji type like anger,smile
    function  hideEmojis(){
      var emojisSelectors = $("._3HFgq");
      emojisSelectors.hide();
    }

    function hideMesgDeliveruStatusTicks(){
     var selector = $("._32uRw");
        selector.hide();
    }
