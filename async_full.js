function checker(elm, type) {  if (elm != undefined) {    if (type == 'src') {     return elm.getAttribute('src');    }	if (type == 'click') {     elm.click();    }	if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim().replace(/,/g, '');    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}

var reg = (elm, n) => elm != null ? elm[n] : '';

var cn = (ob, nm) => ob.getElementsByClassName(nm);

var tn = (ob, nm) => ob.getElementsByTagName(nm);

var gi = (ob, nm) => ob.getElementById(nm);

var delay = (ms) => new Promise(res => setTimeout(res, ms));

var xComma = (str) => str.replace(/,/g, ';')

var pages = parseInt(checker(tn(cn(document, 'pagination')[0], 'a')[tn(cn(document, 'pagination')[0], 'a').length - 2], 'text'));

var containArr = [];
var contactArr = [];

async function getCompanyIds(p, type){
	var res = await fetch("https://www.thalamus.co/"+type+"?page=" + (p + 1), {
        "credentials": "include",
        "headers": {
          "accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
          "accept-language": "en-US,en;q=0.9",
          "x-csrf-token": "zwgDu/HrFaodOcW9JvhBAMvOOSGdYFp7GwKwipE+0uTQ6lKoVKDyzCmspcI9KP9eu95AX8nU1Sd3ABJvtm1C5g==",
          "x-requested-with": "XMLHttpRequest"
        },
        "referrer": "https://www.thalamus.co/ad_partners",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": null,
        "method": "GET",
        "mode": "cors"
      });
	var text = await res.text();
	var regXgroups = /(?<=ad_partner_)(.+?)\\'.+?href=\\'\/ad_partners\/(.+?)\\.+?item__title\\'>\\n(.+?)\\n/;
	var ids = text.match( /ad_partner_.+?\\'.+?href=\\'\/ad_partners\/.+?\\.+?item__title\\'>\\n.+?\\n/g);
	ids.forEach(itm => {
		var rx = regXgroups.exec(itm);
		var inArr = containArr.some(elm=> elm == rx[1]);
		if(inArr){
			console.log(rx[2] + ' already in array'); 
        } else {
			containArr.push([rx[1], rx[2], rx[3]]);
			await delay(481 + Math.round(Math.random() * 100));
			getContactsByCoId([rx[1], rx[2], rx[3]]);
        }
	});
}

async function looper(str){
	for(i=0; i<pages; i++){
		await delay(13781 + Math.round(Math.random() * 100));
		getCompanyIds(i,str);
		console.log(i);
    }
}

looper('ad_partners');


async function getContactsByCoId(arr){
	var id = arr[0];
	var res = await fetch("https://www.thalamus.co/contacts?type=1&type_id="+id, {"credentials":"include","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8","accept-language":"en-US,en;q=0.9","cache-control":"max-age=0","if-none-match":"W/\"2a2007269f957d6978bced59cd0827e9\"","upgrade-insecure-requests":"1"},"referrerPolicy":"no-referrer-when-downgrade","body":null,"method":"GET","mode":"cors"});
	var dat = await res.json();
	for(i = 0; i < dat.length; i++){
		var csv = [dat[i].id, xComma(dat[i].name), xComma(dat[i].title), xComma(arr[2]), xComma(dat[i].number), xComma(dat[i].email), xComma(dat[i].location), xComma(dat[i].linkedin), xComma(dat[i].skype), dat[i].account_id, dat[i].parent_id, dat[i].contact_type, dat[i].contact_type_id, dat[i].is_hidden, dat[i].created_at, dat[i].updated_at, dat[i].resolved, dat[i].submitter_id, 'https://www.thalamus.co/ad_partners/'+arr[1]];
		contactArr.push(csv);
	}
}
// getContactsByCoId(["ea4312b600fb9fcf74240dbe18526f4e2bdc1e17", "simpli-fi", "Simpli.fi"])