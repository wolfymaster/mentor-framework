let request = require('request');
    
const oAuthClientID = 'd894e01e-3443-4fdf-9839-b664de351ebd';
const oAuthSecret = '8bba0def-84bb-4a2f-bad1-c31c67109974';
const oAuthScope = ['contacts','timeline','files'];
const oAuthRedirectURI = 'https://us-central1-young-erie-professionals.cloudfunctions.net/redirectURI';

const Datastore = require('@google-cloud/datastore');

const Hubspot = require('hubspot');
const hubspot = new Hubspot({ 
    clientId:       oAuthClientID,
    clientSecret:   oAuthSecret,
    redirectUri:    oAuthRedirectURI,
    refreshToken:   "526e6e91-e5b8-4035-90a5-3005ef03b665"
});

// Instantiates a datastore client
const datastore = Datastore();
    
exports.auth = (req,res) => {
    
    const baseurl = 'https://api.hubapi.com';

    //const contactsEndpoint = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all';
    
    //const contactsAccountInfo = 'https://api.hubapi.com/integrations/v1/me';
    
    let scopes = oAuthScope.join('%20')
    let oAuthURL = 'https://app.hubspot.com/oauth/authorize?client_id='+oAuthClientID+'&scope='+scopes+'&redirect_uri='+oAuthRedirectURI;

    res.redirect(301, oAuthURL);
};

