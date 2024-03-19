import MtUtils from '../../libs/utils.js';

var MtDynamic = {

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