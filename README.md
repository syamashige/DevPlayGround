## 30 Days of API - [API Playground](http://playground.baseem.me/).

This Web-App will include a library of API samples - to make it easier when working with the varios API's available. 

Including Code Samples, Demo Sites, and video tutorials.

Below are examples for getting started with the different API's:

## Emotional API - IBM WATSON - AUTH

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

## Conversation API - IBM WATSON - AUTH

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

## Translate API - GOOGLE - AUTH

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

## Yelp API - YELP - AUTH

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


## TMDB - The Movie Database - AUTH

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


## DaBus API - Honolulu - AUTH
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

## Archive.org API - NO AUTH

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

## GIFS! - Giphy API - AUTH

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

## Song Search - BPM API - AUTH

```js
app.get('/:id', (req, res) => {
  let query = req.params.id;
  let url = `https://api.getsongbpm.com/search/?api_key=${BPM_KEY}&type=song&lookup=${query}`
  axios.get(url)
  .then(data => {
    res.json(data.data.search);
  }).catch(err => {
    res.json('error');
  })
})
```

## Image Recognition - AWS Rekognition API - AUTH

- NPM Packages that help:
```js
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition({region: config.region}); //"us-east-1"
```

- Save the photo in a local folder
```js
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'routes/')
  },
  filename: function (req, file, cb) {
    cb(null, 'bat' + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });
```

- Create the Params 
```js
function getImage(){
  const imagePath = `./bat.jpg`;
  const bitmap = fs.readFileSync(imagePath);
  const params = {
      Image: { 
        Bytes: bitmap
      },
      MaxLabels: 10,
      MinConfidence: 50.0
    };
  return params
}
```

```js
app.post('/recognition', upload.single('image'), (req, res) => {
  let params = getImage();
  rekognition.detectLabels(params, function(err, data) {
    if (err) {
      console.log('error');
    }else {
      console.log(data);
      res.json(data);
    }
  });
});
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
