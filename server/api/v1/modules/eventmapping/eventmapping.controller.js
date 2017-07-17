// const async = require('async');

// const communitytoolsCtrl = require('../communitytools/communitytools.controller');

const async = require('async');
const _ = require('lodash');
const communitytoolsCtrl = require('../communitytools/communitytools.controller');
const eventmappingServices = require('./eventmapping.service');

const COMMUNITY_TOOL_EVENT_MAP = 'communitytooleventmap';

/* function getActivityEvents(domainName, data)
{
console.log("communityactivitylist");
communitytoolsCtrl.getActions(domainName, data, (err, result) => {
if(err) {
console.log(err);
} else {
console.log("Activityevents", result);
}
})
}

async.waterfall([getActivityEvents.bind(null, domainName, data)], function(err, result)
{
if(err) {console.log(err);
} else {
console.log(result);
function getToolEventMapping(parameters, done) {
  eventmappingServices.getToolEventMapping(parameters, done);
}

function getToolMapping(parameters, done) {
  eventmappingServices.getToolMapping(parameters, done);
}

function postEventMapping(parameters, details, done) {
  let wrongvalues = 0;
  const queries = [];
  let query;
  details.forEach((data) => {
    if (!_.has(data, 'eventname') || !_.has(data, 'eventdescription') || !_.has(data, 'eventid') ||
      !_.has(data, 'communityactivityevent') || !_.has(data, 'metadata')) {
      wrongvalues++;
    }
    query = `insert into ${COMMUNITY_TOOL_EVENT_MAP} (domain, toolid, eventid, eventname, eventdescription, communityactivityevent, metadata) values (?,?,?,?,?,?,?)`;

    queries.push({
      query,
      params: [parameters.domain, parameters.toolid, data.eventid,
        data.eventname, data.eventdescription, data.communityactivityevent, data.metadata,
      ],
    });
  });
  if (wrongvalues === 0) {
    async.waterfall([
      eventmappingServices.getToolMapping.bind(null, parameters),
      eventmappingServices.postEventMapping.bind(null, queries),
    ], (err, result) => {
      if (err) { console.log('err', err); return done([400, 'Seems you\'re trying to reintegrate this tool with same domain']); }
      if (result) done(undefined, result);
    });
  } else {
    done([400, 'Required data inputs were not found']);
  }
}
function getmappingDetails(dataFromBody, done) {
  // console.log(dataFromBody);
  // console.log('aaa', dataFromBody.tooldata);
  eventmappingServices.getmappingDetails(dataFromBody.tooldata, dataFromBody.eventid, done);
function updateEventMapping(parameters, details, done) {
  let wrongvalues = 0;
  const queries = [];
  let query;
  details.forEach((data) => {
    if (!_.has(data, 'eventname') || !_.has(data, 'eventdescription') || !_.has(data, 'eventid') ||
      !_.has(data, 'communityactivityevent') || !_.has(data, 'metadata')) {
      wrongvalues++;
    }
    query = `update ${COMMUNITY_TOOL_EVENT_MAP} set eventname=?, eventdescription=?, communityactivityevent=? , metadata=? where domain=? and toolid=? and eventid=?`;

    queries.push({ query, params: [data.eventname, data.eventdescription, data.communityactivityevent, data.metadata, parameters.domain, parameters.toolid, data.eventid] });
  });
  console.log(queries);
  if (wrongvalues === 0) {
    async.waterfall([
      eventmappingServices.getToolMapping.bind(null, parameters),
      eventmappingServices.updateEventMapping.bind(null, queries),
    ], (err, result) => {
      if (err) { console.log('err', err); return done([400, 'Unexpected Error, or maybe the tool isn\'t integrated yet']); }
      if (result) done(undefined, result);
    });
  } else {
    done([400, 'Required data inputs were not found']);
  }
}


module.exports = {
  getmappingDetails,
  //getActivityEvents,
  //getActivityEvents,
};


  getToolMapping,
  getToolEventMapping,
  postEventMapping,
  updateEventMapping,
};

