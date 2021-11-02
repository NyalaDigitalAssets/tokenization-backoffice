git checkout main
git pull
docker rm --force ganymede-backoffice
docker build . -t ganymede-backoffice
docker-compose up -d
