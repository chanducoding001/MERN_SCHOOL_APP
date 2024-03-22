const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String,
});

const Files = mongoose.model('file',fileSchema);

module.exports = {Files};