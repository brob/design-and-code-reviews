require('dotenv').config()

const querystring = require('querystring');
const Trello = require('trello');
var trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);
var validator = require('validator');

function fromBase64( encodedValue ) {
  return( Buffer.from( encodedValue, "base64" ).toString( "utf8" ));
}


// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = (event, context, callback) => {

  let body = event.isBase64Encoded ? fromBase64(event.body) : event.body;
  const parsedBody = event.isBase64Encoded ? querystring.parse(body) : JSON.parse(body);
  console.log(parsedBody);

  //Validate inputs
  if(!validator.isEmail(parsedBody.email)){
    console.log(`Email is invalid: '${parsedBody.email}'`);
    return callback(null, {
      statusCode: 400,
      body: "Email is invalid"
    })
  }

  if(validator.isEmpty(parsedBody.type)){
    console.log(`Review type cannot be empty`);
    return callback(null, {
      statusCode: 400,
      body: "Review type cannot be empty"
    })
  }

  if(!validator.isURL(parsedBody.url)){
    console.log(`URL is invalid: '${parsedBody.url}'`);
    return callback(null, {
      statusCode: 400,
      body: "URL is invalid"
    })
  }

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
          return callback(error, {
            statusCode: 500,
          });
      }
      //?trello API returns a string error message (not an error) if the key is invalid
      //?for now, we can check to see if trelloCard is of type object
      else if(typeof trelloCard !== 'object') {
        console.log(`Could not add card, but trello did not return an error: '${trelloCard}'`);
        return callback(null, {
          statusCode: 500,
          body: "Could not add card"
        });
      }
      else {
        console.log('Added card:', trelloCard);
        return callback(null, {
          statusCode: 200,
          body:"success"
        });
      }
  });
  
}