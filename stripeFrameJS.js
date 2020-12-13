window._appSandbox = true;  //SET SANBDOX MODE
// Create a Stripe client.
var testKey = '---';
var liveKey = '---';
var stripeKey = testKey;
if(_appSandbox == false){
  stripeKey = liveKey;
}
var stripe = Stripe(stripeKey);
// Create an instance of Elements.
var elements = stripe.elements();
// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '14px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};
// Create an instance of the card Element.
var card = elements.create('card', {style: style});

chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  var _app_setupStripe = function(_appSandbox = true){
    card.mount('#card-element');
    card.on('change', function(event) {
      chrome.tabs.sendMessage(activeTab.id, {command: "stripeCardOnChange", event: event}, (response) => {
        ///...
        //console.log('changed...')
      });
    });
  };
  _app_submitStripe = function(){
    //Handle form submission.
      try{
        stripe.createToken(card).then(function(result) {
          if (result.error) {
            //send resonse of message
            //stripeCardOnConfirm

            chrome.tabs.sendMessage(activeTab.id, {command: "stripeCardOnConfirmError", result: result.error}, (response) => {
              //Any Response...
            });
          } else {
            // Send the token to your server.
            //stripeCardOnConfirm
            chrome.tabs.sendMessage(activeTab.id, {command: "stripeCardOnConfirm", token: result.token}, (response) => {
              //Any Response...
            });
          }
        });
      }catch(e){
        //Send Response of error
        //stripeCardOnConfirm
        ////console.log(e);
        chrome.tabs.sendMessage(activeTab.id, {command: "stripeCardOnConfirmError", e: e.message, result: "Invalid card"}, (response) => {
          //Any Response...
        });
      }
    //});
  };


  _app_setupStripe();


  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    //Stripe Card onChange...
    if(msg.command == "submitStripeCard"){
      _app_submitStripe();
      //...process wait and then send response...
    }
    return true;
  });
});
