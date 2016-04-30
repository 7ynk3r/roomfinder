var _ = require('underscore');
module.exports = {
  parse(s) {
    var ssplit = s.split("?");
    return {
      url : s,
      path : ssplit[0],
      params : ssplit.length < 2 ? {} : _.object(ssplit[1].split('&').map(p => p.split('=')))
    }
  }    
}