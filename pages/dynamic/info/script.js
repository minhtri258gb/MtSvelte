import config from '@libs/config.js'
var mt = {
  apiDynamicInfo: async function(pageCode, recordCode) {
    let response = await fetch(config.baseUrl+'dynamic/info/'+pageCode, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Basic ' + base64.encode(username + ":" + password),
      },
      body: JSON.stringify({
        code: recordCode,
      }),
    });
    let result = await response.json();
    if (response.status != 200)
      throw result;

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

      // Go to url
      // console.log("url:", url);
      window.location.href = '/dynamic/' + url;
    }
    else { // More action
      console.log("Action: func_type invail:", action.func_type);
    }
  },
};
mt.config = config;
export default mt