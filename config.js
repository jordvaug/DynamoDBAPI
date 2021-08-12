var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

module.exports = {
    aws_table_name: process.env.TABLE,
    aws_local_config: {
      //Provide details for local configuration
    },
    aws_remote_config: {
      accessKeyId: process.env.KEY,
      secretAccessKey: process.env.SECRET,
      region: process.env.REGION,
    }
};