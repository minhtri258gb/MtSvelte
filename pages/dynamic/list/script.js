import config from '@libs/config.js'
var mt = {
  args: {}, // params on URL

  init: function() {
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries())
      this.args[key] = value;
  },
  apiDynamicList: async function() {
    let body = { ...this.args };
    let response = await fetch(config.baseUrl+'api/dynamic/list', {
      method:'POST',
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
  },
  onButtonPress: function(action, record) {

    if (action.func_type == 'LINK') {
      let url = action.func_data;

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

      // Bổ sung các biến url có sẵn
      // for (let i in this.args) {
      //   url +=
      // }

      // Go to url
      // console.log("url:", url);
      window.location.href = '/dynamic/' + url;
    } else {
      console.log("Action: func_type invail:", action.func_type);
    }
  },
};
mt.config = config;
export default mt