 export function dateFormat (){
    const date = new Date()
    let options = {
      month: 'long',
      year: 'numeric',
    };
    let formatDate =date.toLocaleDateString("en-US", options);
    let customDate =`${date.getHours()}:${ date.getMinutes()}; ${("0" + date.getDate()).slice(-2)} ${formatDate}`
    return customDate
}