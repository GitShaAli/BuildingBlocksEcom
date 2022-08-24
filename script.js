window.onload=function(){
const cart = document.getElementById('cart');

const parentContainer = document.getElementById('ecom');

parentContainer.addEventListener('click',(e)=>{
    if(e.target.className=='shop-button'){
        const id = e.target.parentNode.parentNode.id;
        const name=document.querySelector(`#${id} h4`).innerText;
        const imageUrl=document.querySelector(`#${id} img`).src;
        const price=e.target.parentNode.firstElementChild.innerText;

        const add_item = document.createElement('div');
        add_item.classList.add('item');
        add_item.setAttribute('id',`item-${id}`);

        add_item.innerHTML = `<span class='cart-items'>
                               <img class='cart-img' src="${imageUrl}" alt="images">
                               Name: <span>${name}</span>
                               
                               Price: <span class='cart-price'>${price}</span>
                               </span>`
        cart.appendChild(add_item);

        const container = document.getElementById('notification-container');
        const notif = document.createElement('div');
        notif.classList.add('toast');
        notif.innerHTML = `<h3><strong style="color:red;">${name}</strong> is added to the cart<h3>`;
        container.appendChild(notif);
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
})
}
