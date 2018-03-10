This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


This Web-App will include a library of API samples - to make it easier when working with the varios API's available for us to use. 

Including Code Samples, Videos, Demo Sites

Below are examples for getting started with the different API's:

## Emotional API - IBM WATSON

```js
const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const personality_insights = new PersonalityInsightsV3({
  username: process.env.IBM_USERNAME,
  password: process.env.IBM_PASSWORD,
  version_date: process.env.IBM_VERSIONDATE,
  headers: {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});

app.post('/', (req,res) => {
  var text = req.body.text;
  personality_insights.profile(
  {text: text},
  function (err, response) {
    if (err)
      res.status(404).json({error: err});
    else
      res.json(response);
  });
});
```

## Conversation API - IBM WATSON

```js
const ConversationV1 = require('watson-developer-cloud/conversation/v1');
const conversation = new ConversationV1(config.conversParams);
const workspace_id = process.env.IBM_WORKSPACEID;

app.post('/', (req,res) => {
  var msg = req.body.msg;
  conversation.message(
    {
      input: { text: msg },
      workspace_id: workspace_id
    },
    function(err, response) {
      if (err) {
        console.error(err);
      } else {
        var watsonResponse = response.output.text[0];
        res.json(response)
      }
    }
  );
})
```

## Translate API - GOOGLE

```js

app.post('/', (req, res) => {
  var q = req.body.q;
  var options = { method: 'POST',
   url: 'https://translation.googleapis.com/language/translate/v2',
   form: 
     { key: process.env.API_KEY,
       q: q,
       target: 'en' } };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
})
```

## Yelp API - YELP

```js
const yelp        = require('yelp-fusion');
const API_KEY      = process.env.YELP_APIKEY;
const client      = yelp.client(API_KEY);
const yelp = require('yelp-fusion');
const API_KEY = process.env.YELP_APIKEY;
const client = yelp.client(API_KEY);

app.get('/:id', (req, res) => {
  const zipcode = req.params.id;

  const searchRequest = {
    term: 'food',
    limit: 10,
    radius: 20000,
    location: zipcode
  };
    client.search(searchRequest)
    .then(response => {
      res.json(response.jsonBody.businesses)
    }).catch(e => {
      console.log(e);
    });
})

```


## TMDB - The Movie Database

```js
 getFilm() {
  const API_KEY = process.env.TMDB_API_KEY;
  let query = 'batman';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`;

    axios.get(url)
    .then(data => {
      console.log(data);
    }).catch(err => {
    console.log('error');
    })
  }
```


## DaBus API - Honolulu
 - The api does not have json :(, you can use this npm package to convert xml to json:

```js
const parseString = require('fast-xml2js').parseString;
```

```js
const busURL = `http://api.thebus.org/arrivals/?key=${API_KEY}&stop=`;

app.get('/:id', (req,res) => {
  var all = []
  var id = req.params.id;
  axios(busURL+id).then((data) => {
    var xml = data.data;
    parseString(xml, function (err, result) {
    var body = result.stopTimes.arrival || [];
    var stop = result.stopTimes.stop;
    var x = body.map((elem,i) => {
      var local = {};
      local.stop = stop[0];
      local.id = elem.id[0];
      local.trip = elem.trip[0];
      local.route = elem.route[0];
      local.headsign = elem.headsign[0];
      local.vehicle = elem.vehicle[0];
      local.direction = elem.direction[0];
      local.stopTime = elem.stopTime[0];
      local.date = elem.date[0];
      local.canceled = parseInt(elem.canceled[0]);
      local.lat = elem.latitude[0];
      local.lng = elem.longitude[0];
      local.shape = elem.shape[0];
      all.push(local);
    })
    res.json(all)
  });
  }).catch(err =>{
    console.log('error')
  })
})

```

## Archive.org API

```js
app.get('/:id', (req, res) => {
  let rows = req.params.id;
  let mediatype = 'audio';
  let output = 'json';
  let archiveUrl = `https://archive.org/advancedsearch.php?q=subject%3A%22librivox%22+AND+mediatype%3A${mediatype}&fl[]=avg_rating&fl[]=publisher&fl[]=description&fl[]=downloads&fl[]=identifier&fl[]=mediatype&fl[]=num_reviews&fl[]=title&sort[]=&sort[]=&sort[]=&rows=${rows}&page=1&output=${output}`
  axios.get(archiveUrl)
  .then(elem => {
    res.json(elem.data.response.docs);
  })
})
```

## GIFS! - Giphy API

```js
app.get('/:id', (req, res) => {
  var query = req.params.id;
  var url = `http://api.giphy.com/v1/gifs/search?q=random+${query}&api_key=${apikey}`;
  axios.get(url)
  .then(obj => {
    res.json(obj.data);
  }).catch(err => {
    res.json('error')
  })
})
```
