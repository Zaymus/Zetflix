const { env } = require("../util/constants");

var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3({
  apiVersion: 'latest',
  accessKeyId: env.S3_ID,
  secretAccessKey: env.S3_SECRET,
});

const bucketParams = {
  Bucket: env.S3_BUCKET_NAME,
}

s3.listObjects(bucketParams, (err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});