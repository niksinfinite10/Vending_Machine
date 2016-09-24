'use strict'
const COINENUM = {25:'quarter',10:'dime',5:'nickel'};

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
  cola:{price:1.00,qty:2},
  chips:{price:0.50,qty:5},
  candy:{price:0.65,qty:4}
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


  isValidCoin(coin){
    //FIXME:validate coin more efficiently
     return VALID_COIN[coin]?true:false;
   }

   acceptCoin(coin){
     console.log('beforw insert val',this.loadedCoins);
     this.loadedCoins[coin] += 1;
     this.insertedCoin[coin] += 1;

     this.updateTotal();
     this.displayMessage = "$ "+this.totalAmount;
     console.log('insert val',this.loadedCoins);
  }

  updateTotal (){
        let total = 0;
        for(let val in this.insertedCoin){
          if(this.insertedCoin[val]>0)
            total = parseFloat(total) + parseFloat(VALID_COIN[val].value)*this.insertedCoin[val];
        }
        this.totalAmount = total.toFixed(2);
   }

  reset(){
    //reset the inserted coin stack
    for(let val in this.insertedCoin)
        this.insertedCoin[val]=0;

    this.totalAmount = 0;
  }

   selectItem(itemName){
     let remainingChange=0.00;
     if(PRODUCT[itemName].qty>0) {
          //Product is available checking the price of the item
          if(this.totalAmount >= PRODUCT[itemName].price){
            remainingChange = (parseFloat(this.totalAmount)-parseFloat(PRODUCT[itemName].price)).toPrecision(3);
              // console.log('reain',remainingChange);
              //deduct the quantity from the inventory
              PRODUCT[itemName].qty = PRODUCT[itemName].qty-1;

              this.makeReturnChange(remainingChange);


              let returnChange = this.change;
              //reset the values
              this.reset();
              this.displayMessage = 'THANK YOU';
              return ['THANK YOU','0.00',returnChange];

          }
          else
          {
            this.displayMessage = PRODUCT[itemName].price.toFixed(2);
            let x = this.totalAmount>0?this.totalAmount:PRODUCT[itemName].price.toFixed(2);
            return [x,'INSERT COIN'];
          }
      }
      else {
          this.displayMessage = 'SOLD OUT';
          let y = this.totalAmount>0 ?this.totalAmount:'INSERT COIN';
          return ['SOLD OUT',y];
      }
  }

  makeReturnChange(amount){

    //TODO: fix coin stack with the current coin stack
    let coinStack = [10, 5];
    let changeArr = this.computeChange(coinStack,amount*100);
    for(let i=0;i<changeArr.length;i++){
      this.loadedCoins[COINENUM[coinStack[i]]] = this.loadedCoins[COINENUM[coinStack[i]]]-changeArr[i];
      if(i==0)
        this.change = changeArr[i]>0?COINENUM[coinStack[i]]+''+changeArr[i]:'';
      else
        this.change += changeArr[i]>0?COINENUM[coinStack[i]]+''+changeArr[i]:'';
    }

    //substract the quantity of change coins from the loadedCoins
    // this.loadedCoins['quarter'] = this.loadedCoins['quarter']-changeArr[0];
    // this.loadedCoins['dime'] = this.loadedCoins['dime']- changeArr[1];
    // this.loadedCoins['nickel'] = this.loadedCoins['nickel']-changeArr[2];

    // this.change = changeArr[0]>0?'0.10 x '+changeArr[0]:'';
    // this.change +=changeArr[1]>0?' 0.5 x '+changeArr[1]:'';
    // this.change +=changeArr[2]>0?' 0.05 x '+changeArr[2]:'';
    return this.change;

  }

  returnCoin(){
      if(this.totalAmount>0){
        this.change = this.totalAmount;
        this.makeReturnChange(this.change);
        this.displayMessage = 'INSERT COIN';
        this.reset();
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
