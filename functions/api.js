/******************************************************************************
 *      REMEMBER TO TRANSPILE THIS FILE BEFORE RUNNING :: sls deploy
 *  PATH=$PATH:$(pwd)/node_modules/.bin && babel api.js --out-dir transpiled
 * ----------------------------------------------------------------------------
 */
require('babel-polyfill');

const ds = require('@google-cloud/datastore')();
const namespace = process.env.DATASTORE_NAMESPACE ? process.env.DATASTORE_NAMESPACE : '';
const routeParser = require('route-parser');

async function page_getAll(options) {
    
    let query = ds.createQuery(namespace, 'Page').order('page_pageSlug', { ascending: true });
    if (!options) {
      options = {};
    }

    if (options.limit) {
      query = query.limit(options.limit);
    } else {
      query = query.limit(20);
    }

    if (options.offset) {
      query = query.offset(options.offset);
    }

    const articles = (await query.run(query))[0];
    

    return articles;
}

async function page_get(aSlug) {
    const article = (await ds.get(ds.key({ namespace, path: ['Page', aSlug] })))[0];
    if (!article) {
      throw new Error(`Page not found: [${aSlug}]`);
    }
    delete article[ds.KEY];

    return article;
}

async function user_get(email) {
  const user = (await ds.get(ds.key({ namespace, path: ['User', email] } )) )[0];
  if( !user ) {
    throw new Error('user not found')
  }
  delete user[ds.KEY];
  
  return user;
}

async function user_update(email, data) {
  return data;
}

async function mentors_get() {
  
  let query = ds.createQuery(namespace, 'User').filter('is_mentor', '=', true);
  const mentors = (await query.run())[0]
  
  return mentors;
}

async function lessons_getAll() {
  let query = ds.createQuery(namespace, 'Lesson').order('lesson_order', { ascending: true });
  const lessons = (await query.run(query))[0];
  
  return lessons;
}

/*
    TODO :: NEED EXPRESS MIDDLEWARE TO AUTHENTICATE REQUEST WITH AUTH0 AND SHORT-CIRCUIT IF NOT AUTHENTICATED
*/
async function route (req, res) {

    // Enable CORS
    res.set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    if (req.method == 'OPTIONS') {
      res.status(200).send();
      return;
    }
/*
    var validatedUser = null; // eslint-disable-line no-var
    var validatedUsername = null; // eslint-disable-line no-var
    const rawToken = req.get('Authorization');
    if (rawToken) {
      const matchedToken = rawToken.match(/Token (.*)/);
      if (matchedToken && matchedToken[1]) {
        console.log(`matchedToken = ${matchedToken}`);
        validatedUser = await User.authenticateToken(matchedToken[1]);
        validatedUsername = validatedUser.username;
      }
    }
*/

    // Define routes that can be handled
    const routes = [

      // Helpers
      ['GET', '/ping', async () => res.status(200).send({
        pong: new Date(),
        DATASTORE_NAMESPACE: process.env.DATASTORE_NAMESPACE ? process.env.DATASTORE_NAMESPACE : '',
      })],
/*
      // Users
      ['POST', '/users/login', async () => res.status(200).send({ user: await User.login(req.body.user) })],
      ['POST', '/users', async () => res.status(200).send({ user: await User.create(req.body.user) })],
      ['GET', '/user', async () => {
        if (!validatedUser) {
          res.status(401).send({ errors: { body: ['Token is required'], }, });
          return;
        }
        res.status(200).send({ user: validatedUser });
      }],
      ['PUT', '/user', async () => {
        if (!validatedUser) {
          res.status(401).send({ errors: { body: ['Token is required'], }, });
          return;
        }
        res.status(200).send({ user: await User.update(validatedUser, req.body.user) });
      }],

      // Profiles
      ['GET', '/profiles/:username', async (matchedPath) => res.status(200).send({
        profile: await User.getProfile(matchedPath.username, validatedUser)
      })],
      ['POST', '/profiles/:username/follow', async (matchedPath) => res.status(200).send({
        profile: await User.followUser(validatedUser.username, matchedPath.username)
      })],
      ['DELETE', '/profiles/:username/follow', async (matchedPath) => res.status(200).send({
        profile: await User.unfollowUser(validatedUser.username, matchedPath.username)
      })],
*/
      ['GET', '/users/:email', async (matchedPath) => {
        const user = await user_get(matchedPath.email);
        res.status(200).send({ user });
      }],
      ['POST', '/users/:email', async (matchedPath) => {
        const user = await user_update(matchedPath.email, req.body);
        res.status(200).send({ user });
      }],
      ['GET', '/lessons', async () => {
        const lessons = await lessons_getAll();
        res.status(200).send({
          lessons: lessons,
          lessonsCount: lessons.length
        });
      }],
      ['GET', '/mentors', async () => {
        const mentors = await mentors_get();
        res.status(200).send({ mentors });
      }],      
      // Articles
      ['GET', '/pages', async () => {
        const articles = await page_getAll({
          limit: parseInt(req.query.limit),
          offset: parseInt(req.query.offset),
        });
        res.status(200).send({ articles, articlesCount: articles.length, namespace: namespace });
      }],
      /*
      ['POST', '/articles', async () => {
        if (!validatedUser) {
          res.status(401).send({ errors: { body: ['Must be logged in'], }, });
          return;
        }
        res.status(200).send({ article: await Article.create(req.body.article, validatedUsername) });
      }],
      */
      ['GET', '/pages/:slug', async (matchedPath) => res.status(200).send({
        article: await page_get(matchedPath.slug)
      })],
      /*
      ['PUT', '/articles/:slug', async (matchedPath) => {
        if (!validatedUser) {
          res.status(401).send({ errors: { body: ['Must be logged in'], }, });
          return;
        }
        res.status(200).send({ article: await Article.update(matchedPath.slug, req.body.article, validatedUsername) });
      }],
      ['DELETE', '/articles/:slug', async (matchedPath) => {
        if (!validatedUser) {
          res.status(401).send({ errors: { body: ['Must be logged in'], }, });
          return;
        }
        res.status(200).send(await Article.delete(matchedPath.slug, validatedUsername));
      }],
*/
    ];

    // Match route and call handler
    for (let i = 0; i < routes.length; ++i) {
      const method = routes[i][0];
      const route = routes[i][1];
      const handler = routes[i][2];
      if (req.method !== method) {
        continue;
      }
      const matchedPath = (new routeParser(route)).match(req.path);
      if (matchedPath) {
        await handler(matchedPath);
        return;
      }
    }

    // No routes were matched, respond with 404
    res.status(404).send({ errors: { body: [`404 Not found: [${req.method} ${req.path}]`], }, });

}

exports.api = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      await route(req, res);
    } catch (e) {
      console.log(e);
      res.status(422).send({ errors: { body: [e.message], } });
    }


};