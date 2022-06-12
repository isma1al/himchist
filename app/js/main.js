

window.addEventListener('click', (e) =>{
    let counter;

    if(e.target.classList.contains('item-dec__btn') || e.target.classList.contains('item-inc__btn')){
        counter = e.target.closest('.price-item__right-block').querySelector('.counter__span');
    }
    

    if(e.target.classList.contains('item-dec__btn')){
        if(parseInt(counter.innerHTML) > 0){
            counter.innerHTML = --counter.innerHTML;
        }
    }
    
    if(e.target.classList.contains('item-inc__btn')){

        

        counter.innerHTML = ++counter.innerHTML;
        const card = e.target.closest('.price-item')
        
        const productInfo = {
            id: card.getAttribute('data-id'),
            title: card.querySelector('.item-name').innerText,
            price: card.querySelector('.item-price').innerText
        }

        const cartItems = document.querySelector('.price-check__items');

        const parent = document.querySelector('.price-check__items');
        const cartItem = cartItems.querySelector(`[data-id="${productInfo.id}"]`)

        const cartItemHTML = 
        `
        <div class="price-check__item" data-id=${productInfo.id}>
                        <p class="price-check__item-text">${productInfo.title} <span>(${counter.innerHTML})</span> </p>
                        <span>${productInfo.price}</span>
                    </div>`

        
            if(cartItem){
                cartItem.querySelector('.price-check__item-text span').innerHTML = `(${counter.innerHTML})`
            } else {
                parent.insertAdjacentHTML('beforeend', cartItemHTML)
            }

        
    }
})

