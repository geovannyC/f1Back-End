("use strict");

require("dotenv").config();
const mongodb = require("../models/models"),
  fs = require("fs");

const prueba = (req, res) => {
  res.status(200).send("Hola api");
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
    if (err) {
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
    championship: req.params.championship
  })
    .populate({
      path: "piloto",
    })
    .populate({
      path: "championship",
    })
    .exec((err, doc) => {
      if (err||doc.length==0) {
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
    championship: req.params.championship
  })
    .populate({
      path: "piloto",
    })
    .populate({
      path: "championship",
    })
    .exec((err, doc) => {
      if (err||doc.length==0) {
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
      if (err||doc.length==0) {
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
        console.log(err)
        res.status(204);
        res.json("fallo en el servidor");
      } else {
        res.status(200);
        res.json(doc);
      }
    }
  );
};

module.exports = {
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
  findChampionshipScuderias
};
