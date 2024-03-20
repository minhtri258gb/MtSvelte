import MtConfig from '@libs/config.js'

export default class MtTab {

  constructor() {

    // Load param URL
    this.args = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries())
      this.args[key] = value;
  }

  async apiLoad() {
    try {
      let body = { ...this.args };
      let response = await fetch(MtConfig.baseUrl+'api/dynamic/getPage', {
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
        return {}
      }

      // Return
      return result;
    }
    catch (e) {
      console.error(e)
      alert(e);
    }
  }

  async apiloadSubTab(pageType, pageId) {
    try {
      let body = { ...this.args };
      delete body.type;
      delete body.code;
      body.type = pageType;
      body.id = pageId;
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
        return {}
      }

      // Return
      return result;
    }
    catch (e) {
      console.error(e)
      alert(e);
    }
  }

}
