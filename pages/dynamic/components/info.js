import config from '@libs/config.js';

export default class MtInfo {

  // Method
  constructor() {

    // Add Config
    this.config = config;

    // Load param URL
    this.args = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries())
      this.args[key] = value;

  }

  async loadPage() {
    try {

      let body = { ...this.args };
      let response = await fetch(config.baseUrl+'api/dynamic/getInfo', {
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
  
      if (result.fields.length == 0) // Cảnh báo cấu hình lỗi
        alert("Thiếu cấu hình trường");
      else {
        
        for (let i in result.fields) {
          let field = result.fields[i];

          if (field.type == 'SELECTBOX' && (field.content == null || result.contents[field.content] == null)) {
            alert("Thiếu cấu hình content");
            console.log("[ERROR] field:", field)
            return result;
          }


          // Mark content into field
          if (field.content != null) {
            field.content = result.contents[field.content];
          }
        }
      }

      // Remove content
      delete result.contents;

      return result;
    }
    catch (e) {
      console.error(e)
      alert(e);
    }
    return {};
  }
  
  async apiDynamicInfoSave(form) {
    try {
      // console.log("form:", form) // #DEBUG
      let body = { ...form };
      // console.log("body:", body) // #DEBUG
      let response = await fetch(config.baseUrl+'api/dynamic/saveInfo', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Basic ' + base64.encode(username + ":" + password),
        },
        body: JSON.stringify(body),
      });
      let result = await response.json();

      // Thông báo kết quả
      alert(result.message);

      // Cập nhật URL có id
      if (result.id != null) {
        setTimeout(function() {
          let urlParams = new URLSearchParams(window.location.search);
          urlParams.set('id', result.id);
          window.location.search = urlParams;
        }, 3000);
      }

    }
    catch (e) {
      console.error(e)
      alert(e);
    }
    return {};
  }

  onAction(action, detail, form) {

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
        if (form[varName] == null)
          { console.error("Cấu hình lỗi: Tên biến ko tồn tại:", varName); return; }
        url = url.replace("{"+varName+"}", form[varName]);
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
    else if (action.func_type == 'SAVE') {
      form['_table_'] = detail.table; // Trường bổ sung cho form
      this.apiDynamicInfoSave(form);
    }
    else { // More action
      console.log("Action: func_type invail:", action.func_type);
    }
  }

}