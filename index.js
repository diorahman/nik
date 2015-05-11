var levenshtein = require('fast-levenshtein');
var request = require('hyperquest');
var cheerio = require('cheerio');
var config = require('./config');

function parse(html) {
  var $ = cheerio.load(html);
  var labels = $('.label');
  var fields = $('.field');
  if (!labels.length)
    return false;
  var obj = {};
  fields.each(function(i, el){
    var label = $(labels[i]).text();
    label = label.substring(0, label.length - 1);
    obj[label] = $(el).text();
  });
  return obj;
}

module.exports = function (params, cb) {
  var nik = params.nik || '';
  if (!nik)
    cb(new Error('Invalid NIK'));
  var name = params.name || '';
  name = name.toLowerCase();
  var r = request.get(config.url + params.nik);
  var html = '';
  r.on('data', function(chunk){
    html += chunk;
  });
  r.on('end', function(){
    var obj = parse(html);
    if (!obj)
      return cb(new Error('Not found'));
    if (!name)    
      return cb(null, obj);
    if (!obj.Nama)
      return cb(new Error('Invalid'));
    levenshtein.getAsync(obj.Nama.toLowerCase(), name, function(err, distance){
      if (err)
        return cb(err);
      cb(null, obj, distance);
    });
  });
}
