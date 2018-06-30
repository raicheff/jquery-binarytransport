/**
 * jQuery BinaryTransport
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0
 */

(function($) {

  "use strict";

  /*
   * http://www.henryalgus.com/reading-binary-files-using-jquery-ajax/
   * https://github.com/henrya/js-jquery/tree/master/BinaryTransport
   */

  // Use this transport for "binary" data type
  $.ajaxTransport("+binary", function(options, originalOptions, jqXHR) {

    // Check for conditions and support for blob/arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType === "binary")) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob))))) {

      return {

        // Create new XMLHttpRequest
        send: function(headers, callback) {

          // Setup all variables
          var xhr = new XMLHttpRequest(),
            url = options.url,
            type = options.type,
            async = options.async || true,
            // blob or arraybuffer. Default is blob
            dataType = options.responseType || "blob",
            data = options.data || null,
            username = options.username || null,
            password = options.password || null;

          xhr.addEventListener("load", function() {
            var data = {};
            data[options.dataType] = xhr.response;
            // Make callback and send data
            callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
          });

          xhr.open(type, url, async, username, password);

          // Setup custom headers
          for (var i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }

          xhr.responseType = dataType;

          xhr.send(data);

        },

        abort: $.noop

      };

    }

  });

})(window.jQuery);
