'use strict'
const koa = require('koa')
const koaRouter = require('koa-router')
const {DateTime} = require('luxon')
const dotenv = require("dotenv");
dotenv.config();
const config = require('./config').getConfig();
const logger = require('./logger')
const openhim = require('./openhim')
var checker = require('./checker');
var deactivate = require('./deactivate');
var bodyParser = require('koa-bodyparser');
const e = require('express');
const app = new koa();
const router = new koaRouter();
const superagent = require('superagent');
app.use(bodyParser());
  router.get('/', async(ctx, next) => {
   await superagent.get(process.env.SOSYS_URL+'/members/memberlist/')
      .then(res => {
        // deactivate.patientSync();
        checker.objectChecker(res.body.results);
        ctx.body = res.body;
      })
      .catch(err => {
        ctx.body = err;
      });
    next()
  })

app.use(router.routes())
app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}...`)
    if (config.openhim.register) {
      openhim.mediatorSetup()
    }
  })