async function postForm(url, formData) {
const data = await res.json();
rfqOut.innerHTML = `
<p><b>Buyer:</b> ${data.buyer_meta.company} (${data.buyer_meta.contact}) · <b>Currency:</b> ${data.currency}</p>
<p><b>Totals:</b> Subtotal ${data.totals.subtotal} · Tax ${data.totals.tax} · Grand ${data.totals.grand_total}</p>
<div id="rfqTable"></div>
<button id="dlQuote">Download Quote CSV</button>
<pre>${JSON.stringify(data, null, 2)}</pre>
`;
renderTable(document.getElementById('rfqTable'), data.line_items);
document.getElementById('dlQuote').onclick = () => downloadCsv('quote.csv', data.line_items);
});


// AP 3‑Way Match
const apForm = document.getElementById('apForm');
const apOut = document.getElementById('apOutput');
const apSampleBtn = document.getElementById('apSample');


apForm.addEventListener('submit', async (e) => {
e.preventDefault();
apOut.innerHTML = 'Matching…';
const fd = new FormData(apForm);
try {
const data = await postForm('/api/ap/match', fd);
apOut.innerHTML = `
<p><b>Matched PO lines:</b> ${data.matches_count}</p>
<div id="apTable"></div>
<button id="dlExc">Download Exceptions CSV</button>
<pre>${JSON.stringify(data, null, 2)}</pre>
`;
renderTable(document.getElementById('apTable'), data.exceptions);
document.getElementById('dlExc').onclick = () => downloadCsv('exceptions.csv', data.exceptions);
} catch (err) {
apOut.innerHTML = `<p style="color:#b91c1c">Error: ${err.message}</p>`;
}
});


apSampleBtn.addEventListener('click', async () => {
apOut.innerHTML = 'Loading sample…';
const res = await fetch('/api/ap/match/sample');
const data = await res.json();
apOut.innerHTML = `
<p><b>Matched PO lines:</b> ${data.matches_count}</p>
<div id="apTable"></div>
<button id="dlExc">Download Exceptions CSV</button>
<pre>${JSON.stringify(data, null, 2)}</pre>
`;
renderTable(document.getElementById('apTable'), data.exceptions);
document.getElementById('dlExc').onclick = () => downloadCsv('exceptions.csv', data.exceptions);
});
