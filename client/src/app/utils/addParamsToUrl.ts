const addParamsToUrl = <T extends Record<string, any>>(paramsData: T) => {
  const params: string[] = []
  Object.entries(paramsData).forEach(([key, value]) => {
    params.push(`${key}=${value}`)
  })
  return '?' + params.join('&')
}

export default addParamsToUrl
