/*jshint node:true*/
'use strict';

/**
 * Replaces characters in strings that are illegal/unsafe for filenames.
 * Unsafe characters are either removed or replaced by a substitute set
 * in the optional `options` object.
 *
 * Illegal Characters on Various Operating Systems
 * / ? < > \ : * | "
 * https://kb.acronis.com/content/39790
 *
 * Unicode Control codes
 * C0 0x00-0x1f & C1 (0x80-0x9f)
 * http://en.wikipedia.org/wiki/C0_and_C1_control_codes
 *
 * Reserved filenames on Unix-based systems (".", "..")
 * Reserved filenames in Windows ("CON", "PRN", "AUX", "NUL", "COM1",
 * "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9", 
 * "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", and
 * "LPT9") case-insesitively and with or without filename extensions.
 *
 * @param  {String} input   Original filename
 * @param  {Object} options {replacement: String}
 * @return {String}         Sanitized filename
 */

var illegalRe = /[\/\?<>\\:\*\|":]/g;
var controlRe = /[\x00-\x1f\x80-\x9f]/g;
var reservedRe = /^\.+$/;
var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;

function sanitize(input, replacement) {
  return input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement);
}

module.exports = function (input, options) {
  var replacement = (options && options.replacement) || '',
      output = sanitize(input, replacement);
  if (replacement === '') {
    return output;
  }
  return sanitize(output, '');
};
