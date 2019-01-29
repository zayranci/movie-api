const chai = require ('chai');
const chaiHttp = require ('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token, directorId;

describe('api/director tests',()=>{
   before((done)=>{
       chai.request(server)
           .post('/authenticate')
           .send({username:'zala', password:'123456789'})
           .end((err,res)=>{
               token=res.body.token;
               done();
           });
   });

   describe('/GET directors',()=>{
       it('it should GET all the directors',(done)=>{
           chai.request(server)
               .get('/api/directors')
               .set('x-access-token',token)
               .end((err,res)=>{
                   res.should.have.status(200);
                   res.body.should.be.a('array');
                   done();
               });
       });
   });
   describe('/POST directors', ()=>{
       it('it should POST all the directors',(done)=>{
          const director = {
              name: 'Zeliha',
              surname: 'Ayranci',
              bio: 'zayranci'
          };
          chai.request(server)
              .post('api/directors')
              .send(director)
              .set('x-access-token',token)
              .end((err,res)=>{
                  res.should.have.status(200);
                  res.should.be.a('object');
                  res.body.should.have.property('name');
                  res.body.should.have.property('surname');
                  res.body.should.have.property('bio');
                  directorId=res.body._id;
                  done();
              });
       });
   });
   describe('/GET/:director_id director',()=>{
        it('it should GET a director given by id', (done)=>{
            chai.request(server)
                .get('/api/directors/' + directorId)
                .set('x-access-token', token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('surname');
                    res.body.should.have.property('bio');
                    res.body.should.have.property('_id').eql(directorId);
                    done();
                });
        });
    });
   describe('/PUT :director_id', () => {
        it('it should UPDATE all the directors', (done) => {
            const director = {
                name: 'Nadine',
                surname:'Labaki',
                bio: 'lorem ipsus',

            };

            chai.request(server)
                .put('/api/directors/' + directorId)
                .send(director)
                .set('x-access-token', token)
                .end((err, res) => {
                    if (err)
                        throw err;

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(director.name);
                    res.body.should.have.property('surname').eql(director.surname);
                    res.body.should.have.property('bio').eql(director.bio);
                    done();
                });
        });
    });
   describe('/DELETE :director_id', () => {
        it('it should DELETE the director', (done) => {
            chai.request(server)
                .del('/api/directors/' + directorId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

});