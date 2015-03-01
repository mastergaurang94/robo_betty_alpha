'use strict';

var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var nodemailer = require("nodemailer");

exports.template = {};

// create reusable transporter object from company email
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'testcse112@gmail.com',
        pass: 'robo_betty'
    }
});

/*
exports.template.sendEmail = function(req, res) {
  console.log("Sending email.");

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({message: "Error occurred sending email"});
    }else{
        res.json({message : "Email was sent." });
    }
  });
}; */


// sendEmail: Send email to employees when patient is checked in.

exports.sendEmail = function(employees) {
  // iterate through all employees
  for (var index = 0; index < employees.length; index++) {
    // create the email object that will be sent
    var mailOptions = {
      from: "Robo Betty <testcse112@gmail.com>", // sender address
      to: employees[index].email, // list of receivers
      subject: "Patient is ready", // Subject line
      text: "Your patient is here.", // plaintext body
      html: "<b>Your patient is here.</b>" // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
        console.log("Error occurred sending email");
        //res.json({message: "Error occurred sending email"});
      }else{
        console.log("Email was sent.");
        //res.json({message : "Email was sent." });
      }
    });
  }
}