# Elasticsearch

Example:

    aws cloudformation deploy --capabilities CAPABILITY_
    IAM --template-file $PWD/cognito-pools.yml --stack-name cognito-test-0001 --parameter-overrides file://$PWD/cognito-pools-params.json --stack-name cog-test-0001

To reset the password for Cognito user account:

    aws cognito-idp admin-set-user-password --user-pool-id <value> --username <value> --password <value> --permanent
