
      let vendingMachin =undefined;
      let dispMsg = '';
      let blicking = undefined;

      window.onload = function(){
        let coinButton = document.querySelectorAll('[data-coin-name]');
        for(let i=0;i<coinButton.length;i++){
              coinButton[i].addEventListener("click", coinInserted);
        }
        vendingMachine = new VendingMachine();
        printMessage(vendingMachine.displayMessage);
      }

      function printMessage(mesg,msgbox){
        if(msgbox)
          document.getElementById('returnBox').value = mesg;
        else{
          //TODO: display message for sold item more efficiently
          document.getElementById('displayMessage').value = mesg;
        }
      }

    function clearBlinking(){
      console.log('interval is not clearing');
      clearInterval(window.blicking);
      window.blicking = false;
    }

    function blickingMsg(msgArr){
      let i =0;
      //FIXME: dynamicaly shows the messages
      clearBlinking();
      window.blicking =  setInterval(function(){
          if(i%2==0)
            document.getElementById('displayMessage').value = msgArr[0];
          else
            document.getElementById('displayMessage').value = msgArr[1];
          i++;
        },500);
    }

      function buyItem(item){
          console.log('this is console',item);
           let result = vendingMachine.selectItem(item);
           let i =0;
           if(result[0] === 'THANK YOU')
              printMessage(result[2],'returnBox');
           blickingMsg(result);
        }

      function returnCoin(){
          clearBlinking();
          vendingMachine.returnCoin();
          printMessage(vendingMachine.change,'returnBox');
          printMessage(vendingMachine.displayMessage);
      }

        function coinInserted(){
          clearBlinking();
          let coinName = this.getAttribute("data-coin-name");
          if(vendingMachine.isValidCoin(coinName)){
              vendingMachine.acceptCoin(coinName);
            printMessage(vendingMachine.displayMessage);
          }
          else{
            printMessage('Not valid coin',"returnBox");
            setTimeout(function(){ printMessage('',"returnBox");}, 500);
          }
}