exports.redirectURI = (req,res) => {
    const baseURL = 'https://api.hubapi.com/oauth/v1/token';
    const oAuthMe = 'https://api.hubapi.com/integrations/v1/me';
    const oAuthTokenInfo = 'https://api.hubapi.com/oauth/v1/access-tokens/';
    const oAuthCode = req.query.code

    request.post(
        baseURL,
        { 
            form: {
                grant_type: 'authorization_code',  
                client_id: oAuthClientID,
                client_secret: oAuthSecret,
                redirect_uri: oAuthRedirectURI,
                code: oAuthCode
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                
                body = JSON.parse(body);
                
                console.log(body.access_token);
                
                const datastoreKey = datastore.key('Hubspot');
                const entity = {
                    key: datastoreKey,
                    data: [
                      {
                        name: 'access_token',
                        value: body.access_token,
                        excludeFromIndexes: true
                      },
                      {
                        name: 'refresh_token',
                        value: body.refresh_token,
                        excludeFromIndexes: true,
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
                    
                res.send('OK');
            }
        }
    );
    
}

exports.webpage_submit = (req,res) => {
    
    // validate form data
    let validator = require('validator')
    
    let errorList = []
    let contact = [];
    
    // fields
    contact['First Name'] = req.body.firstName
    contact['Last Name'] = req.body.lastName
    /*
    contact['Age'] = req.body.age
    contact['Email'] = req.body.email
    contact['Phone'] = req.body.phone
    contact['School'] = req.body.school
    contact['Major']  = req.body.major
    */
    
    //console.log("validate email: ", validator.isLength(contact['School'], {min: 1, max: 20}))
    
    contact.map( (v, i) => {
      switch(i) {
         case 'First Name':
         case 'Last Name':
         case 'School':
         case 'Major':
             if(validator.isLength(v, {min: 1, max: 20}) && !validator.isNumeric() && !validator.isInt())
                errorList.push(i+" invalid. Please use A-Z Upper and Lowercase only")
             break;
         case 'Age':
             if(!validator.isNumeric(v))
                errorList.push("Please use numeric values only and age must be a number between 1 - 99")
             break;
         case 'Email':
             if(!validator.isEmpty(v) && validator.isEmail(v))
                errorList.push("Please make sure your e-mail is typed correctly")
      }
    })
    
    console.log("errorList: ", errorList);
    
    if(errorList.length == 0)
    {
        const PubSub = require(`@google-cloud/pubsub`);
        const pubsub = new PubSub();
        
        const dataBuffer = Buffer.from(JSON.stringify(contact));
        //need topicName
        const topicName = "projects/young-erie-professionals/topics/mentee-form"
        
        pubsub
          .topic(topicName)
          .publisher()
          .publish(dataBuffer)
          .then(results => {
            const messageId = results[0];
            console.log(`Message ${messageId} published.`);
          })
        .catch(err => {
          console.error('ERROR:', err);
          });
          
          res.set('Access-Control-Allow-Origin', "*")
  	      res.set('Access-Control-Allow-Methods', 'GET, POST')
          res.status(200).send(JSON.stringify({"status": "success"}))
          return
    }
    
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.status(200).send(JSON.stringify({ "status": "error", "error": errorList}))   
}

exports.createUser = (req, res) => {
    
    if(!req.body.email) {
        console.log("Email is not set");
        res.status(403).send( JSON.stringify({"error": "Email is not set"}) );
        return;
    }

    hubspot.refreshAccessToken()
    .then(results => {
        
    //console.log(results.access_token)
    //console.log(hubspot.accessToken) // this assigns the new accessToken to the client, so your client is ready to use
    
    let email = req.body.email;
    let data = {
                  "properties": [
                    {
                      "property": "firstname",
                      "value": req.body.given_name
                    },
                    {
                      "property": "lastname",
                      "value": req.body.family_name
                    },
                    {
                      "property": "company",
                      "value": req.body.positions.values[0].company.name
                    },
                    {
                      "property": "jobtitle",
                      "value": req.body.positions.values[0].title
                    },                    
                    {   
                      "property": "industry",
                      "value": req.body.industry
                    },
                    {
                        "property": "bio",
                        "value": req.body.summary
                    },
                    {
                      "property": "mentee",
                      "value": (req.body.state.registration_type == "mentee") ? true : false
                    },
                    {
                      "property": "mentor",
                      "value": (req.body.state.registration_type == "mentor") ? true : false
                    },
                  ]
                };
    
    hubspot.contacts.createOrUpdate(email, data).then(response => {
        
        // save to datastore
        const datastoreKey = datastore.key({ path: ['User', email] });
        const entity = {
            key: datastoreKey,
            data: [
              {
                name: 'user_firstName',
                value: req.body.given_name,
                excludeFromIndexes: true
              },
              {
                name: 'user_lastName',
                value: req.body.family_name,
                excludeFromIndexes: true,
              },
              {
                name: 'user_hubspot_id',
                value: response.vid,
              },
              {
                name: 'user_education',
                value: {
                    'school': '',
                    'major': '',
                    'graduation_date': ''
                },
                excludeFromIndexes: true
              },
              {
                name: 'user_employment',
                value: {
                    'jobtitle': req.body.positions.values[0].title,
                    'employer': req.body.positions.values[0].company.name,
                    'years_experience': ''
                },
                excludeFromIndexes: true
              },
              {
                name: 'user_summary',
                value: req.body.summary,
                excludeFromIndexes: true
              },
              {
                name: 'user_interests',
                value: '',
                excludeFromIndexes: true
              },
              {
                name: 'user_volunteer_experience',
                value: '',
                excludeFromIndexes: true
              },
              {
                name: 'user_organizations',
                value: '',
                excludeFromIndexes: true
              },
              
              {
                name: 'user_profile_photo',
                value: '',
                excludeFromIndexes: true
              },
              {
                name: 'user_profile_data',
                value: {
                    'isMentee': (req.body.state.registration_type == "mentee") ? true : false,
                    'isMentor': (req.body.state.registration_type == "mentor") ? true : false,
                    'mentor_qualities': '',
                    'mentee_qualities': ''
                },
                excludeFromIndexes: true
              },
              {
                  name: 'user_profileActive',
                  value: true
              },
              {
                  name: 'user_profileDeleted',
                  value: false
              },
              {
                  name: 'user_registeredDate',
                  value: ''
              },
              {
                  name: 'user_deletedDate',
                  value: ''
              }
            ],
        };
        datastore
            .save(entity)
            .then(() => {
                console.log(`Profile ${datastoreKey.id} created successfully.`);
            })
            .catch(err => {
                console.error('ERROR:', err);
            });
        
        res.set('Content-Type', 'application/json');
        res.status(200).send( JSON.stringify(response) );        
    });

  })
}