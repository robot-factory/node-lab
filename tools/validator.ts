/**
 * 用户名输入验证，只能输入中文/英文/
 */
function validateUsername(name: string) {
  const reg = new RegExp("^[\u4e00-\u9fa5A-Za-z0-9]+$");
  return reg.test(name);
}

/**
 * 输入时数值验证
 */
function validateEnteringAmount(amountString: string) {
  const reg = new RegExp("^[0-9]*(\.[0-9]{0,18})?$");
  return reg.test(amountString);
}
