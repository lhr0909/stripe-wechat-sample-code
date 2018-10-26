const stripePublic = require('stripe')(process.env.STRIPE_PUBLIC_KEY);
const stripePrivate = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

stripePublic.sources.create({
  type: 'wechat',
  amount: 1,
  currency: 'usd',
}).then(result => {
  console.log(result);
  console.log(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${result.wechat.qr_code_url}`);

  return stripePrivate.charges.create({
    amount: 1,
    currency: 'usd',
    source: result.source, // get the source once it is chargeable
  });
}).then(result => {
  console.log(result);
});
