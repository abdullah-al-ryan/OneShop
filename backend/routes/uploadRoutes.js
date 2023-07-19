import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // cb(null, 'uploads/') here cb is the callback function
    cb(null, '/uploads');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  // test() method executes a search for a match between a regular expression and a specified string. Returns true or false.
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // The path.extname() method returns the extension of the path, from the last occurrence of the . (period) character to end of string in the last portion of the path. If there is no . in the last portion of the path, or if the first character of the basename of path (see path.basename()) is ., then an empty string is returned.
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
});

// here image is the name of the field in the form data
router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    // req.file is the `image` file
    image: `/${req.file.path}`,
  });
});

export default router;
