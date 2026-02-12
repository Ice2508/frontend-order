'use strict'

const productBtn = document.querySelector('.product-btn');
const id = Number(document.querySelector('.product-card').dataset.id);

productBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch('https://dedicated-sparkle-ca5141ccb3.strapiapp.com/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: {productId: id}})
    });
    const data = await response.json();
    console.log(data);
})

