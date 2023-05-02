import mongoose from 'mongoose';
import NotaModal from "../models/nota.js"

export const createNota = async(req, res) => {
        const tanggal = new Date().toISOString()
        const nota = req.body;
        const newNota = new NotaModal({
                    ...nota,
                    // createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    noNota: nota.createdAt !== undefined ? `${("00" + (await NotaModal.countDocuments({
        createdAt: {
          $gte: `${nota.createdAt.slice(0,4)}-01-01T00:00:00.000Z`,
          $lt: `${nota.createdAt.slice(0,4)}-12-31T23:59:00.000Z`
        }}) + 1)).slice(-3)}/${nota.createdAt.slice(5,7)}/DDS/${nota.createdAt.slice(0,4)}` 
        : 
        `${("00" + (await NotaModal.countDocuments({
          createdAt: {
            $gte: `${tanggal.slice(0,4)}-01-01T00:00:00.000Z`,
            $lt: `${tanggal.slice(0,4)}-12-31T23:59:00.000Z`
          }}) + 1)).slice(-3)}/${tanggal.slice(5,7)}/DDS/${tanggal.slice(0,4)}`,
      hasilNominal: parseInt(nota.nominal.slice(2).replaceAll(".",""))
    });
  
    try {
      await newNota.save();
      res.status(201).json(newNota);
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
};

export const getNotas = async (req, res) => {
    const { page } = req.query;
    try {
      // const notas = await NotaModal.find()//.sort({createdAt: -1}).limit(10);
      // res.status(200).json(notas);
  
      const limit = 10;
      const startIndex = (Number(page) - 1) * limit;
      const total = await NotaModal.countDocuments({});
      const notas = await NotaModal.find().sort({updatedAt: -1}).limit(limit).skip(startIndex);
      res.json({
        data: notas,
        currentPage: Number(page),
        totalNotas: total,
        numberOfPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
};

export const getNota = async (req, res) => {
  const { id } = req.params;
  try {
    const nota = await NotaModal.findById(id);
    res.status(200).json(nota);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateNota = async (req, res) => {
  const { id } = req.params;
  const { kepada, caraBayar, namaBank, cabang, noRek, atasNama, nominal, untuk, kategoriBiaya, namaFile, status, noInvoice, diapproveOleh, dibayarOleh } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No nota exist with id: ${id}` });
    }

    const updatedNota = {
      kepada, caraBayar, namaBank, cabang, noRek, atasNama, nominal, untuk, kategoriBiaya, namaFile, status, noInvoice, diapproveOleh, dibayarOleh,
      updatedAt: new Date().toISOString(),
      hasilNominal: parseInt(nominal.slice(2).replaceAll(".","")),
      _id: id,
    };
    await NotaModal.findByIdAndUpdate(id, updatedNota, { new: true });
    res.json(updatedNota);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteNota = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No nota exist with id: ${id}` });
    }
    await NotaModal.findByIdAndRemove(id);
    res.json({ message: "Nota pembayaran deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getNotasBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    let searchingby = new RegExp(searchQuery, "i");
    NotaModal.find({untuk:{$regex:searchingby}})
    .select("_id kepada caraBayar namaBank cabang noRek atasNama nominal untuk kategoriBiaya namaFile name status noInvoice createdAt")
    .then(NotaModal => {
      res.json(NotaModal);
    })
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getNotasByDate = async (req, res) => {
  let { startDate, endDate } = req.query;
  try {
    NotaModal.find({
      createdAt: {
        $gte: new Date(new Date(startDate).setHours(1)),
        $lt: new Date(new Date(endDate).setHours(23))
      }
    }).sort({ updatedAt: 'asc'})
    .then(NotaModal => {
      res.json(NotaModal)
    })
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
}

export const getNotasByStatus = async (req, res) => {
  const { statusQuery } = req.query;
  try {
    let theStatusQuery = new RegExp(statusQuery, "i");
    NotaModal.find({status:{$regex:theStatusQuery}})
    .select("_id kepada caraBayar namaBank cabang noRek atasNama nominal untuk kategoriBiaya namaFile name status noInvoice createdAt")
    .then(NotaModal => {
      res.json(NotaModal);
    })
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getNotasByAllFilter = async (req, res) => {
  let { startDate, endDate, statusQuery, searchQuery } = req.query;
  try {
    let searchingby = new RegExp(searchQuery, "i");
    let theStatusQuery = new RegExp(statusQuery, "i");
    NotaModal.find({
      createdAt: {
        $gte: new Date(new Date(startDate).setHours(1)),
        $lt: new Date(new Date(endDate).setHours(23))
      }, status: {
        $regex: theStatusQuery
      }, untuk: {
        $regex: searchingby
      }
    }).sort({ updatedAt: 'asc'})
    .then(NotaModal => {
      res.json(NotaModal)
    })
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
}
