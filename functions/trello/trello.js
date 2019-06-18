const querystring = require('querystring');
const Trello = require('trello');
var trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

function fromBase64( encodedValue ) {
  return( Buffer.from( encodedValue, "base64" ).toString( "utf8" ));
}



// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {

  const body = fromBase64(event.body);
  const parsedBody = querystring.parse(body);
  const listID = '5d03f4f06dc7f6384304ee9d';
  const cardName = `${parsedBody.type} Request: ${parsedBody.url}`;
  const cardDesc = `Requested by: ${parsedBody.name ? parsedBody.name : "Not Provided"}
                    URL: ${parsedBody.url}
                    Email: ${parsedBody.email ? parsedBody.email : "Not Provided"} 
                    Social: ${parsedBody.social ? parsedBody.social : "Not Provided"} 
                    Additional Info: ${parsedBody.description ? parsedBody.description : "Not Provided"}`
  
  console.log(body);
  console.log(parsedBody);
  console.log(event.body);


  trello.addCard(cardName, cardDesc, listID,
  function (error, trelloCard) {
      if (error) {
          console.log('Could not add card:', error);
      }
      else {
          // console.log('Added card:', trelloCard);
      }
  });
  



  try {
    const subject = event.queryStringParameters.name || "World";
    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }) 
    }
    return response;
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
