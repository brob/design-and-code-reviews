const querystring = require('querystring');
const Trello = require('trello');
var trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

function fromBase64( encodedValue ) {
  return( Buffer.from( encodedValue, "base64" ).toString( "utf8" ));
}



// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = (event, context) => {
  let body = event.isBase64Encoded ? fromBase64(event.body) : event.body;

  const parsedBody = JSON.parse(body);
  const listID = '5d03f4f06dc7f6384304ee9d';
  const cardName = `${parsedBody.type} Request: ${parsedBody.url}`;
  const cardDesc = `Requested by: ${parsedBody.name ? parsedBody.name : "Not Provided"}
                    URL: ${parsedBody.url}
                    Email: ${parsedBody.email ? parsedBody.email : "Not Provided"} 
                    Social: ${parsedBody.social ? parsedBody.social : "Not Provided"} 
                    Additional Info: ${parsedBody.description ? parsedBody.description : "Not Provided"}`

  trello.addCard(cardName, cardDesc, listID,
  function (error, trelloCard) {
      if (error) {
          console.log('Could not add card:', error);
          return {
            statusCode: 500,
            body: error
          }
      }
      else {
          console.log('Added card:', trelloCard);
          
      }
  });
  return {
    statusCode: 200,
    body: "success"
  }
}