import 'dotenv/config';

import app from './app';

const port = process.env.API_PORT || 3020;

app.listen(port, () => {
  console.log(`CORS-enabled web server listening on port ${port}`);
});
