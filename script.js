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
        const pageNumber = 1;
            axios.get(`http://localhost:3000/cart/?page=1`).then(products => {
                console.log(products.data)
                for(let i=0;i<products.data.length;i++){
                    
                    const id = products.data[i].id;
                    const name=products.data[i].title;
                    const imageUrl=products.data[i].imageUrl;
                    const price=products.data[i].price;
                    const quantity=products.data[i].cartItem.quantity
                    showCart(id,name,imageUrl,price,quantity);
                    

                }
            })
            cart.style = "display:block;";    
    }


    if(e.target.className=='see-cart' || e.target.className=='navCart'){
        const pageNumber = 1;
            axios.get(`http://localhost:3000/cart/?page=1`).then(products => {
                console.log(products.data)
                for(let i=0;i<products.data.length;i++){
                    
                    const id = products.data[i].id;
                    const name=products.data[i].title;
                    const imageUrl=products.data[i].imageUrl;
                    const price=products.data[i].price;
                    const quantity=products.data[i].cartItem.quantity
                    showCart(id,name,imageUrl,price,quantity);
                    

                }
            })
            cart.style = "display:block;";    
    }


    if(e.target.className=='cButton'){
        const remElementCart = document.getElementById('showAllC');
        remElementCart.remove(); 
        const pageNumber = e.target.innerHTML;
            axios.get(`http://localhost:3000/cart/?page=${pageNumber}`).then(products => {

                const cart_body = document.getElementById('cart-body');
                let remElementsCo = document.createElement("div");
                remElementsCo.setAttribute("id", "showAllC");
                cart_body.appendChild(remElementsCo)
                for(let i=0;i<products.data.length;i++){
                    
                    const id = products.data[i].id;
                    const name=products.data[i].title;
                    const imageUrl=products.data[i].imageUrl;
                    const price=products.data[i].price;
                    const quantity=products.data[i].cartItem.quantity
                    showCart(id,name,imageUrl,price,quantity);
                    

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

    if(e.target.className=='pButton'){
        const remElement = document.getElementById('showAll');
        remElement.remove();     
        const pageNumber = e.target.innerHTML;
        axios.get(`http://localhost:3000/?page=${pageNumber}`).then((res) => {
            showProducts(res.data.products);
            console.log(res.data.totalItem);
        })
        
    }

})
}





window.addEventListener('DOMContentLoaded',()=>{
    const pageNumber = 1;

        axios.get(`http://localhost:3000/?page=${pageNumber}`).then((res) => {
            showProducts(res.data.products);
            const totalPage=res.data.totalIem;
            const currentPage=res.data.page;
            const hasNext=res.data.hasNext;
            const hasPrev=res.data.hasPrev;
            const nextPage=res.data.nextPage;
            const prevPage=res.data.prevPage;
            const lastPage=res.data.lastPage;
    })

    
    axios.get(`http://localhost:3000/cart/?page=${pageNumber}`).then(products => {
        const cartCount = products.data.length;
        let tot=0;
        for(let i=0;i<products.data.length;i++){
            let quant = parseInt(products.data[i].cartItem.quantity);
            tot+=quant;
        }
        document.querySelector('.count').innerText=tot;
    })


})
 



function showProducts(products){
    const parentNode = document.getElementById('section-container');
    
            let remElements = document.createElement("div");
            remElements.setAttribute("id", "showAll");
            parentNode.appendChild(remElements)


    for(let i=0;i<products.length;i++){
        console.log("data IN :"+products[i].title)
        let productHtml = `
        
             <div id="album-${products[i].id}" class="content">
                 <h4>${products[i].title}</h4>
                 <div class="section-image-container">
                    <img class="pImage" src=${products[i].imageUrl} alt="">
                 </div>
                                 <div class="prod-details">
                     <span>${products[i].price}</span>
                     <button class="addCart-button" type='button'>ADD TO CART</button>
                </div>
            </div>`
            remElements.innerHTML += productHtml
    }

}



function showCart(id,name,imageUrl,price,quantity){
    const check = document.getElementById(`item-${id}`);
    let remElementsC = document.getElementById('showAllC');
     if(!check){
        

        const add_item = document.createElement('div');
                    add_item.classList.add('item');
                    add_item.setAttribute('id',`item-${id}`);
            
        
        add_item.innerHTML = `<span class='cart-items'>
                                        
            <img class='cart-img' src="${imageUrl}" alt="images">
            <span style="color:red;">${name}</span>
            Quantity: <span class='cart-q'>${quantity}</span>                
            Price: <span class='cart-price'>${price}</span>
            <button>Remove</button>
            </span>`
        remElementsC.appendChild(add_item);

        // let totQuantityPrice = parseFloat(price) * parseFloat(quantity);
        // let total = parseFloat(document.getElementById('total').innerText);
        //             total+=totQuantityPrice;
        //             document.getElementById('total').innerText=total;
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