const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { parseCsvFromBuffer } = require('../lib/utils');


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });


const QTY_TOL = 0.005; // 0.5%
const PRICE_TOL = 0.01; // 1%


function key(po, line) { return `${po}|${line}`; }


function near(a, b, tol) {
if (a === undefined || b === undefined) return false;
const denom = Math.max(1, Math.abs(a));
return Math.abs(a - b) / denom <= tol;
}


function match(poRows, grnRows, invRows) {
const poMap = new Map();
const grnMap = new Map();
const invMap = new Map();


for (const r of poRows) poMap.set(key(r.po_number, r.line_id), r);
for (const r of grnRows) grnMap.set(key(r.po_number, r.line_id), r);
for (const r of invRows) invMap.set(key(r.po_number, r.line_id), r);


const exceptions = [];
let matches = 0;


// Evaluate PO lines
for (const [k, po] of poMap.entries()) {
const grn = grnMap.get(k);
const inv = invMap.get(k);
module.exports = router;
