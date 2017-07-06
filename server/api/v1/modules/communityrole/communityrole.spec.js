const chai = require('chai');

const should = chai.should(); // eslint-disable-line no-unused-vars

const app = require('../../../../app');

const logger = require('../../../../logger');

const request = require('supertest');

const connectionString = require('../../../../config').connectionString;

const model = require('cassandra-driver');

const client = new model.Client({
  contactPoints: [connectionString.contact],
  protocolOptions: { port: connectionString.port },
  keyspace: connectionString.keyspace,
});

const postdata = [{
  /* domain: 'prakhar',*/
  role: 'developer',
  actions: {
    post: 'true',
    likes: 'false',
  },
  toolId: 'quora',

}, {
  /* domain: 'africans',*/
  role: 'cricketer',
  actions: {
    post: 'true',
    likes: 'false',
  },
  toolId: 'git',
}];
const patchdata = [{
  actions: {
    post: 'true',
    likes: 'true',
  },
  toolId: 'quora_patch',
}];
describe('Create a communityrole and update it', () => {
  before(() => {});
  it('Create a new communityrole', (done) => {
    request(app)
      .post('/api/v1/communityrole/africans')
      .send(postdata)
      .then(() => {
        logger.debug(`BEFORE CLIENT EXECUTE testcase${postdata}`);
        client.execute('SELECT * from communityroles where domain=\'africans\'', (err, result) => {
          if (!err) {
            logger.debug(`Result from testcase ${result.rows[0]}`);
            result.rows.length.should.be.equal(2);
            result.rows[0].actions.should.deep.equal(postdata[0].actions);
            done();
          }
        });
      })
      .catch((err) => {
        logger.debug('In error');
        done(err);
      });
  });
  it('Create a new communityrole', (done) => {
    request(app)
      .post('/api/v1/communityrole/prakhar')
      .send(postdata)
      .then(() => {
        logger.debug(`BEFORE CLIENT EXECUTE testcase${postdata}`);
        client.execute('SELECT * from communityroles where domain=\'prakhar\'', (err, result) => {
          if (!err) {
            logger.debug(`Result from testcase ${result.rows[0]}`);
            result.rows.length.should.be.equal(2);
            result.rows[0].actions.should.deep.equal(postdata[0].actions);
            done();
          }
        });
      })
      .catch((err) => {
        logger.debug('In error');
        done(err);
      });
  });

  it('Create a new communityrole', (done) => {
    request(app)
      .get('/api/v1/communityrole/prakhar')
      .then(() => {
        client.execute('SELECT * from communityroles where domain=\'prakhar\'', (err, result) => {
          if (!err) {
            logger.debug(`Result from testcase ${result.rows[0]}`);
            result.rows.length.should.be.equal(2);
            done();
          }
        });
      })
      .catch((err) => {
        logger.debug('In error');
        done(err);
      });
  });

  it('Create a new communityrole', (done) => {
    request(app)
      .get('/api/v1/communityrole/africans')
      .then(() => {
        client.execute('SELECT * from communityroles where domain=\'africans\'', (err, result) => {
          if (!err) {
            logger.debug(`Result from testcase ${result.rows[0]}`);
            result.rows.length.should.be.equal(2);
            done();
          }
        });
      })
      .catch((err) => {
        logger.debug('In error');
        done(err);
      });
  });


  it('Create a new communityrole', (done) => {
    request(app)
      .get('/api/v1/communityrole/random')
      .then(() => {
        client.execute('SELECT * from communityroles where domain=\'random\'', (err, result) => {
          if (!err) {
            logger.debug(`Result from testcase ${result.rows[0]}`);
            result.rows.length.should.be.equal(0);
            done();
          }
        });
      })
      .catch((err) => {
        logger.debug('In error');
        done(err);
      });
  });

  /*   it('Create a new communityrole', (done) => {
      request(app)
        .get('/api/v1/communityrole/smallu?onlyroles=true')
        .then(() => {
          client.execute('SELECT role from communityroles where domain=\'smallu\'',
           (err, result) => {
            if (!err) {
              logger.debug(`Result from onlyroles testcase ${result.rows[0]}`);
              result.rows.length.should.be.equal(2);
              done();
            }
          });
        })
        .catch((err) => {
          logger.debug('In error');
          done(err);
        });
    });*/


  it('Update actions of communityrole', (done) => {
    request(app)
      .patch('/api/v1/communityrole/africans/roles/cricketer')
      .send(patchdata)
      .then(() => {
        client.execute("SELECT * from communityroles where domain='africans'", (err, result) => {
          if (!err) {
            result.rows[0].actions.should.have.property('post').equal(patchdata[0].actions.post);
            done();
          }
        });
      })
      .catch((err) => {
        done(err);
      });
  });
  it('Update actions of communityrole', (done) => {
    request(app)
      .patch('/api/v1/communityrole/prakhar/roles/developer')
      .send(patchdata)
      .then(() => {
        client.execute("SELECT * from communityroles where domain='prakhar'", (err, result) => {
          if (!err) {
            result.rows[0].actions.should.have.property('post').equal(patchdata[0].actions.post);
            done();
          }
        });
      })
      .catch((err) => {
        done(err);
      });
  });


  after(() => {
    client.execute("DELETE FROM communityroles where domain='prakhar'");
    client.execute("DELETE FROM communityroles where domain='africans'");
  });
});
