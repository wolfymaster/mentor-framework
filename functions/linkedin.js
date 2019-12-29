const crypto = require('crypto')
const request = require('request')
const Datastore = require('@google-cloud/datastore');

// Instantiates a datastore client
const datastore = Datastore();
const path = require("path")

const LinkedInId = '78ln2hwl194kc0'
const LinkedinSecret = 'ci4tSE2heGoNwOCM'

const linkedinRedirectURI = 'https://us-central1-young-erie-professionals.cloudfunctions.net/linkedinRedirectURI'
const oAuthScope = ['r_basicprofile', 'r_emailaddress']

const random_state_string = 'buffalosauce'+crypto.createHash('sha1').update('buffalosauce').digest('hex')


exports.linkedinAuth = (req,res) => {
    const baseurl = 'https://www.linkedin.com/oauth/v2/authorization';
    let scopes = oAuthScope.join('%20')
    let oAuthURL = baseurl+'?response_type=code&client_id=78ln2hwl194kc0&redirect_uri='+linkedinRedirectURI+'&state='+random_state_string+'&scope='+oAuthScope

    console.log('oauth URL: ', oAuthURL)

    res.redirect(301, oAuthURL);
}

exports.linkedinRedirectURI = (req,res) => {
    const oAuthCode = req.query.code
    const state_string = req.query.state
    const oAuthFailURL = 'https://www.google.com' // fail url
    
    if(state_string !== random_state_string)
    {
        // error
        res.redirect(301, oAuthFailURL)
    }
    
    request.post(
        'https://www.linkedin.com/oauth/v2/accessToken',
        { 
            form: {
                grant_type: 'authorization_code',  
                client_id: LinkedInId,
                client_secret: LinkedinSecret,
                redirect_uri: linkedinRedirectURI,
                code: oAuthCode
            }
        },
        function (error, response, body) {
            /*
            console.log('error', error);
            console.log('response', response)
            console.log('body', body)
            
            if (!error && response.statusCode == 200) {
                
                body = JSON.parse(body);
                
                const datastoreKey = datastore.key('LinkedIn');
                
                const entity = {
                    key: datastoreKey,
                    data: [
                      {
                        name: 'access_token',
                        value: body.access_token,
                        excludeFromIndexes: true
                      },
                      {
                        name: 'expires_in',
                        value: body.expires_in,
                        excludeFromIndexes: true
                      },
                      {
                        name: 'timestamp',
                        value: new Date(),
                        excludeFromIndexes: true
                      }
                    ],
                };
                    
                datastore
                    .save(entity)
                    .then(() => {
                        console.log(`Task ${datastoreKey.id} created successfully.`);
                    })
                    .catch(err => {
                        console.error('ERROR:', err);
                    });
                
            }
            */
            
            body = JSON.parse(body);
            access_token = body.access_token;
            
            request
            .get('https://api.linkedin.com/v1/people/~:(first-name,last-name,headline,location,industry,summary,specialties,positions,picture-url,public-profile-url,email-address)?format=json', function(error, response, body) {
              res.status(200).send(`
                <script> 
					var r = JSON.stringify(${body})
                    var p = new Promise(function(resolve, reject) { 
                        window.opener.postMessage(r,"https://vfs.cloud9.us-east-2.amazonaws.com/vfs/0adbdbd4026c44d389258e6d70a241e2/preview/googlecloud/frontend/template/index.html"); 
                        resolve(); 
                    }); 
                    
                    p.then(function() { window.close(); } );
                </script>
              `); 
            })
            .auth(null, null, true, access_token)
        }
    );

}
