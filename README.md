# openimis_node_openhim_patient_mediator
This is a openHIM mediator that is used to sync patient infomation between openimis and insurance companies through openHIM

## Setup
This mediator requires a successfull installation of openhim-console and openhim-core-js.whose installation guide can be found in  <https://github.com/jembi/openhim-console> and  <https://github.com/jembi/openhim-core-js> respectfully

### Docker

To run the mediator open a terminal and navigate to the project directory and run the following commands:

```sh
docker build -t patient .

docker run  -p 3005:3005 -d patient
```

### Node NPM
To run the patient mediator open a terminal and navigate to the project directory and run the following commands:
```sh
npm install
npm start
```

