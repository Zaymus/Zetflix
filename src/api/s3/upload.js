const fs = require('fs');
const { env, S3_FILE_TYPE } = require('../util/constants');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const s3 = new AWS.S3({
  apiVersion: 'latest',
  accessKeyId: env.S3_ID,
  secretAccessKey: env.S3_SECRET,
});

const uploadFile = (fileName, fileType) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
      Bucket: env.S3_BUCKET_NAME,
      Key: fileType + fileName, // File name you want to save as in S3
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};

uploadFile('default.png', S3_FILE_TYPE.AVATAR);