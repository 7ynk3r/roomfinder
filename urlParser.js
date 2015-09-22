var _ = require('underscore');
module.exports = {
  parse(s) {
    return {
      url : s,
      path : s.split("?")[0],
      params : _.object(s.split("?")[1].split('&').map(p => p.split('=')))
    }
  }    
}