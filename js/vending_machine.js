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
  candy:{price:0.65,qty:0}
}

class VendingMachine {

  constructor(){
    this.displayMessage = "INSERT COIN";
    this.totalAmount = 0;
    this.insertedCoin={'nickel':0,'dime':0,'quarter':0};
    this.change = 0.00;
    this.loadedCoins = {'nickel':10,'dime':10,'quarter':0};
    if(this.loadedCoins['nickel']==0 &&  this.loadedCoins['dime'] == 0 && this.loadedCoins['quarter'] == 0)
    {
      this.displayMessage = "EXACT CHANGE";
    }

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
        for(let val in this.insertedCoin){
          if(this.insertedCoin[val]>0)
            total = parseFloat(total) + parseFloat(VALID_COIN[val].value)*this.insertedCoin[val];
        }
        this.totalAmount = total.toFixed(2);
   }


   selectItem(itemName){
     let remainingChange=0.00;
     if(PRODUCT[itemName].qty>0) {
          //Product is available checking the price of the item
          if(this.totalAmount>=PRODUCT[itemName].price){
            remainingChange = (parseFloat(this.totalAmount)-parseFloat(PRODUCT[itemName].price)).toPrecision(3);
              console.log('reain',remainingChange);
              //FIXME:fix compute change function with real value
              let changeArr = this.computeChange([25,10, 5],remainingChange*100);
              // let changeArr = this.computeChange([0.25, 0.10, 0.05],0);
              this.change = '0.25*'+changeArr[0];
                  this.change += ' 0.10*'+changeArr[1];
                  this.change += ' 0.05*'+changeArr[2];


              // this.change = "$ "+remainingChange;
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
      if(this.totalAmount>0){
        this.change = this.totalAmount;
        this.displayMessage = 'INSERT COIN';
        this.totalAmount = 0.00;
      }


  }

  //FIXME:change the array to object for more specific result
    computeChange(coins, amount) {
        var i = 0,
            coincount = coins.map(function () { return 0; }); // returns an array and for each element of coins zero
        while (i < coins.length) {
            while (coins[i] <= amount) {
                amount -= coins[i];
                coincount[i]++;
            }
            i++;
        }
        return coincount;
    }


}
