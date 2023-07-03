# Put Graasp in maintenance mode

Maintenance mode is currently setup at the infrastructure level. Go through the following steps to enable the maintenance:

1. In Cloudfront, go into each distribution frontend you want to be affected
2. Behavior > Edit the default behavior > Function association > Viewer request > Lambda@Edge > `arn:aws:lambda:us-east-1:592217263685:function:maintenance-check:2` (Lambda@Edge can only be defined in us-east region)
3. Also add the `allowMaintenanceHeader` policy in "Origin request policy"
4. In the backend load balancer, edit the `HTTPS:443` listener
5. Rules > Edit the rule 1 > Add condition > HTTP Header > Use the same header name and value as in the Lambda code

To disable the maintenance, remove the cloudfront Lambda and the backend load balancer rule.

## How it works

For future reference here is the code sample from the Lambda:

```js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });
const s3 = new AWS.S3();

const CONFIG_BUCKET = 'graasp-maintenance-production';
const CONFIG_KEY = 'maintenance_mode.json';

async function isMaintenanceEnabled() {
  const params = {
    Bucket: CONFIG_BUCKET,
    Key: CONFIG_KEY,
  };

  const response = await s3.getObject(params).promise();
  const config = JSON.parse(response.Body.toString());
  return config.maintenance === true;
}

exports.handler = async (event, context) => {
  const maintenanceEnabled = await isMaintenanceEnabled();

  if (maintenanceEnabled) {
    const headers = event.Records[0].cf.request.headers;
    console.log(headers)
    if (headers['<Secret Header Name>'] && headers['<Secret Header Name>'][0].value === '<Secret Header Value>') {
      return event.Records[0].cf.request;
    }

    return {
      status: '302',
      statusDescription: 'Found',
      headers: {
        'location': [{
          key: 'Location',
          value: 'https://maintenance.graasp.org',
        }],
      },
    };
  } else {
    return event.Records[0].cf.request;
  }

};
```

A separated cloudfront distribution is pointed to from `maintenance.graasp.org` and is using a S3 bucket containing only an `index.html` page and a `maintenance_mode.json` with a boolean.
The lambda is checking if the maintenance is activated in the JSON file and will redirect to the maintenance page if a secret HTTP header with correct value is not present. This will redirect everyone while still allowing devs to access and test the app by using a browser extension like [ModHeader](https://chrome.google.com/webstore/detail/modheader-modify-http-hea/idgpnmonknjnojddfkpgkljpfnnfcklj) to add the secret header to all their requests.

But the API would still be accessible manually as this only blocks the frontend, for a complete maintenance, we also need to add a rule at the load balancer level for the backend.

We use Lambda@Edge to execute the lambda on each user request to a Cloudfront distribution. The lambda is written in a way to be always activated, the maintenance mode could then be activated or disabled by checking the `maintenance_mode.json`. However, for now we can remove the lambda altogether to disable maintenance in order to avoid costs. Also since the backend is not behind a cloudfront distribution, we still need to handle the load balancer rule manually. 


# Alternatives

There are some other ways to implement a maintenance mode depending on how often we need it (ideally not often and high availability should be handled by deployment).

1) Automate the current methods: use a GitHub actions to automate the current process
2) Soft maintenance: just point the DNS records to the maintenance page temporarily or point all cloudfront distributions to the maintenance bucket. This would still allow access to the backend indirectly.
3) Directly implemented into the app: probably the most versatile way. Create an endpoint in the backend to enable/disable maintenance, maybe by changing a flag in the database. The backend would then answer 503 to each request without the correct secret header. Then each frontend would be able to request an endpoint to check if maintenance is activated. If not it could display the maintenance page.