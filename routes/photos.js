



// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
// });
//
// var cpUpload = upload.fields([{ name: 'photos', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
// app.post('/photos/more', cpUpload, function (req, res, next) {
//     // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body will contain the text fields, if there were any
// });