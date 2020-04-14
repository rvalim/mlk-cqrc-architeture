echo "### Starting service"
if [ "$NODE_ENV" == "production" ]
then
  npm run build:prod && npm run pm2
else
  npm run watch
fi
