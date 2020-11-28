  

  const product = {
    plainBurger:{
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get summ(){
            return this.price * this.amount; 
        },
        get Kcall(){
            return this.kcall * this.amount;
        }
    },

    freshBurger:{
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall(){
            return this.kcall * this.amount;
        }
    },

    freshCombo:{
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 700,
        amount: 0,
        get summ(){
            return this.price * this.amount;
        },
        get Kcall(){
            return this.kcall * this.amount;
        }
    }


  }

  /* ///////////////////////////////////// */

  const extraProduct ={
    doubleMayonnaise:{
        name: 'Двойной майонез',
        price: 500,
        kcall: 50
    },

    lettuce:{
        name: 'Салатный лист',
        price:300,
        kcall: 10
    },

    cheese: {
        name: 'Сыр',
        price: 400,
        kcall: 30
    }
  }

  /* ///////////////////////////////////////// */

  const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
        checkExtraProdukt = document.querySelectorAll('.main__product-checkbox'),
        addCart = document.querySelector('.addCart'),
        receipt = document.querySelector('.receipt'),
        receiptOut = document.querySelector('.receipt__window-out'),
        receiptWindow = document.querySelector('.receipt__window'),
        receiptBtn =document.querySelector('.receipt__window-btn');

        for(let i = 0; i < btnPlusOrMinus.length; i++){
            btnPlusOrMinus[i].addEventListener('click', function(){
                plusOrMinus(this)
            })
        }

        function plusOrMinus(element){
                 //console.log(element);

                 let parentId = element.closest('.main__product').getAttribute('id'),
                     out =element.closest('.main__product').querySelector('.main__product-num'),
                     price = element.closest('.main__product').querySelector('.main__product-price span'),
                     kcall = element.closest('.main__product').querySelector('.main__product-call span');


                     if(element.getAttribute('data-symbol') == '+' && product[parentId].amount < 20){
                         product[parentId].amount++
                     }else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0){
                        product[parentId].amount--
                     }

                     out.innerHTML = product[parentId].amount;
                     price.innerHTML = product[parentId].summ;
                     kcall.innerHTML = product[parentId].Kcall;
              
        }

        for(let i = 0; i < checkExtraProdukt.length; i++){
            checkExtraProdukt[i].addEventListener('click', function(){
                addExtraProdukt(this)
            })
        }

        function addExtraProdukt(element){
            const parent = element.closest('.main__product'),
                  parentId = parent.getAttribute('id'),
                  kcall = parent.querySelector('.main__product-call span'),
                  price = parent.querySelector('.main__product-price span'),
                  elArt =element.getAttribute('data-extra');

                  //console.log(elArt);

                  product[parentId][elArt] = element.checked;

                  //console.log( product[parentId][elArt]);

                  if(product[parentId][elArt] == true){
                    product[parentId].kcall += extraProduct[elArt].kcall
                    product[parentId].price += extraProduct[elArt].price
                  }else{
                    product[parentId].price -= extraProduct[elArt].price
                  }

                  kcall.innerHTML = product[parentId].Kcall;
                  price.innerHTML = product[parentId].summ;
        }

        let arrayProduct = [],
            totalName = '',
            totalPrice = 0,
            totalKcall = 0;
 
            

addCart.addEventListener('click', function(){
    for(const key in product){
        const po = product[key];
       if(po.amount > 0){
        arrayProduct.push(po);
        for(const infoKey in po){
            if(po[infoKey] === true){
                po.name += '\n' + extraProduct[infoKey].name;
            }
        }
       }

       po.price = po.summ;
       po.kcall = po.Kcall;
    }

    //console.log(arrayProduct);

for (let i = 0; i < arrayProduct.length; i++){
    const el =  arrayProduct[i];
    totalPrice += el.price;
    totalKcall += el.kcall;
    totalName  += '\n' + el.name + '\n';
}

receiptOut.innerHTML = `Вы куптли: \n ${totalName} \n \n Каллк ${totalKcall} \n \n Стоимость покупки ${totalPrice} сумм`;


receipt.style.display = 'flex';



setTimeout(function(){
   receipt.style.opacity = '1'; 
}, 100);


setTimeout(function(){
    receiptWindow.style.top= '0';
}, 200);


document.body.style.overflow ='hidden';

const outNum = document.querySelectorAll('.main__product-num');
for(let i = 0; i < outNum.length; i++){
    outNum[i].innerHTML = 0;
}

const outPrice = document.querySelectorAll('.main__product-price span');
for(let i = 0; i < outPrice.length; i++){
    outPrice[i].innerHTML = 0;
}

const outKcall = document.querySelectorAll('.main__product-call span');
for(let i = 0; i < outKcall.length; i++){
    outKcall[i].innerHTML = 0;
}



})

receiptBtn.addEventListener('click', function (){
    location.reload();
})







