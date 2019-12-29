/* global env */
import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID,
      AUTH0_DOMAIN = process.env.AUTH0_DOMAIN,
      SITE_BASE_URL = process.env.SITE_BASE_URL;

export class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: SITE_BASE_URL+'login',
    audience: 'https://'+AUTH0_DOMAIN+'/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  login(registration_type) {
    this.auth0.authorize({
      connection: 'linkedin',
      state: JSON.stringify({"registration_type": registration_type})
    });
  }
}

/* global localStorage */
export class AuthLock {
  
    lock = new Auth0Lock(
      AUTH0_CLIENT_ID,
      AUTH0_DOMAIN,
      {
          auth : {
              domain: AUTH0_DOMAIN,
              clientID: AUTH0_CLIENT_ID,
              redirectUrl: SITE_BASE_URL+'login',
              audience: 'https://'+AUTH0_DOMAIN+'/userinfo',
              responseType: 'token id_token',
              scope: 'openid profile email'
          },
          allowedConnections: ['linkedin'],
          container: "loginbox",
          theme: {
              logo: SITE_BASE_URL+'images/yepicon.png',
              
          },
          rememberLastLogin: false
      }   
    );

    constructor() {
        //this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        
        this.onAuthenticated = this.onAuthenticated.bind(this);
        this.onFederated = this.onFederated.bind(this);
    }
    
    show() {
      this.lock.show();
    }
    
    onAuthenticated(callback) {
      this.lock.on('authenticated', (authResult) => {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        callback();
      });
      
      this.lock.on('authorization_error', (err) => {
        console.log(err);
      });
    }
    
    onFederated(hash) {
      console.log("hash", hash);
      this.lock.on("federated login", (conn, strategy) => {
        this.lock.resumeAuth(hash, (authResult, err) => {
          console.log(hash, authResult, err);
          this.setSession(authResult);
          return true;
        });
        console.log("calling onFederated", conn, strategy);
      });
    }
    
    /*
    handleAuthentication() {
        this.lock.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            return true;
            //history.replace('/home');
          } else if (err) {
            //history.replace('/home');
            console.log(err);
            return false;
          }
        });
      }    
    */
    
    setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        
        // navigate to the home route
        //history.replace('/home');
    }

    logout() {
      // Clear Access Token and ID Token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
    }

    isAuthenticated() {
      // Check whether the current time is past the 
      // Access Token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
    
    getUserInfo(cb) {
      return this.lock.getUserInfo(localStorage.getItem('access_token'), cb);
    }
    
    static generateNonce() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for(var i = 0; i < 48; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
      
}