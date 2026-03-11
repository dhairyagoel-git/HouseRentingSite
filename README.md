# House Renting Site

## AI-FSD Project
### B tech semester Four MSE-01

## Deployed on render

Live Demo [HouseRentingSite](https://houserentingsite.onrender.com/).


## To run this app locally
*This Project runs on Docker*

* Clone the repo ```git clone https://github.com/Dhruvgoel3829/HouseRentingSite.git```

* Open the project in any code editor
* Go to ```HouseRentingSite/backend```
* Create a ```.env``` file and add the variables provided privately.
* Build and run the Docker image from root directory ```HouseRentingSite```
```
docker build -t house-renting-app .
docker run -p 8001:8001 --env-file backend/.env house-renting-app

```
* Visit The APP on localhost:8001