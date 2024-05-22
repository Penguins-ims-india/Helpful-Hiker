module.exports = (req, res, next) => {
  console.log('auth user', req.user)
  if ( req.user ) { next(); }
  //else { res.redirect('/') }
}