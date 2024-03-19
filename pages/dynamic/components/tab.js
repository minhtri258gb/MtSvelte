import config from '@libs/config.js'

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
      let response = await fetch(config.baseUrl+'api/dynamic/getTab', {
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

  onChangeTab(tab) {
    console.log(tab)
  }
  
}
