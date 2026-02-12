'use strict'

const productBtn = document.querySelector('.product-btn');
const id = Number(document.querySelector('.product-card').dataset.id);




const shopId = '1274246';
const secretKey = 'test_UJQzqgmQB_RNa2evhwJB8-j2cvAY_YVHBhfVrcrHHU8';

const orderId = 1; // пример
const amount = 100; // сумма в рублях

const paymentData = {
  amount: { value: amount.toFixed(2), currency: 'RUB' },
  confirmation: { type: 'redirect', return_url: 'https://ice2508.github.io/frontend-order/' },
  capture: true,
  description: `Тестовый платеж заказа #${orderId}`,
  metadata: { orderId }
};




productBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch('https://dedicated-sparkle-ca5141ccb3.strapiapp.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: {productId: id}})
    });
    const data = await response.json();
    console.log(data);





    fetch('https://api.yookassa.ru/v3/payments', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa(`${shopId}:${secretKey}`)
  },
  body: JSON.stringify(paymentData)
})
.then(res => res.json())
.then(data => {
  console.log('Ответ ЮKassa:', data);
  if(data.confirmation && data.confirmation.confirmation_url) {
    window.location.href = data.confirmation.confirmation_url; // редирект на оплату
  }
})
.catch(err => console.error(err));
})




