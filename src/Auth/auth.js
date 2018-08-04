import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

export class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'yeperie.auth0.com',
    clientID: 'y0l9g2y5L6PL4ogoiY2AHC9QpdMCWxCg',
    redirectUri: 'https://0adbdbd4026c44d389258e6d70a241e2.vfs.cloud9.us-east-2.amazonaws.com/account/dashboard',
    audience: 'https://yeperie.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}

export class AuthLock {
    
    lock = new Auth0Lock(
        'y0l9g2y5L6PL4ogoiY2AHC9QpdMCWxCg',
        'yeperie.auth0.com',
        {
            auth : {
                domain: 'yeperie.auth0.com',
                clientID: 'y0l9g2y5L6PL4ogoiY2AHC9QpdMCWxCg',
                redirectUrl: 'https://0adbdbd4026c44d389258e6d70a241e2.vfs.cloud9.us-east-2.amazonaws.com/account/dashboard',
                audience: 'https://yeperie.auth0.com/userinfo',
                responseType: 'token id_token',
                scope: 'openid'
            },
            allowedConnections: ['linkedin'],
            container: "loginbox",
            theme: {
                logo: 'https://0adbdbd4026c44d389258e6d70a241e2.vfs.cloud9.us-east-2.amazonaws.com/images/yepicon.png',
                
            }
        }   
    );
    
    show() {
        this.lock.show();
    }
}