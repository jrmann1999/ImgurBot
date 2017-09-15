# Docker
Dockerized app, here's how I build and ran mine

### Build
docker build . -t <TAG>

### Run
docker run -p 90:90 -e IMGURAPIKEY=KEY -e SPARKAPIKEY=KEY --name Imgurbot -d <TAG>
