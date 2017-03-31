/**
 * Created by ericdufresne on 2017-03-20.
 */

exports.selectIn = function (schema, tableName, ids) {
  var params = [];
  var query = 'SELECT * FROM "'+schema+'".'+tableName+' WHERE ID IN (';
  count = 1;
  for (var i in ids){
    if (ids.hasOwnProperty(i)){
      var id = ids[i];
      if (!Number.isInteger(id)){
        return null;
      }
      params.push(id);
      query = query+'$'+count;
      if (count < ids.length){
        query = query+','
      }
      count++;
    }
  }
  query = query+')';
  return {
    query: query,
    params: params
  }
};

exports.update = function (schema, tableName, obj, id) {
    var keyString = '';
    var params = [];
    var query = 'UPDATE "'+schema+'".'+tableName+' SET ';
    var count = 1;
    var length = Object.keys(obj).length;
    for (var key in obj){
        if (obj.hasOwnProperty(key)){
            keyString = keyString + key+" = $"+count;
            count++;
            params.push(obj[key]);
            if (count <= length){
                keyString = keyString+', ';
            }
        }
    }
    query = query+keyString+" WHERE ID = $"+count;
    params.push(id);
    return {
        query: query,
        params: params
    }
};

exports.tuples = function (schema, tableName, objs, keySet) {
  var tupleString = '';
  var params = [];
  var itemCount = 1;
  for (var i in objs){
    if(objs.hasOwnProperty(i)){
      var obj = objs[i];
      var startVal = 1+keySet.length*(itemCount-1);
      var result = exports.tuple(obj, startVal, keySet);
      var tuple = result.tuple;
      var p = result.params;
      params = params.concat(p);
      tupleString = tupleString+tuple;
      itemCount++;
      if (itemCount <= objs.length){
        tupleString = tupleString+',';
      }
    }
  }
  i = 0;
  var keyString = '(';
  var keyCount = 1;
  for (i in keySet){
    if (keySet.hasOwnProperty(i)){
      keyString = keyString + keySet[i];
      keyCount++;
      if (keyCount <= keySet.length){
        keyString = keyString+', ';
      }
    }
  }
  keyString = keyString+' )';
  var query = 'INSERT INTO "'+schema+'".'+tableName+' '+keyString+' VALUES '+tupleString;
  return {
    query: query,
    params: params
  };
};
exports.tuple = function(obj, start, keySet) {
  var tuple = '(';
  count = 1;
  var params = [];
  for (var i in keySet){
    if (keySet.hasOwnProperty(i)){
      var key = keySet[i];
      var val = obj[key];
      params.push(val);
      tuple = tuple+' $'+start;
      start++;
      count++;
      if(count <= keySet.length){
        tuple = tuple+', ';
      }
    }
  }
  tuple = tuple+')';
  return {
    tuple: tuple,
    params: params
  }
};

exports.insert = function (schema, tableName, obj) {
    var keyString = '(';
    var valueString = '(';
    var params = [];
    var query = 'INSERT INTO "'+schema+'".'+tableName+" ";
    var count = 1;
    var length = Object.keys(obj).length;
    for (var key in obj){
        if (obj.hasOwnProperty(key)){
            keyString = keyString + key;
            valueString = valueString + "$"+count;
            count++;
            params.push(obj[key]);
            if (count <= length){
                keyString = keyString+', ';
                valueString = valueString+', ';
            }
        }
    }
    keyString = keyString+')';
    valueString = valueString+')';
    query = query + keyString +' VALUES '+valueString;
    return {
        query: query,
        params: params
    }
};
