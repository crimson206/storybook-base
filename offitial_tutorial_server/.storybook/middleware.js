const express = require('express');
//  const fs = require('fs');
const path = require('path');
const getTypeString = require('./typecheck')

const SomeFunction = ({arg}) => {
    return {some: `Json with ${arg}`}
}

module.exports = function(router) {

    router.use(express.json());
    router.post('/some_function', (req, res) => {
        const { arg } = req.body;
        const json = SomeFunction({arg})
        res.json(json);
    });
}
