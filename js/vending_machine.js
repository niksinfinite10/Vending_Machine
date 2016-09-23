'use strict'
const COINS = {nickel:{value:0.05,weight:5.00,diameter:21.21},
            dime:{value:0.10,weight:2.26,diameter:17.91},
            quarter:{value:0.25,weight:5.67,diameter:24.26},
            penny:{value:0.01,weight:2.50,diameter:19.05},
            half:{value:0.50,weight:30.61,diameter:11.34},
            dollar:{value:1.00,weight:8.10,diameter:26.50}};

const VALID_COIN ={ nickel:{value:0.05,weight:5.00,diameter:21.21},
                  dime:{value:0.10,weight:2.26,diameter:17.91},
                  quarter:{value:0.25,weight:5.67,diameter:24.26}};

const PRODUCT = {
  cola:{price:1.00,qty:10},
  chips:{price:0.50,qty:10},
  candy:{price:0.65,qty:10}
}

class VendingMachine {

  constructor(){
    this.displayMessage = "INSERT COIN";
  }

//TODO:validate coin more efficiently
  isValidCoin(coin){
     return VALID_COIN[coin]?true:false;
   }

   selectItem(itemName){

     if(PRODUCT[itemName].qty>0) {
        console.log('product available');
        this.displayMessage = "THANK YOU";

      }else{
        console.log('Product is not available');
      }


   }


}
