'use strict'
var request = require('request');
var auth = require('./auth');
var _ = require('lodash');
const dotenv = require("dotenv");
dotenv.config();
function objectChecker(data){
    data.forEach(obj => {
      let chf_id = obj.identifier.find(element =>element.type.coding[0].code=='SB').value
     request({
        url: process.env.OPENIMIS_URL+'/Patient/?identifier='+chf_id,
        method: 'GET',
        headers : {
          "Authorization" : auth.user
        },
      }, function(error, response, body){
      let res = JSON.parse(body).entry;
      if(res == undefined){
        request({
          url: process.env.OPENIMIS_URL+'/Patient/',
          method: 'POST',
          headers : {
            "Authorization" : auth.user
          },
          json:obj
        }, function(error, response, body){
          return body
        });
      }else{
        res.forEach(patient =>{
          if(patient.resource.dob!=obj.dob ||!_.isEqual(obj.telecom,patient.resource.telecom) || !_.isEqual(obj.name,patient.resource.name)){
              request({
               url: process.env.OPENIMIS_URL+'/Patient/'+patient.resource.id+'/',
               method: 'PUT',
               headers : {
                 "Authorization" : auth.user
               },
               json:obj
             }, function(error, response, body){
              return body
             });
            }
      });
      }
       
      });
    });
}

exports.objectChecker = objectChecker