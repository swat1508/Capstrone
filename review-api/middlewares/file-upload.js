const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file && (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({// fileUploader
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter

});

