#!/bin/bash

CMD="aws cloudformation deploy --capabilities CAPABILITY_NAMED_IAM --template-file $PWD/tf-exec-role/cfn-tf-exec-role.yml --parameter-overrides file://$PWD/tf-exec-role/cfn-tf-exec-role.json --stack-name tf-exec-role"
ACCOUNTS="np origin"

for ACCOUNT in $ACCOUNTS
do
  $CMD --profile "$ACCOUNT"
done
