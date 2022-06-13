

window.addEventListener('click', (e) =>{

    let counter;
    let total;
    const totalSpan = document.querySelector('.price-check__total span');
    let totalPrice = 0
  
    const cartItems = document.querySelector('.price-check__items');



    const calcCartPrice = () =>{
        const cartCheckItems = cartItems.querySelectorAll('.price-check__item')

        cartCheckItems.forEach(item =>{
            const priceEl = item.querySelector('.total__price');
            const currentPrice = parseInt(priceEl.innerHTML)
            totalPrice = totalPrice + currentPrice;
            
            totalSpan.innerHTML = totalPrice + " руб."; 
        })

    }
    
    if(e.target.classList.contains('item-dec__btn') || e.target.classList.contains('item-inc__btn')){
        counter = e.target.closest('.price-item__right-block').querySelector('.counter__span');
    }

    if(e.target.classList.contains('item-dec__btn')){
        if(parseInt(counter.innerHTML) > 0){

            counter.innerHTML = --counter.innerHTML;

            const priceItem = e.target.closest('.price-item');
            const priceItemId = e.target.closest('.price-item').getAttribute('data-id')
            const cartItem = cartItems.querySelector(`[data-id='${priceItemId}']`);
            const itemPrice = priceItem.querySelector('.item-price').innerHTML.slice(0,-1)
            
            
            cartItem.querySelector('.price-check__item-text span').innerHTML = `(${counter.innerHTML})`

            total = cartItem.querySelector('.total__price').innerHTML.slice(0,-4) - itemPrice;

            

            cartItem.querySelector('.total__price').innerHTML = `${total} руб.`

            if(counter.innerHTML == 0){
                cartItems.removeChild(cartItem)
                totalSpan.innerHTML = 0 + " руб."; 
            }   
            calcCartPrice();          
        }
    }
    
    if(e.target.classList.contains('item-inc__btn')){

        counter.innerHTML = ++counter.innerHTML;
        const card = e.target.closest('.price-item')
        
        const productInfo = {
            id: card.getAttribute('data-id'),
            title: card.querySelector('.item-name').innerText,
            price: card.querySelector('.item-price').innerText.slice(0, -1)
        }


        total = productInfo.price * counter.innerHTML;

        
        
        const cartItem = cartItems.querySelector(`[data-id="${productInfo.id}"]`)

        const cartItemHTML = 
        `
        <div class="price-check__item" data-id=${productInfo.id}>
                        <p class="price-check__item-text">${productInfo.title} <span>(${counter.innerHTML})</span> </p>
                        <span class="total__price">${total} руб.</span>
                    </div>`

        
            if(cartItem){
                cartItem.querySelector('.total__price').innerHTML = `${total} руб.`
                cartItem.querySelector('.price-check__item-text span').innerHTML = `(${counter.innerHTML})`
                
            } else {
                cartItems.insertAdjacentHTML('beforeend', cartItemHTML)
            }

            calcCartPrice()
    }
})

