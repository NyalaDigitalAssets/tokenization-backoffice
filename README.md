# Ganymede.Backoffice
##### Containerized Angular+Node application communicating with the Nyala (Ganymede.API) in a convenient way.

## Setup Process

1. Clone repository

```
git clone https://github.com/BloxxonAG/ganymede-backoffice
```

2. Build docker image

```
docker build . -t ganymede-backoffice
```

3. Edit docker-compose.yml

```
environment:
      - URL=URL_PROVIDED_TO_YOU
      - API_KEY=YOUR_API_KEY
      - API_SECRET=YOUR_API_SECRET
```

4. Run docker-compose up

![image](https://user-images.githubusercontent.com/24613746/133413158-8ffdd2fa-3e9f-44b9-8a59-2af890e26fb5.png)

## Easy redeploy

1. Navigate to the git folder

2. Open powershell and run the redeploy.ps1 script

```
./redeploy.ps1
```
