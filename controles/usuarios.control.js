("use strict");

require("dotenv").config();
const { mongo } = require("mongoose");
const jwt = require("jsonwebtoken");
const mongodb = require("../models/models"),
  fs = require("fs"),
  bcrypt = require("bcrypt");
const prueba = (req, res) => {
  res.status(200).send("Hola api");
};
const updateNewVictoryDriver = (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
  mongodb.Driver.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        victorias: data,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(400);
        res.json({
          error: "no text",
        });
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const insertRecordDriver = (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
  mongodb.Driver.updateOne(
    {
      _id: id,
    },
    {
      $push: {
        records: data,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(400);
        res.json({
          error: "no text",
        });
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const updateRecordDriver = (req, res) => {
  const id = req.body.id;
  const idTrack = req.body.idTrack;
  const data = req.body.data;
  mongodb.Driver.updateOne(
    {
      _id: id,
      "records.pista": idTrack
    },
    {
      $set: {
        "records.$.tiempo": data,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(400);
        res.json({
          error: "no text",
        });
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const deleteRecordDriver = (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
  mongodb.Driver.updateOne(
    {
      _id: id,
    },
    {
      $pull: {
        records: data,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(400);
        res.json({
          error: "no text",
        });
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const updateFavoriteTrackDriver = (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
  mongodb.Driver.updateOne(
    {
      _id: id,
    },
    data,
    (err, doc) => {
      if (err) {
        res.status(400);
        res.json({
          error: "no text",
        });
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const findByIdDriver = (req, res) => {
  const id = req.query.idDriver;
  if (id) {
    mongodb.Driver.findOne({
      _id: id,
    })
      .populate({
        path: "victorias.pista",
        select: "nombre pais",
      })
      .populate({
        path: "victorias.campeonato",
      })
      .populate({
        path: "records.pista",
        select: "nombre pais",
      })
      .populate({
        path: "pistaFavorita",
        select: "nombre pais",
      })
      .exec((err, doc) => {
        if (err || doc.length === 0) {
          res.status(400);
          res.json({
            error: "no text",
          });
        } else {
          res.status(200);
          res.json(doc);
        }
      });
  } else {
    res.status(400);
    res.json({
      error: "no text",
    });
  }
};
const testArr = (req, res) => {
  mongodb.TestArr.create(req.body, (err, doc) => {
    if (err) {
      res.status(400);
      res.json({
        error: "no text",
      });
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const testUpdateArr = (req, res) => {
  mongodb.TestArr.updateOne(
    { name: req.body.name },
    {
      $push: {
        arr: req.body.arr,
      },
    },
    (err, doc) => {
      if (err) {
        res.status(400);
        res.json({
          error: "no text",
        });
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const testUnsetArr = (req, res) => {
  mongodb.TestArr.updateOne(
    { name: req.body.name },
    {
      $pull: {
        arr: { _id: req.body.idArr },
      },
    },
    (err, doc) => {
      if (err) {
        res.status(400);
        res.json({
          error: "no text",
        });
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const createRecord = (req, res) => {
  mongodb.Record.create(req.body, (err) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json("Creado Exitosamente");
    }
  });
};
const createProfile = (req, res) => {
  mongodb.Profile.create(req.body, (err) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json("Creado Exitosamente");
    }
  });
};
const createFault = (req, res) => {
  mongodb.Faults.create(req.body, (err) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json("Creado Exitosamente");
    }
  });
};
const findAllProfiles = (req, res) => {
  mongodb.Profile.find({}, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const findSpecificProfileChampionship = (req, res) => {
  mongodb.Profilechampionship.find(
    {
      profile: req.params.idProfileChampionship,
    },
    (err, doc) => {
      if (err || doc.length === 0) {
        res.status(204);
        res.json("fallo servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const createProfileChampionship = (req, res) => {
  mongodb.Profilechampionship.updateOne(
    {
      profile: req.body.profile,
    },
    req.body,
    {
      upsert: true,
    },
    (err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const findChampionship = (req, res) => {
  mongodb.Championship.find((err, doc) => {
    if (err || doc.length < 1) {
      console.log(doc.length);
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const findAllProfileChampionship = (req, res) => {
  mongodb.Profilechampionship.find()
    .populate({
      path: "profile",
    })
    .exec((err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const findSpecificChampionship = (req, res) => {
  mongodb.Championship.find(
    {
      mundial: req.body.mundial,
    },
    (err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const findRecord = (req, res) => {
  mongodb.Record.find(
    {
      championship: req.params.idChampionship,
    },
    (err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};

const convertBase64 = (dir) => {
  return new Promise((resolve) => {
    const bs64 = fs.readFileSync(dir, { encoding: "base64" });
    resolve(bs64);
  });
};

const getImagesPilots = async (req, res) => {
  const name = req.params.name;
  const dir = `./f1photos/${name}/`;
  const dirFiles = fs.readdirSync(dir);
  const getRandomResult = dirFiles[Math.floor(Math.random() * dirFiles.length)];
  let resultbase64 = await convertBase64(`${dir}${getRandomResult}`);
  let format64 = `data:image/jpeg;base64,${resultbase64}`;
  res.status(200);
  res.json(format64);
};
const getLogosScuderias = async (req, res) => {
  const name = req.params.name;
  const dir = `./f1photos/${name}/`;
  const dirFiles = fs.readdirSync(dir);
  dirFiles.sort((a, b) => a.length - b.length);
  const getFirstResult = dirFiles[0];
  let resultbase64 = await convertBase64(`${dir}${getFirstResult}`);
  let format64 = `data:image/jpeg;base64,${resultbase64}`;
  res.status(200);
  res.json(format64);
};
const arrImages = async (req, res) => {
  const dir = `./f1photos/`;
  const dirFiles = fs.readdirSync(dir);
  res.status(200);
  res.json(dirFiles);
};
const getProfiles = (req, res) => {
  mongodb.Profile.find((err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const createChampionship = (req, res) => {
  mongodb.Championship.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const createTrack = (req, res) => {
  mongodb.Track.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const updateTrack = (req, res) => {
  mongodb.Track.updateOne(
    {
      _id: req.body.idTrack,
    },
    {
      piloto: req.body.driverFl,
      vuelta: req.body.newFasLap,
    },
    {
      upsert: true,
    },
    (err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const updateTrackChampionship = (req, res) => {
  mongodb.TracksChampionship.updateOne(
    {
      _id: req.body.idTrackChampionship,
    },
    {
      estado: req.body.estado,
    },
    {
      upsert: true,
    },
    (err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const findTrack = (req, res) => {
  mongodb.Track.find((err, doc) => {
    if (err || doc.length == 0) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const createDriver = (req, res) => {
  mongodb.Driver.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const findDriver = (req, res) => {
  mongodb.Driver.find((err, doc) => {
    if (err || doc.length == 0) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const createScuderia = (req, res) => {
  mongodb.Scuderia.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const findScuderia = (req, res) => {
  mongodb.Scuderia.find()
    .populate({
      path: "piloto1",
    })
    .populate({
      path: "piloto2",
    })
    .exec((err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const createTracksChampionship = (req, res) => {
  mongodb.TracksChampionship.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const findTracksChampionship = (req, res) => {
  mongodb.TracksChampionship.find({
    championship: req.params.championship,
  })
    .populate({
      path: "championship",
    })
    .populate({
      path: "pista",
    })
    .exec((err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const findDriverVitaeChampionship = (req, res) => {
  mongodb.DriverVitae.find({
    championship: req.params.championship,
  })
    .populate({
      path: "piloto",
    })
    .populate({
      path: "pistaCampeonato",
    })
    .populate({
      path: "championship",
    })
    .exec((err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const findFasLapDriverChampionship = (req, res) => {
  mongodb.FasLapDriver.find({
    championship: req.params.championship,
  })
    .populate({
      path: "piloto",
    })
    .populate({
      path: "pistaCampeonato",
    })
    .populate({
      path: "championship",
    })
    .exec((err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const createScuderiasChampionship = (req, res) => {
  mongodb.ChampionshipScuderia.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const createDriverVitaeChampionship = (req, res) => {
  mongodb.DriverVitae.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const createFasLapDriverChampionship = (req, res) => {
  mongodb.FasLapDriver.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const findChampionshipScuderias = (req, res) => {
  mongodb.ChampionshipScuderia.find({
    championship: req.params.championship,
  })
    .populate({
      path: "championship",
    })
    .populate({
      path: "escuderia",
    })
    .exec((err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const findAllScuderiasChampionship = (req, res) => {
  mongodb.ChampionshipScuderia.find({
    championship: req.params.championship,
  })
    .populate({
      path: "championship",
    })
    .populate({
      path: "escuderia",
    })
    .exec((err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const findChampionshipDriver = (req, res) => {
  mongodb.ChampionshipDriver.find({
    piloto: req.params.driver,
    championship: req.params.championship,
  })
    .populate({
      path: "piloto",
    })
    .populate({
      path: "championship",
    })
    .exec((err, doc) => {
      if (err || doc.length == 0) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const findPointsDriverChampionship = (req, res) => {
  mongodb.ChampionshipDriver.find({
    championship: req.params.championship,
  })
    .populate({
      path: "piloto",
    })
    .populate({
      path: "championship",
    })
    .exec((err, doc) => {
      if (err || doc.length == 0) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const findChampionshipScuderia = (req, res) => {
  mongodb.ChampionshipScuderia.find({
    escuderia: req.params.scuderia,
    championship: req.params.championship,
  })
    .populate({
      path: "escuderia",
    })
    .populate({
      path: "championship",
    })
    .exec((err, doc) => {
      if (err || doc.length == 0) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const updateChampionship = (req, res) => {
  mongodb.Championship.updateOne(
    {
      _id: req.body._id,
    },
    {
      playing: req.body.playing,
    },
    (err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const updateDriver = (req, res) => {
  mongodb.Driver.updateOne(
    {
      _id: req.body._id,
    },
    req.body,
    (err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const updateScuderia = (req, res) => {
  mongodb.Scuderia.findByIdAndUpdate(req.body._id, req.body, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const updateScuderiaChampionship = (req, res) => {
  mongodb.ChampionshipScuderia.findByIdAndUpdate(
    req.body._idScuderia,
    {
      victorias: req.body.victorias,
      doblete: req.body.doblete,
    },

    (err, doc) => {
      if (err) {
        console.log(err);
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const createChampionshipScuderia = (req, res) => {
  mongodb.ChampionshipScuderia.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const createChampionshipDriver = (req, res) => {
  mongodb.ChampionshipDriver.create(req.body, (err, doc) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json(doc);
    }
  });
};
const updateChampionshipScuderia = (req, res) => {
  mongodb.ChampionshipScuderia.updateOne(
    {
      escuderia: req.body.escuderia,
      championship: req.body.championship,
    },
    req.body,
    (err, doc) => {
      if (err) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const updateChampionshipDriver = (req, res) => {
  console.log(req.body);
  mongodb.ChampionshipDriver.findByIdAndUpdate(
    req.body._id,
    req.body,
    (err, doc) => {
      if (err) {
        console.log(err);
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const setNewUser = (req, res) => {
  mongodb.Users.create(req.body, (err, doc) => {
    if (err || doc.length === 0) {
      return res.status(400).send({
        //Contenido error en la petición
        message:
          err.name === "MongoError" && err.code === 11000
            ? "Server Failure"
            : err,
      });
    } else {
      return res.status(200).send("creado exitosamente");
    }
  });
};
const setNewReservation = (req, res) => {
  mongodb.Reservations.create(req.body, (err, doc) => {
    if (err || doc.length === 0) {
      return res.status(400).send({
        //Contenido error en la petición
        message:
          err.name === "MongoError" && err.code === 11000
            ? "Server Failure"
            : err,
      });
    } else {
      return res.status(200).send("creado exitosamente");
    }
  });
};
// router.get("/get-byuserid-reservation", getByUserIdReservation);
// router.get("/get-byuserid-cancelled-Reservation", getByUserIdCancelledReservation);
const getByUserIdReservation = (req, res) => {
  const tempId = "5e1b8d3031cfad3d44f81cc6 ";
  mongodb.Reservations.find({
    user: tempId /*req.body.user._id */,
    paid: true,
    cancelled: false,
  })
    .sort("summary.date")
    .select("summary paid cancelled ")
    .populate({
      path: "user",
      select: "firstName lastName email",
    })
    .exec((err, doc) => {
      if (err || !doc) {
        return res.status(400).send({
          //Contenido error en la petición
          message:
            err.name === "MongoError" && err.code === 11000
              ? "Server Failure"
              : err,
        });
      } else {
        res.status(200);
        res.json(doc);
      }
    });
};
const getRandomOndaWord = (req, res) => {
  mongodb.OndaWords.find()
    .select("word")
    .exec((err, doc) => {
      if (err || doc.length === 0) {
        console.log(err);
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        const getRandomResult = doc[Math.floor(Math.random() * doc.length)];
        res.status(200);
        res.json(getRandomResult);
      }
    });
};
const ondaWordChecked = (req, res) => {
  mongodb.OndaWords.find(
    {
      word: req.params.word,
    },
    (err, doc) => {
      if (err || doc.length === 0) {
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};
const ondaWordRegister = (req, res) => {
  const saltRounds = 12;
  mongodb.OndaWords.find({ word: req.body.word }, (err, data) => {
    if (err || data.length === 0) {
      bcrypt.hash(req.body.onda, saltRounds, (err, hash) => {
        try {
          mongodb.OndaWords.insertMany(
            {
              word: req.body.word,
              onda: hash,
            },
            (err) => {
              if (err) {
                res.status(204).send("error en el servidor");
              } else {
                res.status(200);
                res.json("creado exitosamente");
              }
            }
          );
        } catch {
          res.status(204).send("error en el servidor");
        }
      });
    } else {
      res.status(204).send("error en el servidor");
    }
  });
};
const checkToken = (req, res) => {
  jwt.verify(req.headers.autorizations, "my_secret_token", (err) => {
    if (err) {
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      res.status(200);
      res.json("usuario correcto");
    }
  });
};
const checkOndaWord = (req, res) => {
  mongodb.OndaWords.find({ _id: req.body.id }).exec((err, doc) => {
    if (err || doc.length === 0) {
      console.log(err);
      res.status(204);
      res.json("fallo en el servidor");
    } else {
      try {
        bcrypt.compare(req.body.onda, doc[0].onda, (err, result) => {
          if (err) {
            console.log(err);
            res.status(204);
            res.json("fallo en el servidor");
          } else {
            if (result) {
              var token = jwt.sign({ idword: doc._id }, "my_secret_token", {
                expiresIn: "1d",
              });
              1;
              let data = {
                id: doc[0]._id,
                token: token,
              };
              res.status(200);
              res.json(data);
            } else {
              res.status(204);
              res.json("usuario incorrecto");
            }
          }
        });
      } catch {
        res.status(204);
        res.json("usuario incorrecto");
      }
    }
  });
};

module.exports = {
  updateRecordDriver,
  insertRecordDriver,
  deleteRecordDriver,
  findByIdDriver,
  checkToken,
  ondaWordChecked,
  ondaWordRegister,
  checkOndaWord,
  getRandomOndaWord,
  getByUserIdReservation,
  setNewReservation,
  setNewUser,
  prueba,
  findChampionshipDriver,
  createChampionshipDriver,
  updateChampionshipDriver,
  updateScuderiaChampionship,
  updateTrack,
  updateDriver,
  createChampionship,
  createRecord,
  createProfile,
  createFault,
  findAllProfiles,
  getProfiles,
  findSpecificChampionship,
  findChampionship,
  findRecord,
  findSpecificProfileChampionship,
  createProfileChampionship,
  findAllProfileChampionship,
  getImagesPilots,
  createTrack,
  findTrack,
  createDriver,
  findDriver,
  arrImages,
  findScuderia,
  createScuderia,
  getLogosScuderias,
  createTracksChampionship,
  findTracksChampionship,
  createScuderiasChampionship,
  findChampionshipScuderia,
  updateChampionship,
  createDriverVitaeChampionship,
  findDriverVitaeChampionship,
  createFasLapDriverChampionship,
  findFasLapDriverChampionship,
  updateTrackChampionship,
  updateScuderia,
  updateChampionshipScuderia,
  createChampionshipScuderia,
  findPointsDriverChampionship,
  findAllScuderiasChampionship,
  findChampionshipScuderias,
  updateNewVictoryDriver,
  testArr,
  testUpdateArr,
  testUnsetArr,
  updateFavoriteTrackDriver,
};
