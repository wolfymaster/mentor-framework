'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var page_getAll = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
    var query, articles;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = ds.createQuery(namespace, 'Page').order('page_pageSlug', { ascending: true });

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

            _context.next = 6;
            return query.run(query);

          case 6:
            articles = _context.sent[0];
            return _context.abrupt('return', articles);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function page_getAll(_x) {
    return _ref.apply(this, arguments);
  };
}();

var page_get = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(aSlug) {
    var article;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return ds.get(ds.key({ namespace: namespace, path: ['Page', aSlug] }));

          case 2:
            article = _context2.sent[0];

            if (article) {
              _context2.next = 5;
              break;
            }

            throw new Error('Page not found: [' + aSlug + ']');

          case 5:
            delete article[ds.KEY];

            return _context2.abrupt('return', article);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function page_get(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var user_get = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(email) {
    var user;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return ds.get(ds.key({ namespace: namespace, path: ['User', email] }));

          case 2:
            user = _context3.sent[0];

            if (user) {
              _context3.next = 5;
              break;
            }

            throw new Error('user not found');

          case 5:
            delete user[ds.KEY];

            return _context3.abrupt('return', user);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function user_get(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var user_update = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(email, data) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt('return', data);

          case 1:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function user_update(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var mentors_get = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var query, mentors;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            query = ds.createQuery(namespace, 'User').filter('is_mentor', '=', true);
            _context5.next = 3;
            return query.run();

          case 3:
            mentors = _context5.sent[0];
            return _context5.abrupt('return', mentors);

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function mentors_get() {
    return _ref5.apply(this, arguments);
  };
}();

var lessons_getAll = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var query, lessons;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            query = ds.createQuery(namespace, 'Lesson').order('lesson_order', { ascending: true });
            _context6.next = 3;
            return query.run(query);

          case 3:
            lessons = _context6.sent[0];
            return _context6.abrupt('return', lessons);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function lessons_getAll() {
    return _ref6.apply(this, arguments);
  };
}();

/*
    TODO :: NEED EXPRESS MIDDLEWARE TO AUTHENTICATE REQUEST WITH AUTH0 AND SHORT-CIRCUIT IF NOT AUTHENTICATED
*/


var route = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(req, res) {
    var _this = this;

    var routes, i, method, _route, handler, matchedPath;

    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:

            // Enable CORS
            res.set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));

            if (!(req.method == 'OPTIONS')) {
              _context14.next = 4;
              break;
            }

            res.status(200).send();
            return _context14.abrupt('return');

          case 4:
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
            routes = [

            // Helpers
            ['GET', '/ping', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
              return _regenerator2.default.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      return _context7.abrupt('return', res.status(200).send({
                        pong: new Date(),
                        DATASTORE_NAMESPACE: process.env.DATASTORE_NAMESPACE ? process.env.DATASTORE_NAMESPACE : ''
                      }));

                    case 1:
                    case 'end':
                      return _context7.stop();
                  }
                }
              }, _callee7, _this);
            }))],
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
            ['GET', '/users/:email', function () {
              var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(matchedPath) {
                var user;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return user_get(matchedPath.email);

                      case 2:
                        user = _context8.sent;

                        res.status(200).send({ user: user });

                      case 4:
                      case 'end':
                        return _context8.stop();
                    }
                  }
                }, _callee8, _this);
              }));

              return function (_x8) {
                return _ref9.apply(this, arguments);
              };
            }()], ['POST', '/users/:email', function () {
              var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(matchedPath) {
                var user;
                return _regenerator2.default.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return user_update(matchedPath.email, req.body);

                      case 2:
                        user = _context9.sent;

                        res.status(200).send({ user: user });

                      case 4:
                      case 'end':
                        return _context9.stop();
                    }
                  }
                }, _callee9, _this);
              }));

              return function (_x9) {
                return _ref10.apply(this, arguments);
              };
            }()], ['GET', '/lessons', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
              var lessons;
              return _regenerator2.default.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      _context10.next = 2;
                      return lessons_getAll();

                    case 2:
                      lessons = _context10.sent;

                      res.status(200).send({
                        lessons: lessons,
                        lessonsCount: lessons.length
                      });

                    case 4:
                    case 'end':
                      return _context10.stop();
                  }
                }
              }, _callee10, _this);
            }))], ['GET', '/mentors', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
              var mentors;
              return _regenerator2.default.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return mentors_get();

                    case 2:
                      mentors = _context11.sent;

                      res.status(200).send({ mentors: mentors });

                    case 4:
                    case 'end':
                      return _context11.stop();
                  }
                }
              }, _callee11, _this);
            }))],
            // Articles
            ['GET', '/pages', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
              var articles;
              return _regenerator2.default.wrap(function _callee12$(_context12) {
                while (1) {
                  switch (_context12.prev = _context12.next) {
                    case 0:
                      _context12.next = 2;
                      return page_getAll({
                        limit: parseInt(req.query.limit),
                        offset: parseInt(req.query.offset)
                      });

                    case 2:
                      articles = _context12.sent;

                      res.status(200).send({ articles: articles, articlesCount: articles.length, namespace: namespace });

                    case 4:
                    case 'end':
                      return _context12.stop();
                  }
                }
              }, _callee12, _this);
            }))],
            /*
            ['POST', '/articles', async () => {
              if (!validatedUser) {
                res.status(401).send({ errors: { body: ['Must be logged in'], }, });
                return;
              }
              res.status(200).send({ article: await Article.create(req.body.article, validatedUsername) });
            }],
            */
            ['GET', '/pages/:slug', function () {
              var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(matchedPath) {
                return _regenerator2.default.wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        _context13.t0 = res.status(200);
                        _context13.next = 3;
                        return page_get(matchedPath.slug);

                      case 3:
                        _context13.t1 = _context13.sent;
                        _context13.t2 = {
                          article: _context13.t1
                        };
                        return _context13.abrupt('return', _context13.t0.send.call(_context13.t0, _context13.t2));

                      case 6:
                      case 'end':
                        return _context13.stop();
                    }
                  }
                }, _callee13, _this);
              }));

              return function (_x10) {
                return _ref14.apply(this, arguments);
              };
            }()]];

            // Match route and call handler

            i = 0;

          case 6:
            if (!(i < routes.length)) {
              _context14.next = 20;
              break;
            }

            method = routes[i][0];
            _route = routes[i][1];
            handler = routes[i][2];

            if (!(req.method !== method)) {
              _context14.next = 12;
              break;
            }

            return _context14.abrupt('continue', 17);

          case 12:
            matchedPath = new routeParser(_route).match(req.path);

            if (!matchedPath) {
              _context14.next = 17;
              break;
            }

            _context14.next = 16;
            return handler(matchedPath);

          case 16:
            return _context14.abrupt('return');

          case 17:
            ++i;
            _context14.next = 6;
            break;

          case 20:

            // No routes were matched, respond with 404
            res.status(404).send({ errors: { body: ['404 Not found: [' + req.method + ' ' + req.path + ']'] } });

          case 21:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function route(_x6, _x7) {
    return _ref7.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/******************************************************************************
 *      REMEMBER TO TRANSPILE THIS FILE BEFORE RUNNING :: sls deploy
 *  PATH=$PATH:$(pwd)/node_modules/.bin && babel api.js --out-dir transpiled
 * ----------------------------------------------------------------------------
 */
require('babel-polyfill');

var ds = require('@google-cloud/datastore')();
var namespace = process.env.DATASTORE_NAMESPACE ? process.env.DATASTORE_NAMESPACE : '';
var routeParser = require('route-parser');

exports.api = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(req, res) {
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            res.setHeader('Content-Type', 'application/json');
            _context15.prev = 1;
            _context15.next = 4;
            return route(req, res);

          case 4:
            _context15.next = 10;
            break;

          case 6:
            _context15.prev = 6;
            _context15.t0 = _context15['catch'](1);

            console.log(_context15.t0);
            res.status(422).send({ errors: { body: [_context15.t0.message] } });

          case 10:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, undefined, [[1, 6]]);
  }));

  return function (_x11, _x12) {
    return _ref15.apply(this, arguments);
  };
}();