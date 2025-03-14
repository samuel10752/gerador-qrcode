const path = require('path');
const express = require('express');

module.exports = {
  devServer: {
    before: (app) => {
      app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    },
  },
};
