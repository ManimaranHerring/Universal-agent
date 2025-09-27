const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { parseCsvFromBuffer } = require('../lib/utils');


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });


const catalogPath = path.join(__dirname, '..', 'data', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));


function specCostFactor(spec = '') {
const s = spec.toLowerCase();
let factor = 1.0;
if (s.includes('ss304')) factor *= 1.15;
if (s.includes('copper')) factor *= 1.12;
if (s.includes('abs')) factor *= 0.95;
return factor;
}


function volumeDiscount(qty) {
if (qty >= 20000) return 0.88;
if (qty >= 10000) return 0.92;
if (qty >= 5000) return 0.96;
return 1.0;
}


function round2(n) { return Math.round(n * 100) / 100; }


function buildQuote(lines, opts) {
const margin = Number(opts.margin_target || 0.18);
const currency = opts.currency || 'USD';
const out = [];
let subtotal = 0;


for (const row of lines) {
const sku = String(row.sku || '').trim();
const qty = Number(row.quantity || row.qty || 0);
const spec = row.spec || '';
if (!sku || !qty) continue;


const cat = catalog[sku];
const base = (cat && cat.base_cost) || 1.0;
const unitCost = base * specCostFactor(spec) * volumeDiscount(qty);
const unitPrice = unitCost / (1 - margin);
const lineTotal = unitPrice * qty;
subtotal += lineTotal;


out.push({
sku,
description: (cat && cat.name) || 'Generic Item',
qty,
unit_cost: round2(unitCost),
unit_price: round2(unitPrice),
line_total: round2(lineTotal),
spec: spec || '',
assumptions: [
module.exports = router;
