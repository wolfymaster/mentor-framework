const baseurl = 'https://api.hubapi.com';

const contactsEndpoint = 'https://api.hubapi.com/contacts/v1/lists/all/contacts/all';

const contactsAccountInfo = 'https://api.hubapi.com/integrations/v1/me';

const oAuthClientID = 'd894e01e-3443-4fdf-9839-b664de351ebd';
const oAuthScope = ['contacts','timeline','files'];
const oAuthRedirectURI = '';

let oAuthURL = 'https://app.hubspot.com/oauth/authorize?client_id='+oAuthClientID+'&scope='+oAuthScope.join('%20');+'&redirect_uri='+oAuthRedirectURI;