window.onload=function(){
const cart = document.getElementById('cart');

const parentContainer = document.getElementById('ecom');

parentContainer.addEventListener('click',(e)=>{
    if(e.target.className=='shop-button'){
        const id = e.target.parentNode.parentNode.id;
        const name=document.querySelector(`#${id} h4`).innerText;
        const imageUrl=document.querySelector(`#${id} img`).src;
        const price=e.target.parentNode.firstElementChild.innerText;


        let total = parseFloat(document.getElementById('total').innerText);
        total+=parseFloat(price);
        document.getElementById('total').innerText=total;

        const add_item = document.createElement('div');
        add_item.classList.add('item');
        add_item.setAttribute('id',`item-${id}`);

        const cart_body = document.getElementById('cart-body');
        add_item.innerHTML = `<span class='cart-items'>
                               
                               <img class='cart-img' src="${imageUrl}" alt="images">
                               <span style="color:red;">${name}</span>
                               
                               Price: <span class='cart-price'>${price}</span>
                               
                              
                              <button>Remove</button>
                              </span>`
        cart_body.appendChild(add_item);

        const container = document.getElementById('notification-container');
        const notif = document.createElement('div');
        notif.classList.add('toast');
        notif.innerHTML = `<h3><strong style="color:red;">${name}</strong> is added to the cart<h3>`;
        container.appendChild(notif);


        let count = parseInt(document.querySelector('.count').innerText);
        count+=1;
        document.querySelector('.count').innerText=count;

        setTimeout(()=>{
            notif.remove();
        },2500)

    }


    if(e.target.className=='see-cart' || e.target.className=='navCart'){
        cart.style = "display:block;";
    }
    if(e.target.className=='hide'){
        cart.style = "display:none;";
    }
    if (e.target.innerText=='Remove'){
        let cartPrice = document.querySelector('#total').innerText;
        cartPrice = parseFloat(cartPrice).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.count').innerText = parseInt(document.querySelector('.count').innerText)-1
        document.querySelector('#total').innerText = `${cartPrice.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }

})
}
