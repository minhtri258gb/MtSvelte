import MtConfig from '@libs/config.js';
import MtUtils from '@libs/utils.js';

var MtDynamic = {

  apiloadPage: async function(body) {
    try {
      let response = await fetch(MtConfig.baseUrl+'/api/dynamic/getPage', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Basic ' + base64.encode(username + ":" + password),
        },
        body: JSON.stringify(body),
      });
      let result = await response.json();
      if (response.status != 200) {
        alert(result.message)
        return {};
      }

      // Return
      return result;
    }
    catch (e) {
      console.error(e)
      alert(e);
    }
  },

  doActionGo: function(actionArgs, data, args) {
    let finalArgs = args;
    // Get args from data action
    actionArgs = MtUtils.fillVar(actionArgs, data); // Fill var
    let urlParams = new URLSearchParams(actionArgs);
    for (const [key, value] of urlParams.entries())
      finalArgs[key] = value;
    // Go to url
    window.location.href = '/dynamic/page/?' + (new URLSearchParams(finalArgs).toString());
  },

  doActionBack: function() {
    history.back();
  },

  doActionLink: function(url, data) {
    window.location.href = MtUtils.fillVar(action.func_data, data);
  },

};
export default MtDynamic;