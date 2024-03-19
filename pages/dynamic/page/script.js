import config from '@libs/config.js';

export default class Mt {

  constructor() {

    // Add Config
    this.config = config;

    // params on URL
    this.args = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries())
      this.args[key] = value;
  }

  async loadPage() {
    try {

      let result = {};

      // Call API Load menu
      let body = { ...this.args };
      let response = await fetch(config.baseUrl+'/api/dynamic/getPage', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Basic ' + base64.encode(username + ":" + password),
        },
        body: JSON.stringify(body),
      });
      let res = await response.json();
      if (response.status != 200) {
        alert(res.message)
      } else result = Object.assign(result, res);

      return result;
    }
    catch (e) {
      console.error(e.message)
      alert(e);
      return {};
    }
  }

  onButtonPress(action, record) {

    if (action.func_type == 'LINK') {
      let isBackAction = (action.code == 'BACK'); // Special
      let url = action.func_data;
      if (isBackAction && url == null) {
        history.back()
        return
      }

      // Lấy các biến của "row" thay thế cho "func_data"
      while(true) {
        let posb = url.indexOf('{');
        if (posb == -1) // ko tìm thấy biến nào nữa
          break;
        let pose = url.indexOf('}');
        if (pose == -1)
          { console.error("Cấu hình lỗi: Dấu { và } ko cùng số lượng:", action.func_data); return; }
        let varName = url.substring(posb+1, pose);
        if (varName.length == 0)
          { console.error("Cấu hình lỗi: Ko có tên biến giữa { và } :", action.func_data); return; }
        if (record[varName] == null)
          { console.error("Cấu hình lỗi: Tên biến ko tồn tại:", varName); return; }
        url = url.replace("{"+varName+"}", record[varName]);
      }

      // Bổ sung url params
      if (!isBackAction) { // Nút back ko lấy biến url
        let args = this.args;
        let urlSplit = url.split('?')
        if (urlSplit.length > 0) {
          const urlParams = new URLSearchParams(urlSplit[1]);
          for (const [key, value] of urlParams.entries())
            args[key] = value;
        }
        url = urlSplit[0] + '?' + (new URLSearchParams(args).toString());
      }

      // Go to url
      window.location.href = '/dynamic/' + url;
    }
    else {
      console.log("Action: func_type invail:", action.func_type);
    }
  }

}