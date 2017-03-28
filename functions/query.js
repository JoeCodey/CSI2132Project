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
