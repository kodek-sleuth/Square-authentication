const app = require('./app/main_app');

const port = process.env.PORT || 3000;

const targetBaseUrl = 'https://squaremodelsapp.herokuapp.com/api-docs';

const handleRedirect= (req, res)=> {
  
  const targetUrl = targetBaseUrl + req.originalUrl;
  
  res.redirect(targetUrl);

}

app.get('*', handleRedirect);

app.listen(port);