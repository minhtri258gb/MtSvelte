import config from '@libs/config.js'
var mt = {
  args: {}, // params on URL

  // Method
  init: function() {

    // Get params URL
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries())
      this.args[key] = value;

  },
  apiDynamicInfo: async function() {
    try {

      let body = { ...this.args };
      let response = await fetch(config.baseUrl+'api/dynamic/info', {
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
  },
  apiDynamicInfoSave: async function(form) {
    try {

      let body = { ...form };
      let response = await fetch(config.baseUrl+'api/dynamic/info/save', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Basic ' + base64.encode(username + ":" + password),
        },
        body: JSON.stringify(body),
      });
      let result = await response.json();
      if (response.status == 200) {
        alert('Cập nhật thành công');
      } else if (response.status == 201) {
        alert('Dữ liệu không có sự thay đổi');
      } else {
        throw result;
      }
  
      return result;
    }
    catch (e) {
      console.error(e)
      alert(e);
    }
    return {};
  },
  onButtonPress: function(action, detail, form) {

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
        if (form[varName] == null)
          { console.error("Cấu hình lỗi: Tên biến ko tồn tại:", varName); return; }
        url = url.replace("{"+varName+"}", form[varName]);
      }

      // Go to url
      window.location.href = '/dynamic/' + url;
    }
    else if (action.func_type == 'SUBMIT') {
      form.table = detail.table; // Trường bổ sung cho form
      this.apiDynamicInfoSave(form);
    }
    else { // More action
      console.log("Action: func_type invail:", action.func_type);
    }
  },
};
mt.config = config;
export default mt