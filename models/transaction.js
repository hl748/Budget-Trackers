const mongoose = require("mongoose");

var SchemaDefined = mongoose.Schema;

var SchemaObject = new SchemaDefined ({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for "
  },
  value: {
    type: Number,
    required: "Enter an amount"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const newSchema = mongoose.model("", SchemaObject);

module.exports = newSchema;
