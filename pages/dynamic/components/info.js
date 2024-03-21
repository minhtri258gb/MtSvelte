import MtConfig from '@libs/config.js';
import MtDynamic from '../dynamic';

export default class MtInfo {

  // Method
  constructor() {

    // Load param URL
    this.args = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries())
      this.args[key] = value;

  }

  async loadPage() {
    try {

      let body = { ...this.args };
      let response = await fetch(config.baseUrl+'/api/dynamic/getInfo', {
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

  processData(page, fields, form, actions, contents) {

    let result = {};
    
    if (fields.length > 0) { // Cảnh báo cấu hình lỗi
      for (let i in fields) {
        let field = fields[i];

        if (field.type == 'SELECTBOX' && (field.content == null || contents[field.content] == null)) {
          alert("Thiếu cấu hình content");
          console.log("[ERROR] field:", field)
          return result;
        }

        // Mark content into field
        if (field.content != null) {
          field.content = contents[field.content];
        }
      }
    }
    result.fields = fields;

    return result;
  }
  
  async apiDynamicInfoSave(form) {
    try {
      // console.log("form:", form) // #DEBUG
      let body = { ...form };
      // console.log("body:", body) // #DEBUG
      let response = await fetch(MtConfig.baseUrl+'/api/dynamic/saveInfo', {
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
    switch (action.funcType) {
      case 'GO':
        MtDynamic.doActionGo(action.funcData, row, this.args);
        break;
      case 'BACK':
        MtDynamic.doActionBack();
        break;
      case 'SAVE':
        form['_table_'] = detail.table; // Trường bổ sung cho form
        this.apiDynamicInfoSave(form);
        break;
      default:
        console.log("Action: func_type invail:", action.funcType);
        break;
    }
  }

}