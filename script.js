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

    // ---
    if (e.target.className=='btnPurchase'){
        const productId = Number(e.target.parentNode.parentNode.id.split('-')[1]);
        console.log(productId)
        axios.post('http://localhost:3000/checkOut')
        .then(response => {
            if(response.status==200){
                notification(`Order sucessfully placed with order id = ${response.data[0].orderId}`);
            }
            else    throw new Error('Unable to order product');
        })
        .catch(err => {
           notification(err, true);
        });

    }
    // btnPurchase

    
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
            axios.get(`http://localhost:3000/cart/?page=1`).then(res => {
                const cart_body = document.getElementById('cart-body');
                console.log(res)
                showCart(res.data.products);

                const lastPageC=res.data.lastPC;
                console.log('lastpage : '+lastPageC)
                let pageParentCart = document.getElementById('Cpagination');
                for(let i=2;i<=lastPageC;i++){
                const pages = document.createElement("button");
                pages.classList.add('cButton');
                pages.innerText = i;
                pageParentCart.appendChild(pages);
            }
            })
            
            cart.style = "display:block;";    
    }


    if(e.target.className=='cButton'){ 
            const elementsinC = Array.from(document.getElementsByClassName('cActive'));

            elementsinC.forEach(element => {
                element.classList.remove('cActive');
            });
            const pageNumber = e.target.innerHTML;
            const remElementForCart = document.getElementById('showAllC');
            remElementForCart.remove();     
            axios.get(`http://localhost:3000/cart/?page=${pageNumber}`).then(res => {

                const cart_body = document.getElementById('cart-body');

                    showCart(res.data.products);

            })
            e.target.classList.add('cActive');

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
        const elements = Array.from(document.getElementsByClassName('active'));

            elements.forEach(element => {
            element.classList.remove('active');
        });

        const remElement = document.getElementById('showAll');
        remElement.remove();     
        const pageNumber = e.target.innerHTML;
        axios.get(`http://localhost:3000/?page=${pageNumber}`).then((res) => {
            showProducts(res.data.products);
            console.log(res.data.totalItem);
        })
        
        e.target.classList.add('active');
        
    }

})
}





window.addEventListener('DOMContentLoaded',()=>{
    const pageNumber = 1;

        axios.get(`http://localhost:3000/?page=${pageNumber}`).then((res) => {
            showProducts(res.data.products);
            const lastPage=res.data.lastPage;
            let pageParent = document.getElementById('pagination');
            for(let i=2;i<=lastPage;i++){
                const pP = document.createElement("button");
                pP.classList.add('pButton');
                pP.innerText = i;
                pageParent.appendChild(pP);
            }
    })
    axios.get(`http://localhost:3000/cart/?page=${pageNumber}`).then(res => {
        // let totalPrice = 0;
        // for(let i=0;i<res.data.products.length;i++){
        //     totalPrice+=res.data.products[i].price;
        // }
        // document.querySelector('.dummyBtn').firstElementChild.innerText=totalPrice;
        let cartCount = res.data.totCartItems;
        document.querySelector('.count').innerText=cartCount;
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



function showCart(products){
    const parentNode = document.getElementById('cart-body');

            let remElementC = document.createElement("div");
            remElementC.setAttribute("id", "showAllC");
            parentNode.appendChild(remElementC)
    for(let i=0;i<products.length;i++){
            add_item = `<span class='cart-items'>
                                        
            <img class='cart-img' src="${products[i].imageUrl}" alt="images">
            <span style="color:red;">${products[i].title}</span>
            Quantity: <span class='cart-q'>${products[i].cartItem.quantity}</span>                
            Price: <span class='cart-price'>${products[i].price}</span>
            <button>Remove</button>
            </span>`
            remElementC.innerHTML+=add_item;
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