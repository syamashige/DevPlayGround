const AWS = require('aws-sdk');
const rekognition = new AWS.Rekognition({region: "us-east-1"});

var params = {
  Image: {
   S3Object: {
    Bucket: "baseem", //S3 BUCKET_NAME
    Name: "debris.jpg" // image name
   }
  },
  MaxLabels: 123,
  MinConfidence: 40 //the percentage of the match
 };
 
 rekognition.detectLabels(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data);           // successful response
 });