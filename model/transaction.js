const { Schema, SchemaTypes, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { TransactionsCategory } = require("../config/contants");

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      require: true,
      set: (data) => parseInt(data),
    },
    type: {
      type: String,
      enum: ["+", "-"],
      require: true,
    },
    category: {
      type: String,
      enum: TransactionsCategory,
      default: TransactionsCategory[0],
    },
    positiveCategoryBalance: {
      type: Number,
    },
    negativeCategoryBalance: {
      type: Number,
    },
    date: {
      type: String,
      require: true,
    },
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    comment: {
      type: String,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

transactionSchema.pre("save", function (next) {
  const formatedDate = new Date(this.date);
  this.date = Date.parse(formatedDate);
  this.year = formatedDate.getFullYear();
  this.month = formatedDate.getMonth() + 1;
  this.day = formatedDate.getDay();
  this.amount = parseInt(this.amount);

  next();
});

transactionSchema.plugin(mongoosePaginate);
const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
