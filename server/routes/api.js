const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const app = express();
app.use(fileUpload());
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var multer = require('multer');
var path = require('path');

var db;
// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017', (err, client) => {
        if (err) return console.log(err);
        db = client.db('biofarma');
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

//Add product
// router.post('/addProduct', (req, res) => {
//   //console.log(req);
//   //console.log(res);
//   console.log(req.body);
//     connection((db) => {
//         db.collection('products')
//             .insert(req.body)
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

//getTable
router.post('/getAll', (req, res) => {
    connection((db) => {
        db.collection(req.body.collectionName.toString())
            .find()
            .sort(req.body.order)
            .limit(req.body.limit)
            .toArray()
            .catch((err) => {
                sendError(err, res);
                response.message = {success:"",error:err};
                res.send({response});
            })
            .then((result) => {
                response.data = result;
                response.ok = true;
                response.status = 1;
                response.message = {success:"Se obtuvieron los registros correctamente",error:""};
                res.send({response});
            });
    });
});

//addToTable
router.post('/add', (req, res) => {
    connection((db) => {
        var update = req.body.form._id;
        delete req.body.form._id;
        if (update != null && update != "") {

            db.collection(req.body.collectionName.toString())
                .update(
                    {_id: new ObjectID(update)},
                    {$set:req.body.form}
                )
                .catch((err) => {
                    sendError(err, res);
                    response.message = {success:"",error:err};
                    res.send({response});
                }).then((result) => {
                    response.ok = true;
                    response.data = req.body.form;
                    response.status = 1;
                    response.message = {success:"Se a editado correctamente",error:""};
                    res.send({response});
                });
        } else {
            db.collection(req.body.collectionName.toString())
                .insert(req.body.form)
                .catch((err) => {
                    sendError(err, res);
                    response.message = {success:"",error:err};
                    res.send({response});
                }).then((result) => {
                    response.ok = true;
                    response.data = req.body.form;
                    response.status = 1;
                    response.message = {success:"Se a guardado correctamente",error:""};
                    res.send({response});
                });
        }

    });
});

//get item
router.post('/getOne', (req, res) => {
    var add = {_id: new ObjectID(req.body.id)};
    connection((db) => {
        db.collection(req.body.collectionName.toString())
            .find(add)
            .sort(req.body.order)
            .limit(req.body.limit)
            .toArray()
            .catch((err) => {
                sendError(err, res);
                response.message = {success:"",error:err};
                res.send({response});
            })
            .then((result) => {
                response.data = result;
                response.ok = true;
                response.status = 1;
                response.message = {success:"Se obtuvo correctamente el registro",error:""};
                res.send({response});
            });
    });
});


//delete item
router.post('/delete', (req, res) => {
    var remove = {_id: new ObjectID(req.body.id)};
    connection((db) => {
        db.collection(req.body.collectionName.toString())
            .deleteOne(remove)
            .catch((err) => {
                sendError(err, res);
                response.message = {success:"",error:err};
            }).then((result) => {
                response.ok = true;
                response.data = req.body.id;
                response.status = 1;
                response.message = {success:"Se a eliminado correctamente",error:""};
                res.send({response});
            });
    });
});

//uploadImages

var storage = multer.diskStorage({
  // destino del fichero
  destination: function (req, file, cb) {
    cb(null, './src/assets/resources/images/');
  },
  // renombrar fichero
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

router.post("/upload", upload.array("files", 12), function (req, res) {
  response.ok = true;
  response.data = req.body;
  response.status = 1;
  response.message = {success:"Se a subido el archivo correctamente",error:""};
  res.send({response});

});

//uploadImages

// router.post('/upload', "files", (req, res) => {
//   console.log(req);
//   //console.log(res);
//     if (!req.files)
//         return res.status(0).send('No files were uploaded.');
//
//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let sampleFile = req.body.files.sampleFile;
//
//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(req.body.pathFile.toString(), function(err) {
//         if (err)
//             return res.status(0).send(err);
//
//         res.send('File uploaded!');
//     });
// });

// Get products
// router.get('/products', (req, res) => {
//     connection((db) => {
//         db.collection('products')
//             .find()
//             .toArray()
//             .then((product) => {
//                 response.data = product;
//                 res.json({response});
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

// Get last products
router.get('/lastProducts', (req, res) => {
    connection((db) => {
        db.collection('products')
            .find()
            .sort({_id: -1})
            .limit(3)
            .toArray()
            .then((products) => {
                response.data = products;
                res.json({response});
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

//Upload files
// router.use(fileUpload());
// router.post('/uploadFiles', function(req, res) {
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
//
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.sampleFile;
//
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('./assets/resources/productImages/', function(err) {
//     if (err)
//       return res.status(500).send(err);
//
//     res.send('File uploaded!');
//   });
// });

module.exports = router;
