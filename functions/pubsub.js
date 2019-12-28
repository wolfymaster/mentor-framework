let request = require('request');
const Datastore = require('@google-cloud/datastore');

// Instantiates a datastore client
const datastore = Datastore();

exports.subscription = (event, callback) => {
    
    // make a request to datastore for access token & refresh token
    // check if access token is expired
    // if expired, use refresh token to get new access token
    // send data to hubspot

    const key = datastore.key(['Hubspot', 5656058538229760])
    
    datastore.get(key)
        .then(([entity]) => {
            
            // The get operation will not fail for a non-existent entity, it just
            // returns an empty dictionary.
          
            if (!entity) {
                throw new Error(`No entity found for key ${key.path.join('/')}.`);
            }
        
            const access_token = entity.access_token
            const refresh_token = entity.refresh_token
            const expires_in = entity.expires_in
            let tokents = new Date(entity.timestamp)
            let d = new Date();
          
            tokents.setTime(tokents.getTime() + expires_in*1000)
            
            if( (tokents.getTime() < d.getTime()) )
            {
                // expired. Use refresh to get another token
                
            } else {
                // access token still valid
                request.post('https://api.hubapi.com/contacts/v1/contact/',
                {
                    json: {
                        'properties': [
                            {
                                'property': 'email',
                                'value': event.data.email
                            },
                            {
                                'property': 'firstname',
                                'value': event.data.firstName
                            },
                            {
                                'property': 'lastname',
                                'value': event.data.lastName
                            }
                        ]
                    },
                    'auth': {
                        'bearer': access_token
                    }
                }, function(error, response, body) {
                    if(error)
                    {
                        // handle errors back to client
                    }
                    console.log('add contact response: ', body)
                    callback()
                })
            }
        })
        .catch((err) => {
          console.error(err);
          return Promise.reject(err);
        });
        
    callback();
}
