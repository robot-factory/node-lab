export const formatAmount = (amount: string) => {
  // add 0 before . if . is first
  let formattedAmount = amount
  if (formattedAmount.slice(0, 1) === '.') {
    formattedAmount = '0' + formattedAmount
  }
  // get rid of ., if . is in end
  if (/^\d+\.$/.test(formattedAmount)) {
    formattedAmount = formattedAmount.slice(0, formattedAmount.length - 1)
  }
  // get rid of the number too small .
  const temp = formattedAmount.match(/^\d+\.(\d*)$/)
  if (temp && temp[1].length > 18) {
    formattedAmount = (formattedAmount.match(/^(\d+\.\d{0,18})\d*$/) as any) as string
  }

  return formattedAmount
}