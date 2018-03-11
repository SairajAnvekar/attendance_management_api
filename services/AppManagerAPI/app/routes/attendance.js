const passport = require('passport'),
      config = require('@config'),
      models = require('@AppManager/app/setup');
module.exports = (app) => {
  const api = app.AppManagerAPI.app.api.attendance;
 
  app.route('/api/v1/attendance')
     .post(passport.authenticate('jwt', config.session),api.store(models.User,models.Attendance,app.get('tokensecret')))
  app.route('/api/v1/attendance')
     .get(passport.authenticate('jwt', config.session),  api.getAll(models.User,models.Attendance, app.get('tokensecret')));

}