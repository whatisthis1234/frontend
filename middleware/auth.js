// import jwt from 'jsonwebtoken';
import Auth from "../auth-service/simple-auth";

const util = {
  routeOption(route, key, value) {
    return route.matched.some(m => {
      if (process.client) {
        return Object.values(m.components).some(c => c.options && c.options[key] === value)
      } else {
        return Object.values(m.components).some(c => (
          Object.values(c._Ctor).some(ctor => ctor.options && ctor.options[key] === value)
        ));
      }
    });
  }
}

export default async function(ctx) {
  /** @type {Auth} */
  const auth = ctx.app.$auth;

  if (auth.isAtCallback) {
    try {
      await auth.fetchUser();
      ctx.redirect('/');
    } catch (error) {
      console.error('ERROR GETTING USER', error.message);
    }
  } else if (auth.isAtLogout) {
    if (process.server) {
      auth.logout();
      ctx.redirect('/')
    } else {
      location.replace('/logout')
    }
  } else if (!util.routeOption(ctx.route, 'auth', false) && !auth.loggedIn()) {
    console.log('You are not authorized to access this page!');
    ctx.redirect('/login');
  }
}