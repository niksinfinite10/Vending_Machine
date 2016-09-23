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
    this.totalAmount = 0;
    this.insertedCoin={'nickel':0,'dime':0,'quarter':0};
    this.change = 0.00;
  }

  //TODO:validate coin more efficiently
  isValidCoin(coin){
     return VALID_COIN[coin]?true:false;
   }

   acceptCoin(coin){
     this.insertedCoin[coin] = this.insertedCoin[coin]+1;
     this.updateTotal();
     this.displayMessage = "$ "+this.totalAmount;
  }

  updateTotal (){
        let total = 0;
        for(let val in this.insertedCoin)
          if(this.insertedCoin[val]>0)
            total = parseFloat(total) + parseFloat(VALID_COIN[val].value)*this.insertedCoin[val];
        this.totalAmount = total.toFixed(2);
   }

   selectItem(itemName){
     let remainingChange=0.00;
     if(PRODUCT[itemName].qty>0) {
          //Product is available checking the price of the item
          if(this.totalAmount>=PRODUCT[itemName].price){
            remainingChange = (parseFloat(this.totalAmount)-parseFloat(PRODUCT[itemName].price)).toPrecision(2);
              console.log('reain',remainingChange);
              //FIXME: display the correct floating point value
              this.change = "$ "+remainingChange;
              this.displayMessage = 'THANK YOU';
          }
          else
          {
            this.displayMessage = "$ "+PRODUCT[itemName].price.toFixed(2);
          }
      }
      else {
          this.displayMessage = 'SOLD OUT';
      }
  }

//FIXME: return the change with the coin name
  returnCoin(){

      this.change = this.totalAmount;
      this.displayMessage = '$ 0.00';
      this.totalAmount = 0.00;
  }


}
