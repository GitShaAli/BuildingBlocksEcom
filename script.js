window.onload=function(){
const cart = document.getElementById('cart');

const parentContainer = document.getElementById('ecom');


parentContainer.addEventListener('click',(e)=>{

    if (e.target.className=='addCart-button'){
        const productId = Number(e.target.parentNode.parentNode.id.split('-')[1]);
        console.log(productId)
        axios.post('http://localhost:3000/cart', { productId: productId})
        .then(response => {
            if(response.status==200){
                notification(response.data.message);
                const tip = parseInt(document.querySelector('.count').innerText);
                document.querySelector('.count').innerText = tip+1;
                
            }
            else    throw new Error('Unable to add product');
        })
        .catch(err => {
           notification(err, true);
        });

    }

    
    if(e.target.className=='see-cart' || e.target.className=='navCart'){
            axios.get('http://localhost:3000/cart').then(products => {
                for(let i=0;i<products.data.length;i++){
                    
                    const id = products.data[i].id;
                    const name=products.data[i].title;
                    const imageUrl=products.data[i].imageUrl;
                    const price=products.data[i].price;

                    showCart(id,name,imageUrl,price);
                    

                }
            })
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


const parentNode = document.getElementById('section-container');
window.addEventListener('DOMContentLoaded',()=>{
    const parentNode = document.getElementById('section-container');
    axios.get('http://localhost:3000/products').then((products) => {
        console.log(products.data[0])
        for(let i=0;i<products.data.length;i++){
            let productHtml = `
            
                 <div id="album-${products.data[i].id}" class="content">
                     <h4>${products.data[i].title}</h4>
                     <div class="section-image-container">
                        <img class="pImage" src=${products.data[i].imageUrl} alt="">
                     </div>
                                     <div class="prod-details">
                         <span>${products.data[i].price}</span>
                         <button class="addCart-button" type='button'>ADD TO CART</button>
                    </div>
                </div>`
                parentNode.innerHTML += productHtml
        }
    })

    axios.get('http://localhost:3000/cart').then(products => {
        const cartCount = products.data.length;
        document.querySelector('.count').innerText=cartCount;
    })


})


function showCart(id,name,imageUrl,price){
    const check = document.getElementById(`item-${id}`);
    
    if(!check){
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
    }
}

function notification(res){
        const container = document.getElementById('notification-container');
        const notif = document.createElement('div');
        notif.classList.add('toast');
        notif.innerHTML = `<h3><strong style="color:red;">${res}</strong> :)<h3>`;
        container.appendChild(notif);

        setTimeout(()=>{
            notif.remove();
        },2500)
}