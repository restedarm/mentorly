#!/bin/bash

if [[ ${NODE_ENV} == "production" ]] 
then
  npm run-script "start:prod"
else
  npm run-script "start:debug"
fi