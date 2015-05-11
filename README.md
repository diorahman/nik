## NIK Checker

[![Build Status](https://travis-ci.org/diorahman/nik.svg?branch=master)](https://travis-ci.org/diorahman/nik)

Indonesian NIK checker. It currently uses the service hosted on https://data.kpu.go.id/ss8.php

```js
var nik = require('nik-check');
nik({
  nik: '',
  name: ''
}, function(err, obj, distance){

});
```

### Test

To pass all tests you need to specify the truthy test data inside the `config.js`.

After that:

```
$ npm test
```

### License

MIT

