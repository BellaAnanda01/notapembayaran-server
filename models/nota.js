import mongoose from "mongoose";

const notaSchema = mongoose.Schema({
  noNota: {
    type: String,
    default: ""
  },
  kepada: {
    type: String,
    default: ""
  },
  caraBayar: {
    type: String,
    default: "Transfer"
  },
  namaBank: {
    type: String,
    default: ""
  },
  cabang: {
    type: String,
    default: ""
  },
  noRek: {
    type: String,
    default: ""
  },
  atasNama: {
    type: String,
    default: ""
  },
  nominal: {
    type: String,
    default: ""
  },
  hasilNominal: {
    type: Number,
    default: ""
  },
  untuk: {
    type: String,
    default: ""
  },
  namaFile: {
    type: String,
    default: ""
  },
  noInvoice: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: "aaa"
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  dibuatOleh: {
    type: String,
    default: "",
  },
  diapproveOleh: {
    type: String,
    default: "",
  },
  dibayarOleh: {
    type: String,
    default: "",
  }
});

const NotaModal = mongoose.model("Nota", notaSchema);

export default NotaModal;
