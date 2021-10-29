"use strict";
const { text } = require("body-parser");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const record = Schema(
  {
    Hamilton: Number,
    Bottas: Number,
    Verstappen: Number,
    Perez: Number,
    Ricciardo: Number,
    Norris: Number,
    Vettel: Number,
    Stroll: Number,
    Alonso: Number,
    Ocon: Number,
    Leclerc: Number,
    Sainz: Number,
    Gasly: Number,
    Tsunoda: Number,
    Raikkonen: Number,
    Giovinazzi: Number,
    Schumacher: Number,
    Russell: Number,
    Mazepin: Number,
    Latifi: Number,
    pista: String,
    vuelta: String,
    pvuelta: {
      type: mongoose.Schema.ObjectId,
      ref: "profile",
    },
    championship: {
      type: mongoose.Schema.ObjectId,
      ref: "championship",
    },
  },
  { timestamps: true }
);
const faults = Schema({
  pista: String,
  sancion: String,
  profile: {
    type: mongoose.Schema.ObjectId,
    ref: "profile",
  },
  championship: {
    type: mongoose.Schema.ObjectId,
    ref: "championship",
  },
});
const profilechampionship = Schema(
  {
    profile: {
      type: mongoose.Schema.ObjectId,
      ref: "profile",
    },
    puntos: Number,
    sanciones: Number,
    victorias: Number,
  },
  { timestamps: true }
);
const profile = Schema(
  {
    nombre: String,
    alias: String,
    escuderia: String,
    elejido: Boolean,
  },
  { timestamps: true }
);
const championship = Schema(
  {
    nombre: String,
    playing: Boolean,
  },
  { timestamps: true }
);
const tracksChampionship = Schema(
  {
    championship: {
      type: mongoose.Schema.ObjectId,
      ref: "championship",
    },
    pista: {
      type: mongoose.Schema.ObjectId,
      ref: "track",
    },
    posicion: Number,
    estado: Boolean,
  },
  {
    timestamps: true,
  }
);
const scuderiasChampionship = Schema(
  {
    championship: {
      type: mongoose.Schema.ObjectId,
      ref: "championship",
    },
    escuderia: {
      type: mongoose.Schema.ObjectId,
      ref: "scuderias",
    },
    posicion: Number,
    victorias: Number,
    doblete: Number,
  },
  {
    timestamps: true,
  }
);
const track = Schema(
  {
    nombre: String,
    pais: String,
    image: String,
    piloto: {
      type: mongoose.Schema.ObjectId,
      ref: "driver",
    },
    vuelta: Array,
    alias: String,
  },
  {
    timestamps: true,
  }
);
const driverVitae = Schema(
  {
    piloto: {
      type: mongoose.Schema.ObjectId,
      ref: "driver",
    },
    pistaCampeonato: {
      type: mongoose.Schema.ObjectId,
      ref: "track",
    },
    championship: {
      type: mongoose.Schema.ObjectId,
      ref: "championship",
    },
    posicion: Number,
    puntos: Number,
  },
  {
    timestamps: true,
  }
);
const fasLapDriver =Schema({
  piloto: {
    type: mongoose.Schema.ObjectId,
    ref: "driver",
  },
  pistaCampeonato: {
    type: mongoose.Schema.ObjectId,
    ref: "tracksChampionship",
  },
  championship: {
    type: mongoose.Schema.ObjectId,
    ref: "championship",
  },
  time: Array,
  posicion: Number
});
const driver = Schema(
  {
    nombre: String,
    alias: String,
    carpetaPiloto: String,
    carpetaCoche: String,
    victorias: Number,
    records: Array,
    vueltasRapidas: Number,
  },
  {
    timestamps: true,
  }
);
const scuderias = Schema(
  {
    piloto1: {
      type: mongoose.Schema.ObjectId,
      ref: "driver",
    },
    piloto2: {
      type: mongoose.Schema.ObjectId,
      ref: "driver",
    },
    nombreEscuderia: String,
    carpetaEscuderia: String,
    logo: String,
    victorias: Number,
    doblete: Number,
  },
  {
    timestamps: true,
  }
);
const championshipScuderia = Schema(
  {
    championship: {
      type: mongoose.Schema.ObjectId,
      ref: "championship",
    },
    escuderia: {
      type: mongoose.Schema.ObjectId,
      ref: "scuderias",
    },
    puntos: Number,
    sanciones: Number,
    doblete: Number,
    victorias: Number,
  },
  {
    timestamps: true,
  }
);
const championshipdriver = Schema(
  {
    piloto: {
      type: mongoose.Schema.ObjectId,
      ref: "driver",
    },
    championship: {
      type: mongoose.Schema.ObjectId,
      ref: "championship",
    },
    puntos: Number,
    sanciones: Number,
    advertencias: Number,
  },
  {
    timestamps: true,
  }
);
const Track = mongoose.model("track", track),
  Driver = mongoose.model("driver", driver),
  DriverVitae = mongoose.model("driverVitae", driverVitae),
  FasLapDriver = mongoose.model("fasLapDriver", fasLapDriver),
  Scuderia = mongoose.model("scuderias", scuderias),
  Championship = mongoose.model("championship", championship),
  TracksChampionship = mongoose.model("tracksChampionship", tracksChampionship),
  ScuderiasChampionship = mongoose.model(
    "scuderiasChampionship",
    scuderiasChampionship
  ),
  ChampionshipScuderia = mongoose.model(
    "championshipScuderia",
    championshipScuderia
  ),
  ChampionshipDriver = mongoose.model(
    "championshipdriver",
    championshipdriver
  );


module.exports = {
  Track,
  Driver,
  Scuderia,
  Championship,
  TracksChampionship,
  ScuderiasChampionship,
  DriverVitae,
  FasLapDriver,
  ChampionshipScuderia,
  ChampionshipDriver
};
