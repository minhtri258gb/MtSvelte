import config from '@libs/config.js';

export default class MtList {
  
  constructor() {

    // Add Config
    this.config = config;

    // Load param URL
    this.args = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries())
      this.args[key] = value;
  }

  async loadPage(code) {
    let body = { ...this.args };
    body.code = code;
    let response = await fetch(config.baseUrl+'api/dynamic/getList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Basic ' + base64.encode(username + ":" + password),
      },
      body: JSON.stringify(body),
    });
    let result = await response.json();
    if (response.status != 200)
      throw result;

    let actions = result.actions;
    delete result.actions;

    // Preprocess actions
    let actionTop = [];
    let actionInline = [];
    for (let i in actions) {
      let action = actions[i];
      if (action.type == 1)
        actionTop.push(action);
      else if (action.type == 2)
        actionInline.push(action);
    }
    result.actionTop = actionTop;
    result.actionInline = actionInline;

    // Preprocess headers
    if (result.headers.length == 0) // Cảnh báo cấu hình lỗi
      alert("Thiếu cấu hình cột");
    else {
      result.headers.unshift({ key: "stt", value: "STT" });
      if (actionInline.length > 0) // Nếu có actionInline thì thêm cột
        result.headers.push({ key: "overflow", empty: true });
    }

    // Preprocess rows
    for (let i in result.rows)
      result.rows[i].stt = +i+1;

    // Return
    return result;
  }

  onAction(action, record) {

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