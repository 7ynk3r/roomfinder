// For testing
export default (json, msg='') => {
  const type = typeof(json);
  const isFunction = type === 'function';
  const isUndefined = json === undefined;
  const string 
    = isFunction ? (json+'').replace(/\s/g, "")
    : isUndefined ? (json+'').toUpperCase()
    : JSON.stringify(json);
  console.log(`${msg} [ ${type} ] : ${ string } \n`);
}
