export const checkStatus = (value) =>{
    switch(value) {
      case 'NEW':
        return 'Mới';
      case 'PENDING':
        return 'Chờ xác nhận';
      case 'CONFIRMED':
        return 'Đã xác nhận';
      case 'PREPARE':
        return 'Chuẩn bị hàng';
      case 'WAIT_FOR_PACKING':
        return 'Chờ lấy hàng';
      case 'DELIVERING':
        return 'Đang giao hàng';
      case 'DELIVERED':
        return 'Đã giao';
      case 'COMPLETED':
        return 'Hoàn thành';
      case 'CANCELLED':
        return 'Đã hủy';
      case 'LOST':
        return 'Thất lạc';
      case 'BACK_GOODS':
        return 'Hoàn hàng';
      default: return 'Updating...';
    }

  }