export const navLinkClass = (isActive) => {
  return (
    " px-3 py-2 rounded-md text-sm font-medium transition-colors" +
    (isActive
      ? " text-foreground font-bold"
      : " text-text-secondary hover:text-foreground")
  );
};

export const navLinkClassMobile = (isActive) => {
  return (
    "block px-3 py-2 rounded-md text-base font-medium transition-colors" +
    (isActive
      ? " text-foreground font-bold"
      : " text-text-secondary hover:text-foreground")
  );
};

export const navLinkClassSidebar = (isActive) => {
  return (
    "w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors" +
    (isActive
      ? " text-foreground font-bold bg-surface"
      : " text-gray-600 hover:bg-gray-100 hover:text-gray-900")
  );
};
