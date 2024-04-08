module.exports = {
  typescript: join(__dirname, '../../typescript'),
  src: join(__dirname, '../../src'),
  current: join(__dirname + '/../../current'),
};
function join(/* path segments */) {
  var parts = [];
  for (var i = 0, l = arguments.length; i < l; i++) {
    var arg = arguments[i].split('\\').join('/');
    parts = parts.concat(arg.split('/'));
  }
  var newParts = [];
  for (i = 0, l = parts.length; i < l; i++) {
    var part = parts[i];
    if (!part || part === '.') continue;
    if (part === '..') newParts.pop();
    else newParts.push(part);
  }
  if (parts[0] === '') newParts.unshift('');
  return newParts.join('\\') || (newParts.length ? '\\' : '.');
}
