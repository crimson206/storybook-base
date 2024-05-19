const express = require('express');
const fs = require('fs');
const path = require('path');


module.exports = function(router) {
    router.use(express.json());
    router.post('/write-file', (req, res) => {
        const { code, filePath } = req.body;
        if (typeof code !== 'string') {
            return res.status(400).json({ error: 'Invalid input type' });
        }

        const fullPath = path.join(process.cwd(), filePath);

        // Write the TypeScript code to a file
        fs.writeFile(fullPath, code, err => {
            if (err) {
                console.error('Failed to write file:', err);
                return res.status(500).json({ error: 'Failed to write TS file', details: err.message });
            }
            
            // Send a successful response
            res.json({ message: 'File written successfully', filename: fullPath });
        });
    });
}
