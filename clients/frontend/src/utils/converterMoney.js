export const converterMoney = (price) =>{
    return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(price)
}