const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const seeder = require("mongoose-seeder");
const { Posts } = require("./models/models.js");
const { Users } = require("./models/models.js");
const url = "mongodb://127.0.0.1:27017";
const { v4: uuidv4 } = require("uuid");

const usersData = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    pwd: "P@ssw0rd123",
    id: uuidv4(),
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    pwd: "S3cr3tP@ss",
    id: uuidv4(),
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    pwd: "MySecur3Pwd",
    id: uuidv4(),
  },
  {
    name: "David Clark",
    email: "david@example.com",
    pwd: "P@ssw0rd456",
    id: uuidv4(),
  },
  {
    name: "Eva Davis",
    email: "eva@example.com",
    pwd: "Str0ngP@ssword",
    id: uuidv4(),
  },
  {
    name: "Frank White",
    email: "frank@example.com",
    pwd: "L3tM3InN0w!",
    id: uuidv4(),
  },
  {
    name: "Grace Martinez",
    email: "grace@example.com",
    pwd: "H3ll0@123",
    id: uuidv4(),
  },
  {
    name: "Henry Lee",
    email: "henry@example.com",
    pwd: "P@ss!23456",
    id: uuidv4(),
  },
  {
    name: "Ivy Turner",
    email: "ivy@example.com",
    pwd: "QwertyP@ss",
    id: uuidv4(),
  },
  {
    name: "Jack Harris",
    email: "jack@example.com",
    pwd: "J@ckP@ssw0rd",
    id: uuidv4(),
  },
];

const connecting = async () => {
  await mongoose.connect(url, { dbName: "PR_db" });
};

module.exports = { connecting };
