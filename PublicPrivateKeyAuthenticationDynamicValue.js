(function() {
  var cryptojs = require('node_modules/crypto-js/crypto-js.js');

  function encodeUTF8(s) {
    return unescape(encodeURIComponent(s));
  }

  /**
   * not used, here for reference.
   */
  function decodeUTF8(s) {
    return decodeURIComponent(escape(s));
  }

  var PublicPrivateKeyAuthentication = function() {
    this.evaluate = function(context) {
      var request = context.getCurrentRequest();
      var contentType = request.getHeaderByName('Content-Type');
      var date = request.getHeaderByName('Date');

      var stringToSign = request.method + '\n' +
        (request.body ? CryptoJS.MD5(request.body) : '') + '\n' +
        (contentType || '') + '\n' +
        date;

      var signature = CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA1(
          encodeUTF8(stringToSign),
          this.privateKey
      ));

      console.log(signature);

      return this.scheme + ' ' + this.publicKey + ':' + signature;
    };

    this.title = function() {
      return 'Public/Private Auth';
    };

    this.text = function() {
    };

    return this;
  };

  PublicPrivateKeyAuthentication.identifier = 'mitchell.hatter.gmail.com.PawExtensions.PublicPrivateKeyAuthenticationDynamicValue';
  PublicPrivateKeyAuthentication.title = 'Public/Private Key Authentication';
  PublicPrivateKeyAuthentication.inputs = [
    DynamicValueInput('scheme', 'Scheme', 'String'),
    DynamicValueInput('publicKey', 'Public Key', 'String'),
    DynamicValueInput('privateKey', 'Private Key', 'String'),
  ];

  registerDynamicValueClass(PublicPrivateKeyAuthentication);
}).call(this);
