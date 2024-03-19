var MtUtils = {
  fillVar: function(str, data) {
    while(true) {
      let posb = str.indexOf('{');
      if (posb == -1) // ko tìm thấy biến nào nữa
        break;
      let pose = str.indexOf('}');
      if (pose == -1)
        { console.error("Dấu { và } ko cùng số lượng"); return; }
      let varName = str.substring(posb+1, pose);
      if (varName.length == 0)
        { console.error("Không có tên biến giữa { và }"); return; }
      if (data[varName] == null)
        { console.error("Tên biến ko tồn tại trong tập dữ liệu:", varName); return; }
      str = str.replace("{"+varName+"}", data[varName]);
    }
    return str;
  },
};
export default MtUtils;