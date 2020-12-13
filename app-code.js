//Content Script

//Include iFrame...
var htmlStr = '<iframe style="width:100%;border:none;height:40px;" src="'+chrome.extension.getURL('stripeFrame.html')+'"></iframe>'
+'<button class="submit-buttom">Submit Card</button>';
var newEle = document.createElement('div');
newele.innerHTML = htmlStr;

//Listen for Events
chrome.runtime.onMessage.addListener((msg, sender, response) => {

  //Stripe Card onChange...
  if(msg.command == 'stripeCardOnChange'){
    var event = msg.event;
    //event.error.message; ...
  }
  if(msg.command == 'stripeCardOnConfirm'){
    //get token from response...
    //msg.token...
    //msg.token.id...
  }
  if(msg.command == 'stripeCardOnConfirmError'){
    //show error
  }
  return true;
});

//submit card
document.querySelector('.submit-button').addEventListener('click', function(){
  //submitStripeCard
  chrome.runtime.sendMessage({command:"submitStripeCard"}, (response) => {
    //...
  });
});
