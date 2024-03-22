const {Files} = require('../models/Files');
const mongoose = require('mongoose');
const filesController = async (req, res) => {
    // console.log('req file',req.file);
    try {
    //   const newFile = new File({
    //     name: req.file.originalname,
    //     data: req.file.buffer,
    //     contentType: req.file.mimetype,
    //   });
  
    //   await newFile.save();
    const newFile = await Files.create({
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype
    })
      res.status(201).json({ message: 'File uploaded successfully!',data:newFile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const multipleFilesController = async (req,res)=>{
  try {
    const files = req.files.map(async (file) => {
      const newFile = await Files.create({
        name: file.originalname,
        data: file.buffer,
        contentType: file.mimetype,
      });

      return newFile;
    });

    const uploadedFiles = await Promise.all(files);
    res.status(201).json({ message: 'Files uploaded successfully!', data: uploadedFiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
// const filesGetController = async(req,res)=>{
//     try {
//         const file = await Files.find({});
//         // const file = await Files.findById(req.params.id);

//         if (!file) {
//           return res.status(404).json({ message: 'File not found' });
//         }
    
//         // res.set('Content-Type', file.contentType);
//         // res.send(file.data);
//         return res.json({data:file.data});
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//       }
// }
// const filesGetController = async (req, res) => {
//     try {
//         const files = await Files.find({});

//         if (!files || files.length === 0) {
//             return res.status(404).json({ message: 'Files not found' });
//         }
        
//         const responseData = files.map(file => ({ data: file.data }));
//         res.set('Content-Type', file.contentType);
//         res.send(file.data);
//         // return res.json(responseData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
const filesGetController = async (req, res) => {
    try {
        const files = await Files.find({});

        if (!files || files.length === 0) {
            return res.status(404).json({ message: 'Files not found' });
        }
        
        const responseData = files.map(file => ({ data: file.data }));
        //res.set('Content-Type', files[0].contentType); // Assuming contentType is the same for all files
        res.send(files);
        // res.send(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// const filesGetIdController = async  (req, res) => {
//     try {
//       const file = await Files.findById(req.params.id);
  
//       if (!file) {
//         return res.status(404).json({ message: 'Image not found' });
//       }
  
//       res.set('Content-Type', file.contentType);
//       res.send(file.data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }

// const filesGetIdController = async (req, res) => {
//   try {
//     const fileId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(fileId)) {
//       return res.status(400).json({ message: 'Invalid file ID' });
//     }

//     const file = await Files.findById(fileId);

//     if (!file) {
//       return res.status(404).json({ message: 'Image not found' });
//     }

//     res.set('Content-Type', file.contentType);
//     res.send(file.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


const filesGetIdController = async (req, res) => {
  try {
    const fileId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }

    const file = await Files.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const responseData = {
      fileId: file._id,
      fileName: file.name,
      contentType: file.contentType,
      data: file.data.toString('base64'), // assuming 'data' is a Buffer
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid file ID' });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getMultipleFilesController = async (req,res)=>{
    const data = req.params.id;
    const dataArr = data.split('id').filter(Boolean);
    if(!data) return res.status(400).json({message:'params are required!'});
    const multipleFiles = await Files.find({_id:{$in:dataArr}});
    const multipleData = multipleFiles.map((e)=>{
      const responseData = {
        fileId: e._id,
        fileName: e.name,
        contentType: e.contentType,
        data: e.data.toString('base64'), // assuming 'data' is a Buffer
      };
      return responseData
    })
    return res.status(200).json({message:'requested files',data:multipleData});
}
module.exports = {getMultipleFilesController,filesController,multipleFilesController,filesGetController,filesGetIdController};