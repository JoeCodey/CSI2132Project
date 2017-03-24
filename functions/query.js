/**
 * Created by ericdufresne on 2017-03-20.
 */
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