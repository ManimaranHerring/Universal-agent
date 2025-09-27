const express = require('express');
const path = require('path');
const rfqRoutes = require('./routes/rfq');
const apMatchRoutes = require('./routes/apmatch');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));


// Serve static UI & sample files
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/samples', express.static(path.join(__dirname, '..', 'samples')));


// Health check
app.get('/api/ping', (req, res) => res.json({ ok: true }));


// Feature routes
app.use('/api/rfq', rfqRoutes);
app.use('/api/ap', apMatchRoutes);


app.listen(PORT, () => {
console.log(`\nUniversal Agent Starter running → http://localhost:${PORT}`);
});
