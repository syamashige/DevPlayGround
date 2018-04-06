## 30 Days of API - [API Playground](http://playground.baseem.me/).

[![IBM](https://img.shields.io/badge/IBM-API-blue.svg)](https://www.ibm.com/watson/developercloud/personality-insights/api/v3/) [![AWS](https://img.shields.io/badge/AWS-API-blue.svg)](https://aws.amazon.com/rekognition/) [![BUS](https://img.shields.io/badge/DABUS-API-blue.svg)](http://hea.thebus.org/api_info.asp) [![GOOGLE](https://img.shields.io/badge/GOOGLE-API-blue.svg)](https://cloud.google.com/translate/) [![YELP](https://img.shields.io/badge/YELP-API-blue.svg)](https://www.yelp.com/fusion) [![ARCHIVE](https://img.shields.io/badge/ARCHIVE-API-blue.svg)](https://archive.org/) [![GIPHY](https://img.shields.io/badge/GIPHY-API-blue.svg)](https://developers.giphy.com/docs/) [![BPM](https://img.shields.io/badge/BPM-API-blue.svg)](https://getsongbpm.com/api) [![TMDB](https://img.shields.io/badge/TMDB-API-blue.svg)](https://www.themoviedb.org/documentation/api)




This Web-App will include a library of API samples - to make it easier when working with the varios API's available. 

Including Code Samples, Demo Sites, and video tutorials.

Below are examples for getting started with the different API's:

## Emotional API - [IBM WATSON](https://www.ibm.com/watson/developercloud/personality-insights/api/v3/) - AUTH

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

## Conversation API - [IBM WATSON](https://www.ibm.com/watson/developercloud/personality-insights/api/v3/) - AUTH

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

## [Translate](https://cloud.google.com/translate/) API - GOOGLE - AUTH

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

## Yelp API - [YELP](https://www.yelp.com/fusion) - AUTH

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


## [TMDB](https://www.themoviedb.org/documentation/api) - The Movie Database - AUTH

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


## [DaBus](http://hea.thebus.org/api_info.asp) API - Honolulu - AUTH
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

## [Archive.org](https://archive.org/) API - NO AUTH

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

## GIFS! - [Giphy](https://developers.giphy.com/docs/) API - AUTH

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

## Song Search - [BPM](https://getsongbpm.com/api) API - AUTH

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

## Image Emotional Recognition - [AWS](https://aws.amazon.com/rekognition/) Rekognition API - AUTH

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

## Image Label Detection - [AWS](https://aws.amazon.com/rekognition/) Rekognition API - AUTH 

- Image submitted for analysis
<img src="./ship.jpg" width="300"/>

- Code for analysis - nodeJs
```js
const AWS = require('aws-sdk');

const rekognition = new AWS.Rekognition({region: "us-east-1"});

var params = {
  Image: {
   S3Object: {
    Bucket: "S3 BUCKET_NAME", 
    Name: "ship.jpg"
   }
  }, 
  MaxLabels: 123, 
  MinConfidence: 40
 };
 rekognition.detectLabels(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });
```

- Analysis Response - adjustment on Confidence set lower for testing:
```js
 { Labels:
   [ { Name: 'Boat', Confidence: 99.26506042480469 },
     { Name: 'Transportation', Confidence: 99.26506042480469 },
     { Name: 'Vessel', Confidence: 99.26506042480469 },
     { Name: 'Watercraft', Confidence: 99.26506042480469 },
     { Name: 'Ferry', Confidence: 94.4769287109375 },
     { Name: 'Yacht', Confidence: 69.96138000488281 },
     { Name: 'Dock', Confidence: 53.720726013183594 },
     { Name: 'Pier', Confidence: 53.720726013183594 } ],
  OrientationCorrection: 'ROTATE_0' }
```

## Historical Weather API - DarkSky [Dark](https://darksky.net/forecast/40.7127,-74.0059/us12/en)

```js
const express = require('express');
const app = express();
const DarkSky = require('dark-sky')
const darksky = new DarkSky('process.env.API_KEY');

app.get('/:year/:month/:lat/:lng', (req, res) => {
  let year = req.params.year;
  let month = req.params.month;
  let lat = req.params.lat;
  let lng = req.params.lng;
  month === '2'
  ? count = 28
  : count = 30

  for(let i = 1; i < count; i++){ // run based off days in month
      darksky
      .latitude(lat) // set location lat
      .longitude(lng) // set location lng
      .time(`${year}-${month}-${i}`) // date based off api call
      .units('ca') // kph - mph available - check docs
      .get() // make request
      .then(data=>{   
        let num = 0;   
        data.hourly.data.map(elem => {
          num ++;
          console.log({
            hour: `Hour: ${num}`,
            time: elem.time,
            windSpeed: elem.windSpeed,
            units: 'KPH',
            windBearing: elem.windBearing
          })
        })
      })
      .catch(console.log);
  }
  res.json('Check your console - Data will be there');
})

app.listen(9000);
```
 - Output Example:
```js

{ hour: 'Hour: 24',
  time: 983696400,
  windSpeed: 16.8,
  units: 'KPH',
  windBearing: 70 }

```

## Video Analysis with AWS Rekognition - [AWS](https://aws.amazon.com/rekognition/) Rekognition API - AUTH 

```js
const express = require('express');
const app = express();
const AWS = require('aws-sdk');

const rekognition = new AWS.Rekognition({region: "us-east-1"});

const getVideo = (id) => {
  let params = {
    JobId: id, /* required */
    MaxResults: 10, // upto 100
    NextToken: 'NextToken',
    SortBy: "TIMESTAMP" // Also can be sorted by "NAME"
  };
  rekognition.getLabelDetection(params, function(err, data) {
      err
      ? console.log(err) // Common errors are related to AWS AUTH or JobId is invalid
      : console.log(data)
    })
}


let s3Params = {                   
  Video: {
    S3Object: {          
      Bucket: 'bucket name', // bucket name found on S3 Dashboard                                                                    
      Name: 'name.mp4' // case sensitive         
    }                       
  },
  // Optional -reuseable token setting
  "MinConfidence": 50,           
  NotificationChannel: {                                                                           
    RoleArn: `IAMROLE`, // found on AWS IAM Dashboard                            
    SNSTopicArn: `SNSTopicArn` // found on AWS Service: SNS                                              
  }
 }

app.get('/start', (req,res) => {
  rekognition.startLabelDetection(s3Params, function(err, data) {
    err
    ? console.log(err)
    : getVideo(data.JobId)
  });
  res.json('Check Console for Status')
})

app.listen(9000);
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
