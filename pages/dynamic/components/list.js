import MtUtils from '@libs/utils.js';
import MtDynamic from '../dynamic';

export default class MtList {
  
  constructor() {

    // Load param URL
    this.args = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams.entries())
      this.args[key] = value;
  }

  async loadPage(id, code) {

    let body = { ...this.args };
    body.id = id;
    body.code = code;

    let response = await fetch(config.baseUrl+'/api/dynamic/getList', {
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

  processData(page, headers, rows, actions) {
    
    let result = {};

    // Preprocess actions
    let actionTop = [];
    let actionInline = [];
    for (let i in actions) {
      let action = actions[i];
      if (action.pos == 1)
        actionTop.push(action);
      else if (action.pos == 2)
        actionInline.push(action);
    }
    result.actionTop = actionTop;
    result.actionInline = actionInline;

    // Preprocess rows
    for (let i in rows)
      rows[i].stt = +i+1;
    result.rows = rows;

    return result;
  }

  async onAction(action, cbkAction, row) {
    let cbkRequest = null;
    switch (action.type) {
      case 'GO':
        MtDynamic.doActionGo(action.data, row, this.args);
        break;
      case 'POPUP_GO':
        let popupArgs = MtUtils.getArgs(action.data);
        let popup = await MtDynamic.apiloadPage(popupArgs);
        popup.isOpen = true;
        popup.pageType = 'INFO';
        popup.pageId = 1;
        cbkRequest = { popup: popup };
        break;
      case 'BACK':
        MtDynamic.doActionBack();
        break;
      default:
        console.log("Action: type invail:", action.type);
        break;
    }

    if (cbkRequest != null)
      cbkAction(cbkRequest);
  }

}