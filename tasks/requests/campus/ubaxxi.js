const {
	refreshTimeMax,
	refreshTimeMin,
} = require('../../../config/settings.json');
const https = require('../../../functions/https');
const embeds = require('../../../functions/embeds-alerts');
const randBetween = require('../../../functions/randBetween');
var refreshTime = randBetween(refreshTimeMin, refreshTimeMax);
var lastRequestError = false;

const site = 'www.ubaxxicampusvirtual.uba.ar';

setInterval(async () => {
	const reqTime = Date.now();
	const res = await https(site);

	if ((res.err && lastRequestError) || (!res.err && !lastRequestError))
		return;

	if (res.err) {
		embeds(true, site, res, reqTime); // Se cayó la página. (enviar anuncio)
		lastRequestError = true;
		return;
	}

	if (lastRequestError) {
		embeds(false, site, res, reqTime); // La página volvió a estar en línea. (enviar anuncio)
		return;
	}
}, refreshTime * 1000);
