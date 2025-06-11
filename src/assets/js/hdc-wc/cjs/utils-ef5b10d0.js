'use strict';

function format(first, middle, last) {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}
/**
 * Gets present value
 * @param evento KeyboardEvent
 * @returns string
 */
function getPresentValue(evento) {
  const input = evento.target;
  const valor = input.value;
  const posicionCursor = input.selectionStart;
  const valorActualizado = valor.substring(0, posicionCursor) + evento.key + valor.substring(posicionCursor);
  return valorActualizado;
}
/**
 * Removes double spaces
 * @param input string
 * @returns string
 */
function removeDoubleSpaces(value) {
  return value.replace(/\s{2,}/g, ' ');
}
function getValueByPath(data, parts) {
  if (parts.length === 1) {
    return data[parts[0]];
  }
  const key = parts[0];
  const nextObj = data[key];
  if (nextObj) {
    return getValueByPath(nextObj, parts.slice(1));
  }
  return '';
}

exports.format = format;
exports.getPresentValue = getPresentValue;
exports.getValueByPath = getValueByPath;
exports.removeDoubleSpaces = removeDoubleSpaces;

//# sourceMappingURL=utils-ef5b10d0.js.map
