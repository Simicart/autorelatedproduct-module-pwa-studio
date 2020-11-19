export const convertStringToArray = (string, separator = ',') => {
    if(string && typeof string === 'string') {
        return string.split(separator)
    } 

    return []
}
  