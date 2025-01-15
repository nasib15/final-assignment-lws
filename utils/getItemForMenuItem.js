export const getIconForMenuItem = (itemName) => {
  switch (itemName) {
    case "Create Hotel":
      return "fas fa-plus-circle";
    case "Manage Hotels":
      return "fas fa-hotel";
    case "My Bookings":
      return "fas fa-calendar-check";
    case "Login":
      return "fas fa-sign-in-alt";
    case "Signup":
      return "fas fa-user-plus";
    case "My Wishlist":
      return "fas fa-heart";
    default:
      return "fas fa-circle";
  }
};
